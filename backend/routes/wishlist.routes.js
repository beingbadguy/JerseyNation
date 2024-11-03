import express from "express";
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
} from "../controllers/wishlist.controller.js";
import ProtectedRoute from "../middlewares/protectedRoute.js";

const router = express.Router();

router.post("/add/:id", ProtectedRoute, createWishlist);
router.delete("/delete/:id", ProtectedRoute, deleteWishlist);
router.get("/getwishlist", ProtectedRoute, getWishlist);

export default router;
