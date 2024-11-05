import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineChevronRight, MdOutlineClose } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const SearchResult = () => {
  const { data, likeHandler, wishlist,user } = useContext(UserContext);
  const { name } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(data?.products);
  const wishArr = wishlist?.wishlist?.items;

  // Check if product is in wishlist
  const isLiked = (productId) => {
    return wishArr?.some((item) => item.product._id === productId);
  };

  const changeHandle = (input) => {
    const filtered = data?.products?.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-[71vh] mt-16 sm:mt-0">
      <div className="m-4 flex items-center gap-2 mt-4">
        <p
          className="cursor-pointer text-black hover:underline"
          onClick={() => navigate("/")}
        >
          Home
        </p>
        <MdOutlineChevronRight />
        <p className="text-gray-600">
          Search results for "
          <span className="text-green-500 font-bold">{name}</span>"
        </p>
      </div>
      <div className="p-4">
        <p className="text-3xl">Search Results</p>
        <div className="flex items-center gap-1 border p-2 rounded border-black mt-2">
          <IoIosSearch className="text-3xl" />
          <input
            type="text"
            className="w-full outline-none"
            value={search}
            placeholder="Search products..."
            onChange={(e) => {
              const inputValue = e.target.value;
              setSearch(inputValue);
              changeHandle(inputValue);
            }}
          />
          {search?.length > 0 ? (
            <MdOutlineClose
              className="text-3xl cursor-pointer"
              onClick={() => {
                setSearch("");
                setFilteredProducts(data?.products);
              }}
            />
          ) : null}
        </div>
      </div>
      <div>
        {filteredProducts?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5  p-4">
            {filteredProducts?.map((item) => (
              <div key={item._id} className="border rounded-md p-2 relative">
                <div>
                  <img
                    src={item.image}
                    alt=""
                    className="p-2 hover:scale-75 transition-all duration-500 cursor-pointer"
                    onClick={() => {
                      navigate(`/product/${item._id}`);
                    }}
                  />
                </div>
                <hr />
                <h3
                  className="font-bold cursor-pointer"
                  onClick={() => {
                    navigate(`/product/${item._id}`);
                  }}
                >
                  {item.name}
                </h3>
                <p className="text-green-500 font-bold">₹{item.price}</p>
                <div
                  className="absolute top-3 right-3 bg-gray-100 rounded-full p-2 cursor-pointer"
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    } else {
                      likeHandler(item._id);
                    }
                  }}
                >
                  {isLiked(item._id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-black" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center font-bold text-red-500 text-xl">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
