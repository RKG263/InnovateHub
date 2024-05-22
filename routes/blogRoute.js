import express from 'express'
import { isauth } from '../middleware/authMiddleware.js';
<<<<<<< HEAD
import { createPostController } from '../controllers/blogController.js';

const router=express.Router();

router.post('/post',isauth,createPostController);
=======
import { postController } from '../controllers/blogController.js';

const router=express.Router();

router.post('/post', isauth, postController);
>>>>>>> 9af59804d2c702850f0a9baa9281d511e8a87e3d

export default router