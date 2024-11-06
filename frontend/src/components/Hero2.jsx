import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosFootball } from "react-icons/io";
import { MdArrowRightAlt } from "react-icons/md";

{/* <MdArrowRightAlt />; */}

const Hero2 = () => {
  const navigate = useNavigate();

  return (
    <div className=" mt-2 h-[500px] flex flex-col items-center justify-center gap-5 border">
      <div className="flex items-center  p-1 gap-1 bg-yellow-50 text-yellow-500 shadow-inner rounded-md">
        JerseyNation Season  <IoIosFootball />
      </div>
      <div className=" w-full  flex flex-col items-center justify-center text-center text-black space-y-4 ">
        <h1 className="text-3xl sm:text-3xl md:text-6xl font-bold">
          Welcome to Jersey Nation
        </h1>
        <p className="text-lg">Gear up with the latest football essentials</p>
        <button
          className="bg-green-300 hover:bg-green-500 text-black px-6 py-2 rounded-md font-bold mt-4 w-[40%] md:w-[15%]"
          onClick={() => {
            navigate(`search/All Products`);
          }}
        >
          Shop Now
        </button>

        {/* Small images surrounding the main text */}
        <div className="flex flex-wrap gap-4">
          <img
            src="./ronaldo.webp"
            alt="Ronaldo"
            className=" h-16 w-16 sm:h-24 sm:w-24 object-cover rounded-full border-4 border-white hover:scale-90 transition-all duration-300 cursor-pointer"
          />
          <img
            src="./messi-1805.jpg"
            alt="Messi"
            className=" h-16 w-16 sm:h-24 sm:w-24 object-cover rounded-full border-4 border-white hover:scale-90 transition-all duration-300 cursor-pointer"
          />
          <img
            src="./ney.jpg"
            alt="Football studs"
            className=" h-16 w-16 sm:h-24 sm:w-24 object-cover rounded-full border-4 border-white hover:scale-90 transition-all duration-300 cursor-pointer"
          />
          <img
            src="./bale.webp"
            alt="Football jersey"
            className=" h-16 w-16 sm:h-24 sm:w-24 object-cover rounded-full border-4 border-white hover:scale-90 transition-all duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero2;
