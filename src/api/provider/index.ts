import express from 'express';
import controller from './controller/provider.controller.js';
const router = express.Router();

router.get('/:id', controller.getOne);
router.get('/', controller.getAll);
export default router;
