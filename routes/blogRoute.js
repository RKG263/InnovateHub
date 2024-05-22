import express from 'express'
import { isauth } from '../middleware/authMiddleware';
import { postController } from '../controllers/blogController';

const router=express.Router();

router.post('/post',isauth,postController);

export default router