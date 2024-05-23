import express from 'express'
import { loadUser, logoutController, registerController, verifyEmailController } from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { isauth } from '../middleware/authMiddleware.js';


const router=express.Router();

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/verify',verifyEmailController);
router.get('/logout',isauth,logoutController) ;
router.get('/me',isauth,loadUser) ;
router.get('/testauth',isauth,(req,res)=>{
  res.send("hellp tos")
})

export default router