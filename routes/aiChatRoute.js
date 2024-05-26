import express from 'express'
import { isauth } from './../middleware/authMiddleware.js';
import { aiChatController } from '../controllers/aiChatController.js';
const router=express.Router();

router.post('/ask',aiChatController)

export default router