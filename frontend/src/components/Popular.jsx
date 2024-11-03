import React from "react";

const Popular = () => {
  return (
    <div>
      <p className="p-4 text-lg font-bold sm:text-2xl">Popular Clubs</p>
      <div className="flex items-center justify-evenly">
        <img
          src="./real.png"
          alt=""
          className="h-10 sm:h-full"
        />
        <img
          src="
                https://img.icons8.com/?size=100&id=21578&format=png&color=000000"
          alt=""
          className="h-10 sm:h-full"
        />
        <img
          src="https://img.icons8.com/?size=100&id=21736&format=png&color=000000"
          alt=""
          className="h-10 sm:h-full"
        />
        <img
          src="https://img.icons8.com/?size=100&id=97448&format=png&color=000000"
          alt=""
          className="h-10 sm:h-full"
        />
      </div>
    </div>
  );
};

export default Popular;
