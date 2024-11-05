import React from "react";
import Marquee from "react-fast-marquee";

const OffersMarquee = () => {
  return (
    <div className="bg-green-500 text-white py-2">
      <Marquee gradient={false} speed={50}>
        ⚽ Get 20% off on all jerseys! 🏆 Free shipping on orders over ₹1000! ⚽
        New arrivals just in! Shop now and save big! ⚽ Get 20% off on all
        jerseys! 🏆 Free shipping on orders over ₹1000! ⚽ New arrivals just in!
        Shop now and save big!
      </Marquee>
    </div>
  );
};

export default OffersMarquee;
