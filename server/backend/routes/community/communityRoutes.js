import express from "express";
import auth from "../../middlewares/authMiddleware.js";
import {
  createCommunity,
  getCommunities,
  getCommunityDetails,
  getMyCommunities,
  joinCommunity,
} from "../../controllers/community/communityControllers.js";

import postRoutes from "./postRoutes.js";
import { getPost } from "../../controllers/community/postControllers.js";

const router = express.Router();

// Community related routes

router.get("/", 
  // auth("patient", "doctor"),
   getCommunities);
router.post("/", auth("patient", "doctor"), createCommunity);
router.get("/getMyCommunities", auth("patient", "doctor" ), getMyCommunities);
router.get("/post/:id",auth("patient","doctor"), getPost);
router.get("/:id", auth("patient", "doctor"), getCommunityDetails);
router.put("/:id/join", auth("patient", "doctor"), joinCommunity);


// Post related routes
router.use("/:id/posts", postRoutes);

export default router;
