import express from "express";
import { createPost, addComment, getPost } from "../../controllers/community/postControllers.js";
import auth from "../../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });


// Post related routes
router.post("/",auth("patient","doctor"), createPost);
router.put("/:postId/comment",auth("patient","doctor"),addComment);

export default router;
