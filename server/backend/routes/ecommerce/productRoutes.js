import express from "express";
import {
  createProduct,
  updateProduct,
  getProductsByCategory,
  getproductById,
  getPropducts,
  deleteProduct,
} from "../../controllers/ecommerse/productControllers.js";
import auth from "../../middlewares/authMiddleware.js";
import upload from "../../config/multer.js";

const router = express.Router();

//General Routes Available for All
router.get("/find", getProductsByCategory);
router.get("/", getPropducts);
router.get("/:productId", getproductById);

//only by admin product management
router.post("/",auth("admin"),upload.single("image_url"),createProduct);
router.put("/:productId",auth("admin"),upload.single("image_url"), updateProduct);
router.delete("/:productId",auth("admin"), deleteProduct);

//seed
// router.post("/seed", seedProduct);

export default router;
