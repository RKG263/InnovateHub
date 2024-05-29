import express from 'express';
import { addMessage, deleteMessageController, getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.post('/', addMessage);

router.get('/:chatId', getMessages);

router.delete('/delete/:id',deleteMessageController)

export default router