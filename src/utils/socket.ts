import http from 'http';
import { Server } from 'socket.io';
import { Application } from 'express';
import Events from './constants.js';

interface ChatMessage {
  sender: string;
  message?: string;
  data?: any;
  'socket-id-sender'?: string;
}

let connections: Record<string, string[]> = {};
let messages: Record<string, ChatMessage[]> = {};
let timeOnline: Record<string, Date> = {};

const initializeSocketServer = (app: Application) => {
  const server = http.createServer(app);
  const io = new Server(server,{
    cors :{
      origin : "*",
      methods : ["GET","POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    socket.on(Events.JOIN_CALL, (path) => {
      if (!connections[path]) {
        connections[path] = [];
      }
      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      for (const id of connections[path]) {
        io.to(id).emit(Events.USER_JOINED, socket.id, connections[path]);
      }

      if (messages[path]) {
        for (const msg of messages[path]) {
          io.to(socket.id).emit(
            Events.CHAT_MESSAGE,
            msg.data,
            msg.sender,
            msg['socket-id-sender']
          );
        }
      }
    });

    socket.on(Events.SIGNAL, (toID, message) => {
      io.to(toID).emit(Events.SIGNAL, socket.id, message);
    });

    socket.on(Events.CHAT_MESSAGE, (data, sender) => {
      let matchingRoom: string | null = null;
      for (const [roomKey, roomValue] of Object.entries(connections)) {
        if (roomValue.includes(socket.id)) {
          matchingRoom = roomKey;
          break;
        }
      }

      if (matchingRoom) {
        if (!messages[matchingRoom]) {
          messages[matchingRoom] = [];
        }
        messages[matchingRoom].push({
          sender,
          data,
          'socket-id-sender': socket.id,
        });

        console.log('message', matchingRoom, ':', sender, data);

        for (const id of connections[matchingRoom]) {
          io.to(id).emit(Events.CHAT_MESSAGE, data, sender, socket.id);
        }
      }
    });

    socket.on('disconnect', () => {
      const joinTime = timeOnline[socket.id];
      const diffTime = joinTime
        ? Math.abs(new Date().getTime() - joinTime.getTime())
        : 0;

      let roomToRemove: string | null = null;

      for (const [roomKey, ids] of Object.entries(connections)) {
        if (ids.includes(socket.id)) {
          for (const id of ids) {
            io.to(id).emit('user-left', socket.id);
          }

          connections[roomKey] = ids.filter((id) => id !== socket.id);

          if (connections[roomKey].length === 0) {
            roomToRemove = roomKey;
          }
        }
      }

      if (roomToRemove) {
        delete connections[roomToRemove];
        delete messages[roomToRemove];
      }

      delete timeOnline[socket.id];
      console.log(`Socket ${socket.id} disconnected after ${diffTime}ms`);
    });
  });

  return { server, io };
};

export default initializeSocketServer;
