import express from 'express'
import { isauth } from '../middleware/authMiddleware.js';
import { createPostController } from '../controllers/blogController.js';
import { mentorController } from '../controllers/mentorController.js';

const router=express.Router();

router.post('/mentor',isauth,mentorController);

export default router