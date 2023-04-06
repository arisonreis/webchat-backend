<<<<<<< HEAD
import 'express-async-errors';
import cors from 'cors';
import http from 'http';
import express, { NextFunction, Request, Response } from 'express';
import { routes } from '../routes';
import { Server } from 'socket.io';
import { AppError } from '../errors';
const app = express();
app.use(
  cors({
    methods: ['POST', 'GET'],
  })
);
app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});
=======
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
const app = express();
app.use(express.json());
>>>>>>> 43cebdcddb5d9c418330edb2cc0f1427a92f5c87

export const serverHttp = http.createServer(app);

export const io = new Server(serverHttp, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
