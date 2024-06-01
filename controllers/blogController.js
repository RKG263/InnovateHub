import commentModel from "../models/commentModel.js";
import postModel from "../models/postModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/features.js";
import userModel from "../models/userModel.js";

// create post
export const createPostController = async (req, res, next) => {
  try {
    const { title, description, username, userID } = req.body;

    if (!title || !description || !username || !userID) {
      throw new Error("All fields are required");
    }

    // picture uplodation
    if (!req.file) {
      throw new Error("no file uploaded");
    }

    const file = getDataUri(req.file);

    // Upload image to Cloudinary

    const cloudinaryResult = await cloudinary.v2.uploader.upload(file.content);

    const newPost = new postModel({
      title,
      description,
      picture: req.body.picture || null,
      username,
      userID,
      categories: req.body.categories || [],
      picture: {
        url: cloudinaryResult.secure_url,
        public_id: cloudinaryResult.public_id,
      }
     
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
    const post = await postModel.findById(req.params.id);

    let pic = {
      url: post.picture.url,
      public_id: post.picture.public_id,
    };
    if (req.file) {
      const file = getDataUri(req.file);
      if (post.picture) {
        await cloudinary.v2.uploader.destroy(post.picture.public_id);
      }
      const cloudinaryResult = await cloudinary.v2.uploader.upload(
        file.content
      );

      pic = {
        url: cloudinaryResult.secure_url,
        public_id: cloudinaryResult.public_id,
      };
    }

    const post1 = req.body;
    console.log(post1);

    const updatedPost = await postModel.findByIdAndUpdate(post._id, {
      title: post1.title,
      description: post1.description,

      username: post1.username,
      userID: post1.userID,
      categories: post1.categories || [],
      picture: pic,
    });

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
    const del1 = await commentModel.deleteMany({ postId: req.params.id });
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
export const getUserPostController = async (req, res, next) => {
  try {
    const posts = await postModel.find({ userID: req.params.userID });
    if (!posts) {
      throw new Error("no post found");
    }
    res.status(200).send({
      success: true,
      message: "all post of user get succesfully",
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};




