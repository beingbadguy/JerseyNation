import React from "react";

const Newletter = () => {
  return (
    <div className="flex items-center justify-center flex-col w-full text-center my-10 gap-2">
      <div className="text-lg sm:text-xl font-bold">Sign up for our newsletter to receive special offers</div>
      <div className="flex flex-col gap-2 sm:flex-row w-[70%] ">
        <input type="email" placeholder="Enter your email address" className="border p-2 outline-green-500 w-full rounded-md" />
        <button className="bg-green-500 p-2 rounded-md text-white font-bold">Subscribe</button>
      </div>
    </div>
  );
};

export default Newletter;
