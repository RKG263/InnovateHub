import express from 'express'
import { isauth } from '../middleware/authMiddleware.js'
import { createCommentController, deleteCommentController, getAllCommentController, updateCommentController } from '../controllers/commentController.js'
const router=express.Router()

router.post('/create',isauth,createCommentController)
router.put('/update/:id',isauth,updateCommentController)
router.delete('/remove/:id',isauth,deleteCommentController)
router.get('/get-all/:postId',getAllCommentController);

export default router