import mongoose from "mongoose";

const DatabaseConnection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Failed to connect to MongoDB");
      console.log(error.message);
      process.exit(1);
    });
};
export default DatabaseConnection;
