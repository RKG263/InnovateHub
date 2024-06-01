import express from 'express'
import { editProfileController, editProfilePicController, logoutController, meController, registerController, verifyEmailController } from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { isauth } from '../middleware/authMiddleware.js';
import { singleUpload } from '../middleware/multer.js';


const router=express.Router();

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/verify',verifyEmailController);
router.get('/logout',logoutController) ;
router.get('/me',isauth,  meController);
router.post('/editProfile', isauth,  editProfileController);
router.post('/editProfilePic', isauth, singleUpload,  editProfilePicController);
router.get('/testauth',isauth,(req,res)=>{
  res.send("hellp tos")
});


export default router;