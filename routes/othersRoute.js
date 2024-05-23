import express from 'express';
import { contactUsController } from '../controllers/contactUsController.js';


const router=express.Router();

router.post('/contact',  contactUsController);

export default router;