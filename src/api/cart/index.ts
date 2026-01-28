import express from 'express';
import controller from './controllers/cart.controller.js';
const router = express.Router();
router.get('/', (req, res) => {
  res.send('Cart Root');
});
router.post('/', controller.create);

export default router;
