import express from 'express'
import { isauth } from '../middleware/authMiddleware.js';
import { postController } from '../controllers/blogController.js';

const router=express.Router();

router.post('/post', isauth, postController);

export default router