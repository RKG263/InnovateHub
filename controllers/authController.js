import userModel from "../models/userModel.js";
import { sendMail } from "../utils/sendVerificationMail.js";
import crypto from 'crypto';
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/features.js";
import entrepreneurModel from "../models/entrepreneurModel.js";
import mentorModel from "../models/mentorModel.js";
import investorModel from "../models/investorModel.js";
import bcrypt from "bcryptjs";

const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};
// register controller   
export const registerController = async (req, res, next) => {
  try {
    const { role, name, email, password } = req.body;
    // console.log(req.body);
    if (!role || !name || !email || !password) {
      throw new Error("All fields are required");
    }

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
     return next({status:400,message:"user Already exist , please login"})
    }

    const token = generateRandomToken(16);
    const user = await userModel.create({ role, name, email, password, isVerifiedToken: token,isAdmin:false });

   

    if (role == "Entrepreneur") {
      const ruser = await entrepreneurModel.create({userId : user._id , name , role , email});
    }
    else if (role == "Mentor") {
      const ruser = await mentorModel.create({userId : user._id , name , role , email});
    }
    else if (role == "Investor") {
      const ruser = await investorModel.create({userId : user._id , name , role , email});
    }


    const mail = await sendMail(email, token);
    // console.log(mail);

    res.status(201).send({
      success: true,
      message: "You are registered successfully",
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
     
      return next({status:400,message:"all feild required"})
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      // console.log("Invalid Email  ");
      return next({status:400,message:"invalid email & password"})
    }
    // console.log(user.password)
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next({status:400,message:"invalid email & password"})
    }
    if (user.role != role) {
      return next({status:400,message:"invalid role"})
    }
    if (!user.isVerified) {
      throw new Error("user not verified")
    }
    const token = user.createJWT();

    return res.status(200).cookie("token", token, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
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
export const verifyEmailController = async (req, res, next) => {

  try {
    const reftoken = req.query.token;
    const user = await userModel.findOne({ isVerifiedToken: reftoken });

    if (!user) {
      throw new Error("user not found");
    }
    user.isVerified = true;
    user.isVerifiedToken = undefined;
    user.save();
    res.redirect('http://localhost:5173/')

    return

  } catch (error) {
    console.log("error in user verification")
    next(error)
  }
}

// logout controller
export const logoutController = async (req, res, next) => {
  try {
    res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send({
      success: true,
      message: "User logged out successfully!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}


export const meController = async (req, res, next) => {

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
  const user = await userModel.findById(req.user?._id);

  res.status(200).json({
    success: true,
    user,
  })

}

export const editProfileController = async (req, res, next) => {

  try {

  
    

    
    const { fullName, aboutMe, newPassword, contact, intrest } = req.body;
    // console.log(req.body);
    
    if (newPassword) {
      
      req.user.password = newPassword;
      const salt = await bcrypt.genSalt(10);
      req.user.password = await bcrypt.hash(newPassword, salt);

    }

  

    req.user.name = fullName;
    req.user.aboutMe = aboutMe;
    req.user.contact = contact;
    req.user.intrest = intrest;


    const result = await userModel.updateOne({ _id: req.user._id }, req.user);

    // console.log(result);

    res.status(200).json({
      success: true,
      message: 'Edited successfully',
      userId: req.user
    });


  } catch (err) {

    console.error(err);
    next(err);
  }




}


export const editProfilePicController = async (req, res, next) => {

  try {

  
    



    // upload in cloudinary
    if(req.file)
      {
        const file = getDataUri(req.file);
        const cloudinaryResult = await cloudinary.v2.uploader.upload(file.content);
        req.user.profile_pic.url = cloudinaryResult.secure_url;
        req.user.profile_pic.public_id = cloudinaryResult.public_id;

        // console.log(cloudinaryResult);
      }
      else throw new Error("File must be image");

  

    const result = await userModel.updateOne({ _id: req.user._id }, req.user);

    // console.log(result);

    res.status(200).json({
      success: true,
      message: 'Edited successfully',
      userId: req.user
    });


  } catch (err) {

    console.error(err);
    next(err);
  }
}


// Define the GET route for /api/getMyProfile

export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const Id = req.query.Id ;
    // console.log(userId);
    const user = await userModel.findById({ _id: userId });

    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let roleModel;
    if (user.role == 'Entrepreneur') {
      roleModel = entrepreneurModel;
    } else if (user.role == 'Investor') {
      roleModel = investorModel;
    } else { 
      roleModel = mentorModel;
    }

    let roleUser = await roleModel.findOne({ email: user.email });
    // const userProfile = await userModel.findOne({_id : roleUser.userId});

    // console.log(roleUser);
    
    if (!roleUser) {
      return res.status(404).json({
        success: false,
        message: `${user.role} profile not found`,
      });
    }
    
    let connections = await Promise.all(
      roleUser.myConnections.map(async connectionId => {
        const userData = await userModel.findById(connectionId);
        return {
          _id: userData._id,
          name: userData.name,
          role: userData.role,
          image: userData.profile_pic?.url,
          bio : userData.aboutMe ,
        };
      })
    );
    
    roleUser._doc.profile_pic = user?.profile_pic;

    // console.log(roleUser);
    return res.status(200).json({
      success: true,
      User: roleUser,
      Connections: connections,
    });
  } catch (error) {
    next(error);
  }
};
