import express from "express";
import { getNewsletter, sendNewsletter } from "../controllers/newsletter.controller.js";
const router = express.Router();

router.post("/send", sendNewsletter);
router.get("/getnewsletter", getNewsletter);

export default router;
