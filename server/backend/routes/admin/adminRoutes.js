import express from "express"
import auth from "../../middlewares/authMiddleware.js"
import { getAllDoctors, verifyDoctor} from "../../controllers/admin/adminDoctorControllers.js"
import { createProduct, deleteProduct, updateProduct } from "../../controllers/admin/adminProductControllers.js"
import upload from "../../config/multer.js"
import { getAllOrders, updateOrderStatus } from "../../controllers/admin/adminOrderControllers.js"
import { deleteCommunity, getAllCommunities } from "../../controllers/admin/amdinCommunityControllers.js"
import { getDashboardCounts } from "../../controllers/admin/adminGeneralControllers.js"
const router = express.Router()

//Doctor Routes
router.get("/getdoctors",auth("admin"),getAllDoctors)
router.put("/doctor/verify/:id",auth("admin"),verifyDoctor)

//product Routes 
router.post("/product",auth("admin"),upload.single("image_url"),createProduct);
router.put("/product/:productId",auth("admin"),upload.single("image_url"), updateProduct);
router.delete("/product/:productId",auth("admin"), deleteProduct);

//orders
router.get("/orders",auth("admin"),getAllOrders)
router.put("/orders/:id/status",auth("admin"),updateOrderStatus)

//community
router.get("/communities",auth("admin"),getAllCommunities)
router.delete("/communities/:id",auth("admin"),deleteCommunity)

//get Stats
router.get("/dashboard-counts", auth("admin"), getDashboardCounts);

export default router