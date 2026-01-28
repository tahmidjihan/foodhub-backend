import express from 'express';

const signUp = (req: express.Request, res: express.Response) => {
  // Handle user signup
  const { name, email, password } = req.body;
  res.send('User signed up');
};
const signIn = (req: express.Request, res: express.Response) => {
  // Handle user signin
  res.send('User signed in');
};
export default { signUp, signIn };
