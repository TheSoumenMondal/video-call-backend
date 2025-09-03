import http from 'http';
import { Server } from 'socket.io';
import { Application } from 'express';

const initializeSocketServer = (app: Application) => {
  const server = http.createServer(app);
  const io = new Server(server);
  return { server, io };
};

export default initializeSocketServer;
