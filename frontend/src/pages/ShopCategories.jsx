import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const ShopCategories = () => {
  const { allCategories } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="p-3">
      <p className=" text-2xl sm:text-2xl my-2 font-bold">Shop By Category</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {allCategories?.categories?.map((item, index) => (
          <div
            key={index}
            className=" rounded-md p-2 relative flex flex-col items-center"
            onClick={() => navigate(`/category/${item.name}`)}
          >
            <img
              src={item?.image}
              alt=""
              className="rounded-full h-[150px] border border-gray-300 cursor-pointer hover:scale-90 transition-all duration-500"
            />
            <p className="mt-2 font-bold text-lg">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategories;
