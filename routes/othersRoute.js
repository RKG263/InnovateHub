import express from 'express';
import { contactUsController } from '../controllers/contactUsController.js';
import { isauth } from '../middleware/authMiddleware.js';


const router=express.Router();

router.post('/contact',isauth,  contactUsController);

export default router;