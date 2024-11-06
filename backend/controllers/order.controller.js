import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import sendMail from "../utils/confirmationMail.js";

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
    // Save the order first
    const savedOrder = await newOrder.save();

    // Populate the product details in each item
    const theorderdetails = await Order.populate(savedOrder, {
      path: "items.product",
    });

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

    // const theorderdetails = await Order.findById(savedOrder._id);
    // console.log(theorderdetails.items[0].product.name);

    // console.log(updatedUser);

    // sendmail logic
    const emailTemplate = `
  <html>
    <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <header style="background-color: #007bff; padding: 10px; color: #ffffff; text-align: center; border-radius: 8px 8px 0 0;">
          <h2>Yay! Your Order Is Confirmed</h2>
        </header>

        <section style="padding: 20px;">
          <p>Hi ${userExists.name},</p>
          <p>Thank you for your order. We will send you a confirmation when your order ships.</p>
          

          <p><strong>Order No:</strong> ${savedOrder._id}</p>

     <h3 style="border-bottom: 2px solid #007bff; padding-bottom: 5px; color: #007bff;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f4f8fb;">
                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Product</th>
                <th style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">Quantity</th>
                <th style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${theorderdetails.items
                .map(
                  (item) => `
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.product.name}</td>
                    <td style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                    <td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">₹${item.price}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>

          <p style="text-align: right; font-weight: bold; color: #007bff; margin-top: 10px;">Total: ₹${
            total || 0
          }</p>

          <h3 style="margin-top: 20px; color: #007bff;">Shipping Address:</h3>
          <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">${deliveryAddress}</p>
        </section>

        <footer style="text-align: center; font-size: 0.8em; color: #888; padding: 10px 20px; background-color: #f1f1f1; border-radius: 0 0 8px 8px;">
          Team JerseyNation 
        </footer>
      </div>
    </body>
  </html>
`;

    sendMail(
      userExists.email,
      "JerseyNation: Order Confirmation",
      ``,
      emailTemplate
    );

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
