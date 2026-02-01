import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import api from './src/index.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './src/auth/auth.js';

// Load environment variables
dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.all('/api/auth/*splat', toNodeHandler(auth));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api', api);

// Export for Vercel serverless
export default app;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
