import commentModel from "../models/commentModel.js";
import postModel from "../models/postModel.js";
// create post
export const createPostController = async (req, res, next) => {
  try {
    const { title, description, username, userID } = req.body;
    if (!title || !description || !username || !userID) {
      throw new Error("All fields are required");
    }

    const newPost = new postModel({
      title,
      description,
      picture: req.body.picture || null,
      username,
      userID,
      categories: req.body.categories || [],
    });

    const savedPost = await newPost.save();

    res.status(200).json({
      success: true,
      message: "Post successfully created",
      post: savedPost,
    });
  } catch (error) {
    next(error);
  }
};

// update post

export const updatePostController = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (err) {
    next(err);
  }
};

// delete routes

export const deleteRouteController = async (req, res, next) => {
  try {
    const del = await postModel.findByIdAndDelete(req.params.id);
    const del1= await commentModel.deleteMany({postId:req.params.id})
    if (!del) {
      throw new Error("no post exist");
    }
    res.status(200).send({
      success: true,
      message: "post deleted successfully",
      del,
    });
  } catch (error) {
    next(error);
  }
};

// get post detail

export const getPostDetailController = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      throw new Error("post not found");
    }

    res.status(200).send({
      success: "true",
      message: "post get successfully",
      post,
    });
  } catch (err) {
    next(err);
  }
};
//get all post

export const getAllPostController = async (req, res, next) => {
  const query = req.query;

  try {
    const searchFilter = query.search
      ? { title: { $regex: query.search, $options: "i" } }
      : {};

    const posts = await postModel.find(searchFilter);

    res.status(200).json({
      success: true,
      message: "All posts retrieved successfully",
      posts,
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    next(err);
  }
};

// get users post
export const getUserPostController=async(req,res,next)=>{
  try{
    const posts=await postModel.find({userID:req.params.userID})
    if(!posts){
      throw new Error('no post found')
    }
    res.status(200).send({
      success:true,
      message:"all post of user get succesfully",
      posts
    })
}
catch(err){
    res.status(500).json(err)
}
}