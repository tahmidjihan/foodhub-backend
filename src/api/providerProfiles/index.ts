import express from 'express';
import controller from './providerProfiles.controller.js';

const router = express.Router();

router.get('/:id', controller.getOne);
router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.updateOne);
router.delete('/:id', controller.deleteOne);

export default router;
