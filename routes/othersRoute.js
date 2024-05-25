import express from 'express';
import { isauth } from '../middleware/authMiddleware.js';
import { allUsersController, contactUsController, meetingController } from '../controllers/otherController.js';


const router=express.Router();

router.post('/contact',isauth,  contactUsController);
router.post('/meeting', isauth, meetingController);
router.get('/allusers', isauth, allUsersController)

export default router;