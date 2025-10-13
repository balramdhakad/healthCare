import express from "express";
import auth from "../../middlewares/authMiddleware.js";
import { cancelOrder, getOrder, getOrders, placeOrder, updateOrderStatusAdmin, updatePaymentStatusAdmin } from "../../controllers/ecommerse/orderControllers.js";

const router = express.Router();

router.post("/", auth("patient","doctor"),placeOrder);
router.get("/", auth("patient","doctor"),getOrders);
router.get("/:id", auth("patient","doctor","admin"),getOrder);
router.get("/:id/cancel", auth("patient","doctor"),cancelOrder);

//only admin Routes
router.get("/:id/payment-status", auth("admin"),updatePaymentStatusAdmin);
router.get("/:id/status", auth("admin"),updateOrderStatusAdmin);


export default router;
