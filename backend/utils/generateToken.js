import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = async (userId, res) => {
  const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    secure: process.env.NODE_ENV === "production",
  });
};

export default generateTokenAndSetCookie;
