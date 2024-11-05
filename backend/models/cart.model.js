import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
        default: "md", // Default size to medium
        enum: ["xs", "sm", "md", "lg", "xl", "xxl", 6, 7, 8, 9, 10, 11, 12], // Add more sizes as needed
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
