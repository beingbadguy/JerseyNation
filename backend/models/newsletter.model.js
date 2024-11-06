import mongoose from "mongoose";
const newsletterSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
