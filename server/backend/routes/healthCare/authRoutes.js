import express from "express";
import authControllers from "../../controllers/healthCare/authControllers.js";
import auth from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup", authControllers.registerUser);
router.post("/login", authControllers.loginUser);

router.get("/protected", auth("admin", "doctor", "doctor"),async(req,res)=>{
    try {
        res.status(200).json({message : "token Valid"})
    } catch (error) {
        res.status(404).json({message : "token expired"})
    }
});

export default router;
