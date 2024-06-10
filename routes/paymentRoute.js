import express from 'express';
import { deleteProductController, genratePaymentLinkController } from '../controllers/paymentController.js';

const router=express.Router();

router.post("/genratePaymentLink", genratePaymentLinkController);

router.post("/deleteProduct", deleteProductController);




export default router;