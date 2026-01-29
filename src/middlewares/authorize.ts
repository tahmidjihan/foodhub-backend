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
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (session) {
    req.user = session.user;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
export default authorize;
