import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import cloudinary from "cloudinary";
export const createProduct = async (req, res) => {
  const { name, price, description, quantity, category } = req.body;
  const file = req.files.image;

  try {
    // Validate input fields

    //   || !category
    //   also add the category
    if (!name || !price || !category || !quantity || !description || !file) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields and upload an image",
      });
    }

    // Upload the image to Cloudinary
    const imageUploadResult = await cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: "products", // Optional: specify a folder in Cloudinary
      }
    );

    // Create a new product
    const product = await Product.create({
      name,
      price,
      description,
      quantity,
      image: imageUploadResult.secure_url, // Store the Cloudinary image URL
      category, //also add the category
    });
    await Category.findByIdAndUpdate(category, {
      $push: { products: product._id },
    });

    // Respond with the created product
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Optional: Implement getProduct function
export const getSingleProduct = async (req, res) => {
  try {
    // Fetch product by ID or other criteria
    const product = await Product.findById(req.params.id).populate({
      path: "category",
      select: "name", // Only return the name of the category
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, quantity, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, quantity, category },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
