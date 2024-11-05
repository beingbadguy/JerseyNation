import Category from "../models/category.model.js";
import cloudinary from "cloudinary";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const file = req.files.image;

  try {
    //   validate
    if (!name || !file) {
      return res
        .status(400)
        .json({ success: false, message: "Name & Image is required" });
    }
    // check if category exists already
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const imageUploadResult = await cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: "categories", // Optional: specify a folder in Cloudinary
      }
    );
    //create a new category
    const category = await Category.create({
      name,
      image: imageUploadResult.secure_url,
    });
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      categories,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
