import express from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../auth/auth.js';

async function authorize(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (req.user) {
    next();
    return;
  }

  console.log('[Authorize] Cookie header:', req.headers.cookie || 'NONE');

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  console.log(
    '[Authorize] Session:',
    session ? `Found user: ${session.user.email}` : 'NO SESSION',
  );

  if (session) {
    req.user = session.user;
    console.log('[Authorize] Authenticated:', session.user.email);
    next();
  } else {
    console.log('[Authorize] FAILED: No session found');
    res.status(401).json({ message: 'Unauthorized' });
  }
}

export default authorize;
