import express from "express";
import auth from "../../middlewares/authMiddleware.js";
import {
  createAddress,
  deleteAddress,
  getAddress,
  getAddresses,
  setDefaultAddress,
  updateAddress,
} from "../../controllers/ecommerse/addressControllers.js";
const router = express.Router();

router.post("/", auth("patient", "doctor"), createAddress);
router.get("/", auth("patient", "doctor"), getAddresses);
router.get("/:id", auth("patient", "doctor"), getAddress);
router.put("/:id", auth("patient", "doctor"), updateAddress);
router.delete("/:id", auth("patient", "doctor"), deleteAddress);
router.delete("/:id/default", auth("patient", "doctor"), setDefaultAddress);

export default router;
