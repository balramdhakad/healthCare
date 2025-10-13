import express from "express"
import auth from "../../middlewares/authMiddleware.js"
import { getChat, getChatUsers, sendMessage } from  "../../controllers/chats/chatControllers.js"
import upload from "../../config/multer.js"
const router = express.Router()


router.get("/users",auth("doctor","patient","admin"),getChatUsers)
router.get("/:userId",auth("doctor","patient","admin"),getChat)
router.post("/:userId",auth("doctor","patient","admin"),upload.single("image"),sendMessage)

export default router