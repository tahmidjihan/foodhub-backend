import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import api from './src/index.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './src/auth/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const allowedOrigins = [
  process.env.ORIGIN_URL || 'http://localhost:5000',
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
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

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
export default app;
