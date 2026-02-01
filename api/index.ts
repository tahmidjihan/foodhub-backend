import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import api from '../src/index.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '../src/auth/auth.js';

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  }),
);
app.use(express.json());

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api', api);

export default app;
