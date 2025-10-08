import express from "express";
import {
  getProductsByCategory,
  getproductById,
  getPropducts,
} from "../../controllers/ecommerse/productControllers.js";

const router = express.Router();

//General Routes Available for All
router.get("/find", getProductsByCategory);
router.get("/", getPropducts);
router.get("/:productId", getproductById);



export default router;
