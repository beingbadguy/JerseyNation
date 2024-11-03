import User from "../models/user.model.js";
import Wishlist from "../models/wishlist.model.js";

export const createWishlist = async (req, res) => {
  const productId = req.params.id;

  // console.log(req.user);

  const userId = req.user._id;
  // console.log();

  try {
    // Fetch the user and ensure they exist
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
      // Create a new wishlist and add the product
      wishlist = await Wishlist.create({
        user: userId,
        items: [{ product: productId }],
      });
      //   console.log("yha tk theek hai");
      console.log(wishlist._id);

      // Update user with the new wishlist reference
      user.wishlist.push(wishlist._id); // Correctly push the new wishlist ID
      //   console.log("yha gadbar nahi hai"); // Changed message to indicate it's not an issue

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
      // Product exists in the wishlist, so remove it
      wishlist.items.splice(productIndex, 1); // Remove the item using splice
      await wishlist.save();

      // If the wishlist is empty, delete it and update user
      if (wishlist.items.length === 0) {
        await Wishlist.findByIdAndDelete(wishlist._id);
        await User.findByIdAndUpdate(userId, {
          $pull: { wishlist: wishlist._id }, // Remove wishlist reference from user
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product removed from wishlist successfully",
        wishlist,
      });
    } else {
      // Product does not exist, so add it to the wishlist
      //   console.log("yha tk theek hai ");

      wishlist.items.push({ product: productId });
      //   console.log("yha gadbar hai hai ");

      await wishlist.save();
      await User.findByIdAndUpdate(userId, {
        $addToSet: { wishlist: wishlist._id }, // Ensure the user reference is updated
      });

      return res.status(200).json({
        success: true,
        message: "Product added to wishlist successfully",
        wishlist,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteWishlist = async (req, res) => {
  const userId = req.user._id.toString();
  const id = req.params.id;

  try {
    const wishlist = await Wishlist.findByIdAndDelete(id);
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }
    await User.findByIdAndUpdate(userId, {
      $pull: { wishlist: id }, // Remove wishlist reference from user
    });

    return res.status(200).json({
      success: true,
      message: "Wishlist deleted successfully",
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
  try {
    const wishlist = await Wishlist.findOne();
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
