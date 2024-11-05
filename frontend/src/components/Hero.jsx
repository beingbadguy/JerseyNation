import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const images = [
    "./img3.jpg",
    "./img1.jpg",
    "./img2.jpg",
    "./img4.jpg",
    "./img5.jpg",
    "./img6.jpg",
    "./img7.jpg",
    "./img8.jpg",
    "./img9.jpg",
  ];
  const [index, setIndex] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative">
      <img
        src={images[index]}
        alt="Football gear"
        className="brightness-50 h-[500px] sm:h-[550px] w-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center text-white space-y-4 backdrop-blur-sm">
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

export default Hero;
