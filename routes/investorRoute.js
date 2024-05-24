import express from 'express'
import { isauth } from '../middleware/authMiddleware.js';
import { createPostController } from '../controllers/blogController.js';
import { investorController } from '../controllers/investorController.js';

const router=express.Router();

router.post('/investor',isauth,investorController);

export default router