import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoAdd, IoHeart, IoStarSharp } from "react-icons/io5";
import { MdOutlineChevronRight } from "react-icons/md";
import { RiShoppingBag3Line, RiSubtractLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useEffect } from "react";

const SingleProduct = () => {
  const { data } = useContext(UserContext);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const allProducts = data?.products;
  console.log(allProducts);

  const suggestedProducts = allProducts?.filter((product) => {
    return product._id !== id;
  });
  console.log(suggestedProducts);

  const { data: singleProduct } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/products/product/${id}`);
      return response.data;
    },
    onError: (error) => {
      console.error("Error fetching product:", error);
    },
  });

  const product = singleProduct?.product;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-[80vh] mt-16 md:mt-0 ">
      <hr />
      <div className="mx-4 md:mx-10 flex items-center gap-2 mt-4">
        <p
          className="cursor-pointer text-black hover:underline"
          onClick={() => navigate("/")}
        >
          Home
        </p>
        <MdOutlineChevronRight />
        <p className="text-gray-600">{product?.category?.name}</p>
        <MdOutlineChevronRight />
        <p className="text-green-500 font-semibold">{product?.name}</p>
      </div>
      <div className="flex items-center justify-center md:items-start md:justify-evenly flex-col md:flex-row my-4 p-4">
        <div className="w-full md:w-[50%] flex items-center justify-center mb-4">
          <img
            src={product?.image}
            alt={product?.name}
            className="border p-4 rounded-md md:h-[450px] max-w-full object-contain"
          />
        </div>
        <div className="w-[90%] md:w-[40%] flex flex-col gap-4 justify-between">
          <p className="text-gray-600">{product?.category?.name}</p>
          <p className="font-bold text-2xl">{product?.name}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <IoStarSharp key={index} className="text-yellow-500" />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <p className="font-bold text-xl text-green-600">
              ₹{(product?.price * 0.9).toFixed(2)}
            </p>
            <p className="font-bold text-xl line-through text-red-500">
              ₹{product?.price}
            </p>
          </div>
          <p className="text-gray-700">{product?.description}</p>
          <p className="text-xl font-bold">Stock:{product?.quantity}</p>

          <hr />
          <div className="flex items-center">
            <div
              className="bg-gray-100 w-10 h-10 cursor-pointer flex items-center justify-center rounded-full"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <RiSubtractLine />
            </div>
            <p className="px-4 py-2 h-6 w-10 flex items-center justify-center">
              {quantity}
            </p>
            <div
              className="bg-gray-100 w-10 h-10 cursor-pointer flex items-center justify-center rounded-full"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              <IoAdd />
            </div>
          </div>
          <div className="flex items-center md:mt-0 py-2">
            <div className="flex items-center justify-between gap-2 w-full">
              <div
                className="bg-black flex items-center justify-center text-white gap-2 rounded-md p-2 w-full cursor-pointer hover:bg-white hover:text-black hover:border hover:border-red-500 transition"
                onClick={() => {
                  addToCart(product.id, quantity);
                }}
              >
                <RiShoppingBag3Line />
                Add to cart
              </div>
              <div className="bg-gray-200 p-3 rounded-md cursor-pointer hover:bg-white hover:text-red-500 transition">
                <FaRegHeart />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* suggested product  */}
      <div className="p-4">
        <p className="text-xl">Suggested Products</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-4">
          {suggestedProducts?.map((item, index) => (
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
    </div>
  );
};

export default SingleProduct;
