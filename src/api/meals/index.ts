import express from 'express';
import controller from './controllers/meals.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Meals API Root');
});
router.post('/', controller.create);
router.get('/:id', controller.getOne);
router.put('/:id', controller.updateOne);
router.delete('/:id', controller.deleteOne);

export default router;
