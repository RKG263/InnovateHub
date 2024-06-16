import express from 'express';
import { createStoryController, getStoriesController } from '../controllers/storyController.js';
import { isauth } from '../middleware/authMiddleware.js';
import { singleUpload } from '../middleware/multer.js';

const router=express.Router();

router.get("/getStories", isauth,  getStoriesController);

router.post("/createStory",  isauth, singleUpload, createStoryController);




export default router;