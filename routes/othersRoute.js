import express from 'express';
import { isauth } from '../middleware/authMiddleware.js';
import { allUsersController, contactUsController, getUseraByidController, meetingController } from '../controllers/otherController.js';


const router=express.Router();

router.post('/contact',isauth,  contactUsController);
router.post('/meeting', isauth, meetingController);
router.get('/allUsers', isauth, allUsersController);
router.get('/user/:id',getUseraByidController)

export default router;