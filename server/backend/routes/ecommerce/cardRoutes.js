import express from "express";
import auth from "../../middlewares/authMiddleware.js";
import { addItemToCart, clearUserCart, getUserCart, removeItemFromCart, updateItemQuantity } from "../../controllers/ecommerse/cartControllers.js";

const router = express.Router();

router.get("/", auth("patient","doctor"),getUserCart);
router.post("/add", auth("patient","doctor"),addItemToCart);
router.put("/update", auth("patient","doctor"),updateItemQuantity);
router.delete("/remove", auth("patient","doctor"),removeItemFromCart);
router.delete("/clear", auth("patient","doctor"),clearUserCart);

export default router;
