import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

// Create a new order
export const createOrder = async (req, res) => {
  const userId = req.user._id;
  const {
    cartId,
    deliveryAddress,
    deliveryPhone,
    deliveryMethod,
    paymentMethod,
    items,
    total,
  } = req.body;

  try {
    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create a new order
    const newOrder = new Order({
      user: userId,
      items: items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      deliveryAddress,
      deliveryPhone,
      deliveryMethod,
      paymentMethod,
    });

    // Save the order
    const savedOrder = await newOrder.save();

    // Delete the cart if it exists
    if (cartId) {
      await Cart.findByIdAndDelete(cartId);
    }
    // console.log(savedOrder._id);

    // Update user: remove cart and add order
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $unset: { cart: "" }, $push: { orders: savedOrder._id } },
      { new: true }
    );

    // console.log(updatedUser);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get orders of a specific user
export const getUserOrder = async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await Order.find({ user: userId }).populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all orders (Admin or authorized access)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
