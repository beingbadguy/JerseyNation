import express from "express";
const router = express.Router();

import ProtectedRoute from "../middlewares/protectedRoute.js";
import { addToCart, deleteCartItem, getCart } from "../controllers/cart.contoller.js";
router.post("/add/:id", ProtectedRoute, addToCart);
router.get("/getCart", ProtectedRoute, getCart);
router.delete("/delete/:id", ProtectedRoute, deleteCartItem);

export default router;
