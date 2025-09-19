import express from "express"
import authControllers from "../../controllers/healthCare/authControllers.js"
const router = express.Router();

router.post("/signup", authControllers.registerUser);
router.post("/login", authControllers.loginUser);

export default router;
