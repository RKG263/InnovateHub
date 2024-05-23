import commentModel from '../models/commentModel.js';

export const createCommentController = async (req, res, next) => {
  try {
    const newComment = new commentModel(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    next(err)
  }
};

export const updateCommentController = async (req, res, next) => {
  try {
    const updatedComment = await commentModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    next(err)
  }
};

export const deleteCommentController = async (req, res, next) => {
  try {
    await commentModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted!");
  } catch (err) {
    next(err)
  }
};

export const getAllCommentController = async (req, res, next) => {
  try {
    const comments = await commentModel.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    next(err)
  }
};
