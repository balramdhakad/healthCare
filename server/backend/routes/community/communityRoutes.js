import express from "express";
import auth from '../../middlewares/authMiddleware.js'; 
import {
  createCommunity,
  getCommunities,
  getCommunityDetails,
  joinCommunity,
} from "../../controllers/community/communityControllers.js";

import postRoutes from "./postRoutes.js"


const router = express.Router();

// Community related routes
router.get("/",auth("patient","doctor"),getCommunities)
router.post("/",auth("patient","doctor"),createCommunity)
router.get("/:id",auth("patient","doctor"),getCommunityDetails)
router.post("/:id/join",auth("patient","doctor"),joinCommunity)

// Post related routes
router.use("/:id/posts", postRoutes)


export default router;
