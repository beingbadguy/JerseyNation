import React from "react";

const Gallery = () => {
  return (
    <div className="flex mb-10">
      <div className="relative w-[50%]">
        <img
          src="https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-[400px] w-full object-cover brightness-50"
        />
        <p className="absolute top-20 left-10 text-white text-2xl">Footballs</p>
      </div>
      <div className="flex flex-col w-[50%] ">
        <img
          src="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-[200px] w-[1000px] object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1552066379-e7bfd22155c5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-[200px] w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Gallery;
