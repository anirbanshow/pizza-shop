import express from "express";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import {
    getAdminOrders,
    getOrderDetails,
    getOrders,
    paymentVerification,
    placeOrder,
    placeOrderOnline,
    processOrder
} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/createOrder", isAuthenticated, placeOrder);

router.post("/createOrderOnline", isAuthenticated, placeOrderOnline);

router.post("/paymentverification", isAuthenticated, paymentVerification);

router.get("/myOrders", isAuthenticated, getOrders);

router.get("/order/:id", isAuthenticated, getOrderDetails);

// Add Admin Middleware
router.get("/admin/order", isAuthenticated, authorizedAdmin, getAdminOrders);

router.get("/admin/order/:id", isAuthenticated, authorizedAdmin, processOrder);

export default router;