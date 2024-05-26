import express from 'express'
import { isauth } from '../middleware/authMiddleware.js';
import { singleUpload } from "../middleware/multer.js";
import { createPostController, deleteRouteController, getAllPostController, getPostDetailController, getUserPostController, updatePostController } from '../controllers/blogController.js';

const router=express.Router();
// routes of all posts
router.post('/post',isauth,singleUpload,createPostController);
router.put('/update/:id',isauth,singleUpload, updatePostController)
router.delete('/delete/:id',isauth,deleteRouteController)
router.get('/post-detail/:id',getPostDetailController)
router.get('/posts',getAllPostController);
router.get('/post/user/:userID',getUserPostController);


export default router