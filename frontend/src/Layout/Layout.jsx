import React, { useContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaRegHeart, FaTwitter } from "react-icons/fa";
import { FaInstagram, FaRegUser, FaWhatsapp } from "react-icons/fa6";
import { RiShoppingBag3Line } from "react-icons/ri";
import { CgSearch } from "react-icons/cg";
import {
  MdArrowRightAlt,
  MdOutlineClose,
  MdOutlineDashboard,
} from "react-icons/md";
import { UserContext } from "../Context/UserContext";
import Subheader from "../components/Subheader";

const Layout = () => {
  const { user, data, cart } = useContext(UserContext);
  // console.log(cart?.cart?.items?.length);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);

  const handleSearch = (name) => {
    const trimmedName = name.trim().toLowerCase();
    if (trimmedName === "") {
      setSearchProduct([]); // Clear search results if input is empty
    } else {
      const filteredProducts = data.products.filter((item) =>
        item.name.toLowerCase().includes(search.trim().toLowerCase())
      );
      setSearchProduct(filteredProducts); // Update search results
    }
  };

  return (
    <div>
      {/* Navigation bar */}
      <div className="p-4 bg-white flex items-center justify-between border sm:sticky top-0 z-50 shadow-md">
        {/* logo */}
        <div
          className="flex justify-center items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <p className="font-bold text-xl">
            Jersey<span className="text-green-500">Nation</span>
          </p>
        </div>
        {/* search */}
        <div className="flex items-center justify-center border p-2 gap-2 sm:w-[50%] rounded border-gray-300 bg-gray-100 absolute top-[65px] w-[96%] sm:static left-2">
          <CgSearch className="text-2xl text-gray-400" />
          <input
            type="text"
            className="outline-none rounded-md w-full bg-transparent"
            placeholder="Real Madrid Kit"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value); // Update search results on input change
            }}
          />
          <MdOutlineClose
            className={`${
              search.length > 0 ? "" : "hidden"
            } text-2xl text-gray-400 cursor-pointer`}
            onClick={() => {
              setSearch("");
              setSearchProduct([]); // Clear search results on close
            }}
          />
          <hr className="absolute w-full sm:hidden top-[47px] border-gray-300 left-0" />
          {/* Search Results */}
          <div className="absolute top-11 sm:top-16 z-[999] bg-gray-100 w-[100%] sm:w-[49%] rounded">
            {searchProduct.length > 0 && search.length > 0 ? (
              <div>
                <p className="p-2 font-bold">Search Results</p>
                <div>
                  {searchProduct.map((item) => (
                    <div
                      key={item._id}
                      className="p-2 cursor-pointer flex gap-2 items-center hover:bg-green-100"
                      onClick={() => {
                        setSearch("");
                        setSearchProduct([]); // Clear results on item click
                        navigate(`/product/${item._id}`);
                      }}
                    >
                      <img src={item.image} alt="" className="h-8" />
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {search.length > 0 && searchProduct.length === 0 ? (
              <div>
                <div
                  className="p-2 flex justify-between cursor-pointer"
                  onClick={() => {
                    navigate(`/search/${search}`);
                    setSearch("");
                    setSearchProduct([]); // Clear results on no match
                  }}
                >
                  <p>
                    No results found for "<span className="">{search}</span>"
                  </p>
                  <MdArrowRightAlt className="text-2xl" />
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {/* icons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
          <FaRegHeart
            className="text-2xl cursor-pointer"
            onClick={() => {
              navigate("wishlist");
            }}
          />
          <div
            className="relative cursor-pointer"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <RiShoppingBag3Line className="text-2xl cursor-pointer" />
            <span className="absolute -top-2 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center font-bold p-2 text-white">
              {cart?.cart?.items?.length > 0 ? cart?.cart?.items?.length : 0}
            </span>
          </div>
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt=""
              className="rounded-full h-8 w-8 cursor-pointer"
              onClick={() => {
                if (!user) {
                  navigate("login");
                } else {
                  navigate("user");
                }
              }}
            />
          ) : (
            <FaRegUser
              className="text-2xl cursor-pointer"
              onClick={() => {
                if (!user) {
                  navigate("login");
                } else {
                  navigate("user");
                }
              }}
            />
          )}
          {user?.role === "admin" ? (
            <MdOutlineDashboard
              className="text-2xl cursor-pointer"
              onClick={() => {
                navigate("/dashboard");
              }}
            />
          ) : null}
        </div>
      </div>
      {/* outlet */}
      <Outlet />
      {/* footer */}
      <div
        className={`${
          pathname === "/login" || pathname === "/signup" ? "hidden" : "block"
        } bg-gradient-to-r from-green-500 to-green-700 p-6 text-white`}
      >
        <div className="flex flex-col items-center text-center sm:text-left sm:flex-row justify-between">
          <div className="flex items-center gap-1">
            <p className="font-bold text-2xl">
              Jersey<span className="text-yellow-300">Nation</span>
            </p>
          </div>
          <p className="text-sm italic mt-2 sm:mt-0">
            "Your one-stop shop for premium football jerseys!"
          </p>
        </div>

        <hr className="my-4 border-t border-gray-200" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm mt-4 space-y-2 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} JerseyNation. All Rights Reserved.
          </div>
          <div className="flex space-x-4 text-2xl">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:text-pink-500 transition duration-200" />
            </a>
            <a
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="hover:text-green-300 transition duration-200" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="hover:text-blue-500 transition duration-200" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:text-blue-400 transition duration-200" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
