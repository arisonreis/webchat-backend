require('express-async-errors');
import '../websocket/websocket';
import 'dotenv/config';
import http from 'http';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { routes } from '../routes';
import { z } from 'zod';
import { AppError } from '../errors';
import { JsonWebTokenError } from 'jsonwebtoken';
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  } else if (error instanceof z.ZodError) {
    // Se ocorreu um erro de validação, retorna uma resposta de erro
    return res.status(400).json({ erro: error.issues });
  } else if (error instanceof JsonWebTokenError) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid token',
    });
  } else {
    console.log(error)
    return res.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  }
});

export const serverHttp = http.createServer(app);

serverHttp.listen(process.env.PORT || 4000, () => {
  console.log(`Server running 🚀`);
});
