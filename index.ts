import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import api from './src/index.js';
const app = express();
// const router = express.Router();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
