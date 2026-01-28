import express from 'express';
import controller from './controllers/meals.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Meals API Root');
});
router.post('/', controller.create);

export default router;
