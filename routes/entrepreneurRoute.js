import express from 'express'
import { isauth } from '../middleware/authMiddleware.js';
import { entrepreneurController, entrepreneurIdeaController, ideaController, investorIdeaController, myInvestorController, myMentorController } from '../controllers/entrepreneurController.js';

const router=express.Router();

router.get('/',isauth,entrepreneurController);
router.get('/investor',isauth,investorIdeaController);
router.post('/idea',isauth,entrepreneurIdeaController);
router.get('/myMentor', isauth , myMentorController);
router.get('/myInvestor', myInvestorController);
router.get('/idea', isauth, ideaController);    




export default router;