
import postModel from "../models/postModel.js";

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
