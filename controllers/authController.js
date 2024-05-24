import userModel from "../models/userModel.js";
import { sendMail } from "../utils/sendVerificationMail.js";
import crypto from 'crypto';

const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};
// register controller   
export const registerController = async (req, res, next) => {
  try {
    const { role, name, email, password } = req.body;
    console.log(req.body);
    if (!role || !name || !email || !password) {
      throw new Error("All fields are required");
    }

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exists");
    }
<<<<<<< HEAD
    
=======
     console.log(name ,email ) ;
>>>>>>> 88c6bb3cf2ebeafac829d9a4fc75edbf252a9704
    const token = generateRandomToken(16); 
    const user = await userModel.create({ role, name, email, password ,isVerifiedToken:token});
   const mail= await sendMail(email,token);
   console.log(mail);

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log("Error in registerController:", error);
    next(error);
  }
};

// login controller

export const loginController = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      throw new Error("all field required");
    }
  
    const user = await userModel.findOne({ email });
    if (!user) {
       console.log("Invalid Email Helllo ") ;
      throw new Error("Invalid Email Helllo ");
    }
    console.log(user.password)
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error("invalid  password ");
    }
    if (user.role != role) {
      throw new Error("invalid  role");
    }
    if(!user.isVerified){
      throw new Error("user not verified")
    }
    const token = user.createJWT();

    return res.status(200).cookie("token", token, {
      expires:new Date(Date.now()+1*24*60*60)
    }).send({
      success: true,
      message: "login sucessfully",
       token,
       user,
    });
  } catch (error) {
    console.log("error in loginController");
    next(error);
  }
};

// verify email controller
export const verifyEmailController=async(req,res,next)=>{
  
  try {
    const reftoken=req.query.token;
  const user=await userModel.findOne({isVerifiedToken:reftoken});

  if(!user){
    throw new Error("user not found");
  }
  user.isVerified=true;
  user.isVerifiedToken=undefined;
  user.save();
  res.redirect('http://localhost:5173/')

  return 
    
  } catch (error) {
    console.log("error in user verification")
    next(error)
  }
}

// logout controller
export const logoutController=async(req,res,next)=>{
  try {
    res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send({
      success : true ,
      message : "User logged out successfully!"
    })
  } catch (error) {
    console.log(error) ;
    next(error);
  }
}


export const meController = async(req, res, next)=>{

    // try{
    
    //   res.status(200).json({
    //     success:true,
    //     userId : req.user
    //   });


    // }catch(err)
    // {
    //   console.error(err);
    //   next(err);
    // }
    const user =await userModel.findById(req.user._id);

    res.status(200).json({
            success:true,
            user,
    })

}