import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const quantity = req.body.quantity || 1;
  const size = req.body.size;
  // console.log(size);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (!cart) {
      const newCart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity, size: size }],
      });
      user.cart = newCart._id;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        cart: newCart,
      });
    }

    const itemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      if (size?.length > 0) {
        cart.items[itemIndex].size = size;
      }
      await cart.save();
      return res.status(200).json({
        success: true,
        message: "Product quantity updated in cart",
        cart,
      });
    } else {
      cart.items.push({ product: productId, quantity, size: size });
      await cart.save();
      return res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        cart,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteCartItem = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json({
        success: true,
        message: "Product removed from cart successfully",
        cart,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
