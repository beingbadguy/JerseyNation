import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //   check if user exists
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide all fields",
      });
    }

    const doesUserExists = await User.findOne({ email });
    if (doesUserExists) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    // check the pass length
    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 6 characters long",
      });
    }

    //check the valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format",
      });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    generateTokenAndSetCookie(user._id, res);

    const UserData = await User.findById(user._id).select("-password");

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: UserData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide all fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Incorrect password",
      });
    }
    generateTokenAndSetCookie(user._id, res);
    const UserData = await User.findById(user._id).select("-password");
    res.status(200).json({
      status: true,
      message: "User logged in successfully",
      data: UserData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      status: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const users = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error.message);
  }
};
