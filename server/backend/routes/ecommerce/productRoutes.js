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

const router = express.Router();

//General Routes Available for All
router.get("/category", getProductsByCategory);
router.get("/", getPropducts);
router.get("/:productId", getproductById);

//only by admin product management
router.post("/",auth("admin"),createProduct);
router.put("/:productId",auth("admin"), updateProduct);
router.delete("/:productId",auth("admin"), deleteProduct);



export default router;
