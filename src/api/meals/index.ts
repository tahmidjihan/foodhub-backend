import express from 'express';

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Meals API Root');
});
router.post('/', (req, res) => {
  // Logic to add a new meal
  res.send('New meal added');
});

export default router;
