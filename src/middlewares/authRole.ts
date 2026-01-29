import express from 'express';

const authRole = (roles: string[]) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};
export default authRole;
