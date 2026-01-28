import express from 'express';
import controller from './controllers/orders.controller.js';

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Orders Root');
});
router.post('/', controller.create);
export default router;
