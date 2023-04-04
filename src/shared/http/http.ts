import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
const app = express();
app.use(express.json());

export const serverHttp = http.createServer(app);

export const io = new Server(serverHttp, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
