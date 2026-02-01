import express from 'express';
const router = express.Router();
import review from './review.controller.js';
router.get('/', (req, res) => {
  res.send('Review Root');
});

router.post('/', review.create);
router.get('/provider/:id', review.getByProvider);

export default router;
