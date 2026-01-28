import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import api from './src/index.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './src/auth/auth.js';
const app = express();
// const router = express.Router();
dotenv.config();

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  }),
);
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
