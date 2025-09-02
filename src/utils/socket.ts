import http from 'http';
import { Server } from 'socket.io';

const initializeSocketServer = (app: Express.Application) => {
  const server = http.createServer(app);
  const io = new Server(server);
  return { server, io };
};

export default initializeSocketServer;
