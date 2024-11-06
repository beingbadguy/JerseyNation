import React, { useContext, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Newletter from "./components/Newletter";
import Faq from "./components/Faq";
import Popular from "./components/Popular";
import Gallery from "./components/Gallery";
import Product from "./components/Product";
import { UserContext } from "./Context/UserContext";
import ShopCategories from "./pages/ShopCategories";
import Hero from "./components/Hero";
import OffersMarquee from "./components/OffersMarquee";
import { useNavigate } from "react-router-dom";
import Hero2 from "./components/Hero2";

const App = () => {
  // const { wishlist } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="min-h-[73vh] mt-14 sm:mt-0 ">
      {/* <p>This is the react app</p> */}
      {/* <Gallery /> */}
      {/* <Hero /> */}
      <Hero2 />
      <ShopCategories />
      <OffersMarquee />
      <Product />
      <img
        src="https://images.unsplash.com/photo-1550591852-c88075851174?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="h-[400px] object-cover w-full brightness-75"
      />
      {/* <Popular /> */}
      <div className="flex flex-col items-center justify-center gap-1">
        <p className=" text-2xl sm:text-3xl my-4 mt-10">
          Frequently Asked Questions
        </p>
        <Faq />
        <Faq
          question="How can I track my order after placing it?"
          answer="After placing your order, you will receive a confirmation email containing a tracking link. You can also log into your JerseyNation account and check your order status in the 'My Orders' section."
        />
        <Faq
          question="What is your return policy for jerseys?"
          answer="We want you to be completely satisfied with your purchase. If you need to return an item, you can do so within 30 days of receipt. The item must be unworn, unwashed, and in its original packaging. Please refer to our Returns page for more details."
        />
        <Faq
          question="How can I contact customer support for assistance?"
          answer="You can reach our customer support team through the 'Contact Us' section on our website. We are available via email at support@jerseyNation.in or through our WhatsApp support number. Our team is here to assist you from 9 AM to 7 PM IST, Monday to Saturday."
        />
      </div>

      <Newletter />
    </div>
  );
};

export default App;
