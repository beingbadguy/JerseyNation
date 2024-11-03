import cloudinary from "cloudinary";

const cloudinaryConnect = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Connected to Cloudinary");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
export default cloudinaryConnect;
