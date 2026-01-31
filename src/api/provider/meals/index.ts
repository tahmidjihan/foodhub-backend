import express from 'express';
import controller from './meals.controller.js';
import authorize from '../../../middlewares/authorize.js';
import authRole from '../../../middlewares/authRole.js';
const router = express.Router();

router.post('/', authorize, authRole(['Provider']), controller.create);
router.get('/:id', controller.getAll);
router.put('/:id', authorize, authRole(['Provider']), controller.updateOne);
router.delete('/:id', authorize, authRole(['Provider']), controller.deleteOne);
router.get('/:id', controller.getOne);

export default router;
