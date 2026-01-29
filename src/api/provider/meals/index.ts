import express from 'express';
import controller from './meals.controller.js';
const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.put('/:id', controller.updateOne);
router.delete('/:id', controller.deleteOne);

export default router;
