import express from 'express' ;
import { getEvents , createEvent , deleteEvent} from '../controllers/eventController.js';
import { isAdmin, isauth } from '../middleware/authMiddleware.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router()  ;

// router.use('/events')

router.route('/')
  .get(isauth ,  getEvents)
  .post(isauth, isAdmin , singleUpload ,  createEvent);

router.route('/:id')
  .delete(isauth, isAdmin, deleteEvent);

export default router ;