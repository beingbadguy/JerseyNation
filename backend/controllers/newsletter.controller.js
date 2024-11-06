import Newsletter from "../models/newsletter.model.js";
import sendMail from "../utils/confirmationMail.js";

export const sendNewsletter = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if email is already in the database
    const existingUser = await Newsletter.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const newsletter = await Newsletter.create({ email });
    const emailTemplate = `
  <html>
    <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <header style="background-color: #007bff; padding: 20px; text-align: center; color: #ffffff; border-radius: 8px 8px 0 0;">
         
          <h1>Welcome to JerseyNation!</h1>
        </header>

        <!-- Content Section -->
        <section style="padding: 20px; text-align: center;">
          <h2 style="color: #333;">Thanks for Subscribing!</h2>
          <p>Hi there,</p>
          <p>We're thrilled to have you on board! You'll be the first to hear about our latest products, exclusive offers, and special updates.</p>
          <p>Get ready to score big with your favorite jerseys, personalized just for you!</p>

          <a href="https://jerseynation.onrender.com/" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px; font-size: 16px; text-decoration: none; margin-top: 20px;">
            Visit Our Store
          </a>
        </section>

        <!-- Benefits Section -->
        <section style="padding: 20px;">
          <h3 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 5px;">Here's what you can expect:</h3>
          <ul style="list-style: none; padding: 0; margin: 20px 0;">
            <li style="padding: 10px 0; border-bottom: 1px solid #ddd;">🚀 Exclusive Offers & Discounts</li>
            <li style="padding: 10px 0; border-bottom: 1px solid #ddd;">⚽ Updates on New Jersey Collections</
`;

    sendMail(
      email,
      "JerseyNation: Subscription Confirmation",
      ``,
      emailTemplate
    );
    res
      .status(200)
      .json({ success: true, message: "Newsletter subscription successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getNewsletter = async (req, res) => {
  try {
    const newsletters = await Newsletter.find({});
    res.json({ success: true, newsletters });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
