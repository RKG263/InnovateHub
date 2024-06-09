import express from 'express'
import { isauth } from './../middleware/authMiddleware.js';
import { createPlanController, deletePlanController, getPlanController } from '../controllers/mentorPlanController.js';

const router=express.Router();

// create post
router.post('/post',createPlanController)

// get post by  (this id is mentor id)

router.get('/get-post/:id',getPlanController)

// delete post (this  id is post id)

router.delete('/delete-post/:id',deletePlanController)




export default router