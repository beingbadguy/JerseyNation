import express from "express";
const app = express();
import { configDotenv } from "dotenv";
import path from "path";
import cloudinaryConnect from "./config/cloudinary.js";
import DatabaseConnection from "./config/db.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import cors from "cors";
configDotenv();
const port = process.env.PORT || 3000;

const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization"],
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // optionsSuccessStatus: 200, // some legacy browsers (IE11, various versions of Android) choke on 204
  })
);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/wishlists", wishlistRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  DatabaseConnection();
  cloudinaryConnect();
  console.log(`listening on ${port}`);
});
