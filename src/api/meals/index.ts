import express from 'express';
import controller from './controllers/meals.controller.js';

const router = express.Router();

router.get('/:id', controller.getOne);
router.get('/', controller.getAll);
router.get('/provider/:id', controller.getByProvider);

export default router;
