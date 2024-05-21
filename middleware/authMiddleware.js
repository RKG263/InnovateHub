import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';
export const isauth=async(req,res,next)=>{
   const {token}=await req.cookies;
   if(!token){
    return res.status(401).send({
      sucess:false,
      messege:"unauthorized"
    })
   }
   const decode=JWT.verify(token,process.env.SECRET_CODE);
   req.user=await userModel.findById(decode._id);
   next();

}