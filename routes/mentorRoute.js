import express from 'express'
import { isauth } from '../middleware/authMiddleware.js';
import { createPostController } from '../controllers/blogController.js';
import { createConnectionController, mentorController } from '../controllers/mentorController.js';

const router=express.Router();

router.get('/',isauth,mentorController);
router.post('/createConnection',isauth,createConnectionController);

export default router