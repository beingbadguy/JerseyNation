import express from "express";
import {
  signup,
  login,
  logout,
  users,
} from "../controllers/auth.controller.js";
import ProtectedRoute from "../middlewares/protectedRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", users);
router.get("/me", ProtectedRoute, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
