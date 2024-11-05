import express from "express";
import {
  createWishlist,
  deleteWishlistItem,
  getWishlist,
} from "../controllers/wishlist.controller.js";
import ProtectedRoute from "../middlewares/protectedRoute.js";

const router = express.Router();

router.post("/add/:id", ProtectedRoute, createWishlist);
router.delete("/delete/:id", ProtectedRoute, deleteWishlistItem);
router.get("/getwishlist", ProtectedRoute, getWishlist);
// router.get("/getwishlist/:wishid", ProtectedRoute, getWishlist);

export default router;
