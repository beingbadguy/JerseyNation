import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/category.controller.js";
const router = express.Router();

router.post("/createCategory", createCategory);
router.post("/category/:id", deleteCategory);
router.get("/", getCategories);

export default router;
