import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../Context/UserContext";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
// import {}

const Product = () => {
  const navigate = useNavigate();
  const { data, likeHandler, wishlist } = useContext(UserContext);
  const wishArr = wishlist?.wishlist?.items;
  console.log(wishArr);
  // console.log(wishlist?.wishlist?.items?.includes("67265c6df85faf4f2edc604a"));

  useEffect(() => {
    let isLiked;
    if (wishlist && wishArr.length > 0) {
      isLiked = (id) => {
        wishArr.filter((item) => {
          console.log(item.product.includes(id));
        });
      };
    }
    // isLiked("67265c6df85faf4f2edc604a");
  }, []);

  return (
    <div className="p-4">
      <p className="font-bold text-2xl">Best Selling Product</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-4">
        {data?.products?.map((item, index) => (
          <div key={item._id} className="border rounded-md p-2 relative">
            <div className="">
              <img
                src={item.image}
                alt=""
                className="p-2 hover:scale-75 transition-all duration-500"
                onClick={() => {
                  navigate(`/product/${item._id}`);
                }}
              />
            </div>
            <hr />
            <h3 className="font-bold">{item.name}</h3>
            <p className="text-green-500 font-bold">₹{item.price}</p>
            <div
              className="absolute top-3 right-3 bg-gray-100 rounded-full p-2 cursor-pointer"
              onClick={() => {
                // console.log()
                likeHandler(item._id);
                console.log(item._id);
              }}
            >
              <FaRegHeart className="text-xl sm:text-2xl text-black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
