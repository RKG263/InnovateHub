import express from 'express';
import { isauth } from '../middleware/authMiddleware.js';
import { allUsersController ,getUseraByidController, approachUser, contactUsController, meetingController, fetchNotification, handleNotification, CheckChatStatus } from '../controllers/otherController.js';


const router=express.Router();

router.post('/contact',isauth,  contactUsController);
router.post('/meeting', isauth, meetingController);
router.get('/allusers', isauth, allUsersController)
router.post('/approach', isauth, approachUser) ;
router.get('/allUsers', isauth, allUsersController);
router.get('/user/:id',getUseraByidController);
router.post('/fetchnotifications',fetchNotification);
router.post('/handlenotification',handleNotification);
router.post('/checkchatstatus',CheckChatStatus);

export default router;