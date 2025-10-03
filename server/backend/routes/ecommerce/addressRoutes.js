import express from "express";
import auth from "../../middlewares/authMiddleware.js";
import { createAddress } from "../../controllers/ecommerse/addressControllers.js";
const router = express.Router();

router.post("/", auth("patient","doctor"),createAddress);


export default router;
