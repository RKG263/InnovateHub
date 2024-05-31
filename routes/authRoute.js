import express from 'express'
import { editProfileController, getMyProfile, logoutController, meController, registerController, verifyEmailController } from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { isauth } from '../middleware/authMiddleware.js';
import { singleUpload } from '../middleware/multer.js';


const router=express.Router();

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/verify',verifyEmailController);
router.get('/logout',logoutController) ;
router.get('/me',isauth,  meController);
router.get('/getmyprofile',  getMyProfile);
router.post('/editProfile', isauth, singleUpload,  editProfileController);
router.get('/testauth',isauth,(req,res)=>{
  res.send("hellp tos")
});


export default router;