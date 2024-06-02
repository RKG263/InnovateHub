import ChatModel from "../models/chatModel.js";

export const createChat = async (req, res) => {
  try {
    // Check if a chat already exists between sender and receiver
    const existingChat = await ChatModel.findOne({
      members: {
        $all: [req.body.senderId, req.body.receiverId]
      }
    });

    if (existingChat) {
      // If chat already exists, return the existing chat
      return res.status(200).json(existingChat);
    }

    // If chat doesn't exist, create a new one
    const newChat = new ChatModel({
      members: [req.body.senderId, req.body.receiverId],
    });

    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error); 
  }
};


export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};