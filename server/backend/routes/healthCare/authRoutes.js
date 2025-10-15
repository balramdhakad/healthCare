import express from "express";
import auth from "../../middlewares/authMiddleware.js";
import {
  loginUser,
//   registerUser,
  sendOtpController,
  verifyOtpController,
} from "../../controllers/healthCare/authControllers.js";
const router = express.Router();

// router.post("/signup", registerUser);
router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/login", loginUser);

router.get(
  "/protected",
  auth("admin", "doctor", "patient"),
  async (req, res) => {
    try {
      res.status(200).json({ message: "token Valid" });
    } catch (error) {
      res.status(404).json({ message: "token expired" });
    }
  }
);

export default router;
