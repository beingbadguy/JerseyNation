import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const { data, likeHandler, wishlist, user } = useContext(UserContext);
  const wishArr = wishlist?.wishlist?.items;

  // Check if a product is liked (exists in wishlist)
  const isLiked = (id) => {
    return wishArr?.some((item) => item.product._id === id);
  };

  return (
    <div className="p-4">
      <p className="font-bold text-2xl">Best Selling Product</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-4">
        {data?.products?.map((item) => (
          <div key={item._id} className="border rounded-md p-2 relative ">
            <div>
              <img
                src={item.image}
                alt={item.name}
                className="p-2 hover:scale-75 transition-all duration-500 cursor-pointer"
                onClick={() => navigate(`/product/${item._id}`)}
              />
            </div>
            <hr />
            <h3
              className="font-bold cursor-pointer"
              onClick={() => navigate(`/product/${item._id}`)}
            >
              {item.name}
            </h3>
            <p className="text-green-500 font-bold">₹{item.price}</p>
            <div
              className="absolute top-3 right-3 bg-gray-100 rounded-full p-2 cursor-pointer"
              onClick={() => {
                if (!user) {
                  navigate("login");
                } else {
                  likeHandler(item._id);
                }
              }}
            >
              {isLiked(item._id) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
