import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import postModel from '../models/postModel.js';
export const createPostController = async (req, res, next) => {
  try {
    const {title,description,categories} = req.body;
    const { token } = req.cookies; 
    const decode = jwt.verify(token, process.env.SECRET_CODE);
    const user = await userModel.findById({_id:decode.userId});
    
    if(!title || !description){
      throw new Error('all fields required')
    }

    const post =await postModel.create({title,description,categories,username:user.name});


    res.status(200).send({
      success: true,
      message: "Post successfully",
      post
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    next(error);
  }
};
