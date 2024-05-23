import express from 'express'
import { logoutController, meController, registerController, verifyEmailController } from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { isauth } from '../middleware/authMiddleware.js';


const router=express.Router();

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/verify',verifyEmailController);
router.get('/logout',logoutController) ;
router.get('/me',isauth,  meController);
router.get('/testauth',isauth,(req,res)=>{
  res.send("hellp tos")
});


export default router