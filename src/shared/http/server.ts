import { Server } from 'socket.io';
import { serverHttp } from './http';

export const io = new Server(serverHttp, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
