import express from "express"
import { getResources, postresource } from "../controllers/resourceController.js";

const router=express.Router();

router.post("/postResources",postresource);
router.get("/Resources",getResources);


export default router;