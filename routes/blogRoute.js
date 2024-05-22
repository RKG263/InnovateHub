import express from 'express'
import { isauth } from '../middleware/authMiddleware.js';
import { createPostController } from '../controllers/blogController.js';

const router=express.Router();

router.post('/post',isauth,createPostController);

export default router