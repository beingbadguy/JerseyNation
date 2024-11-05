import User from "../models/user.model.js";
import Wishlist from "../models/wishlist.model.js";

export const createWishlist = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId.toString());
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if wishlist exists for the user
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        items: [{ product: productId }],
      });
      // console.log(wishlist._id);

      user.wishlist.push(wishlist._id);

      await user.save();
      return res.status(200).json({
        success: true,
        message: "Product added to wishlist successfully",
        wishlist,
      });
    }

    // Check if product is already in the wishlist
    const productIndex = wishlist.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex !== -1) {
      return res.status(200).json({
        success: false,
        message: "Product already exists in wishlist",
      });
    }

    wishlist.items.push({ product: productId });

    await wishlist.save();
    await User.findByIdAndUpdate(userId, {
      $addToSet: { wishlist: wishlist._id }, // Ensure the user reference is updated
    });

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully",
      wishlist,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteWishlistItem = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id; // ID of the product to remove

  try {
    // Find the wishlist by user ID
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    // Remove the product from the items array
    const productIndex = wishlist.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    wishlist.items.splice(productIndex, 1);
    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
      wishlist,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getWishlist = async (req, res) => {
  const userId = req.user._id;
  // console.log(userId);

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "items.product"
    );
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist retrieved successfully",
      wishlist,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
