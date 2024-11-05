import express from "express";
const router = express.Router();
import protectedRoute from "../middlewares/protectedRoute.js";
import {
  createOrder,
  getAllOrders,
  getUserOrder,
} from "../controllers/order.controller.js";

router.post("/checkout", protectedRoute, createOrder);
router.get("/order", protectedRoute, getUserOrder);
router.get("/orders", protectedRoute, getAllOrders);

export default router;
