import express from "express";
import {
  createProduct,
  getSingleProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import ProtectedRoute from "../middlewares/protectedRoute.js";
const router = express.Router();

router.post("/create", createProduct);
router.get("/product/:id", getSingleProduct);
router.get("/product", getAllProducts);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);

export default router;
