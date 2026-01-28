import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import api from './src/index.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './src/auth/auth.js';
const app = express();
// const router = express.Router();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
function consoleReq(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  console.log(req.body);
  next();
}
app.all('/api/auth/{*any}', consoleReq, toNodeHandler(auth));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
