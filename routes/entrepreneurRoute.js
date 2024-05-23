import express from 'express'
import { isauth } from '../middleware/authMiddleware.js';
import { entrepreneurIdeaController } from '../controllers/entrepreneurController.js';

const router=express.Router();

// router.get('/entrepreneur',isauth,entrepreneurController);
router.post('/entrepreneur/idea',isauth,entrepreneurIdeaController);

export default router