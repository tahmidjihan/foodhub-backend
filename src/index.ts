import express from 'express';
import { auth } from './auth/auth.js';
import { toNodeHandler } from 'better-auth/node';
// import auth from './auth/index.js';

const router = express.Router();

// router.use('/auth', auth);

export default router;
