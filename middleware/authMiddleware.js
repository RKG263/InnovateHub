import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';



export const isauth=async(req,res,next)=>{
  

   try{
      const {token}=await req.cookies;
   
      if(!token){
       return res.status(401).send({
          success:false,
          message:"unauthorized"
       })
      }
      const decode=JWT.verify(token,process.env.SECRET_CODE);
      
      req.user=await userModel.findById(decode.userId);
     //  console.log(req.user);
     next();
      
   }catch(err)
   {
      console.log(err);
      next(err);
   }

}
export const isAdmin = (req, res, next) => {
   if (req.user && req.user.isAdmin) {
     next();
   } else {
     res.status(401).json({ message: 'Not authorized as an admin' });
   }
 };