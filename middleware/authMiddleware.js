import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';



export const isauth=async(req,res,next)=>{
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

}