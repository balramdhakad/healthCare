import express from "express"
import auth from "../../middlewares/authMiddleware.js"
import { getChat, getChatUsers, sendMessage } from  "../../controllers/chats/chatControllers.js"
import upload from "../../config/multer.js"
const router = express.Router()


router.get("/users",auth,getChatUsers)
router.get("/:userId",auth,getChat)
router.post("/:userId",auth,upload.single("image"),sendMessage)

export default router