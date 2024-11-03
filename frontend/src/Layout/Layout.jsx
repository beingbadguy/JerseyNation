import React, { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaInstagram, FaRegUser, FaWhatsapp } from "react-icons/fa6";
import { RiShoppingBag3Line } from "react-icons/ri";
import { CgSearch } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";
import User from "../../../backend/models/user.model";
import { UserContext } from "../Context/UserContext";

const Layout = () => {
  const { user } = useContext(UserContext)
  // console.log(user);
  const { pathname } = useLocation();
  // console.log(pathname);
  const navigate = useNavigate();

  return (
    <div>
      {/* Navigation bar  */}
      <div className="p-4 bg-white flex items-center justify-between border">
        {/* logo */}
        <div
          className="flex justify-center items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          {/* <img src="./logo.svg" alt="jerseyNation-logo" className="h-7" /> */}
          <p className="font-bold text-xl">
            Jersey<span className="text-green-500">Nation</span>
          </p>
        </div>
        {/* search  */}
        <div className="flex items-center justify-center border p-2 gap-2 sm:w-[50%] rounded border-gray-300 bg-gray-100 absolute top-[65px] w-[96%] sm:static left-2 ">
          <CgSearch className="text-2xl text-gray-400" />
          <input
            type="text"
            className=" outline-none rounded-md w-full bg-transparent"
            placeholder="Real Madrid Kit"
          />
          <hr className="absolute w-full sm:hidden top-[47px] border-gray-300 left-0" />
        </div>
        {/* icons  */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
          <div>
            <FaRegHeart className="text-2xl cursor-pointer" />
          </div>
          <div>
            <RiShoppingBag3Line className="text-2xl cursor-pointer" />
          </div>
          <div onClick={() => navigate("login")}>
            <FaRegUser className="text-2xl cursor-pointer" />
          </div>
          {user?.role === "admin" ? (
            <div>
              <MdOutlineDashboard
                className="text-2xl cursor-pointer"
                onClick={() => {
                  navigate("/dashboard");
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* outlet  */}
      <Outlet />
      {/* footer  */}
      <div
        className={` ${pathname === "/login" ? "hidden" : "block"} ${
          pathname === "/signup" ? "hidden" : "block"
        } bg-green-400  p-4`}
      >
        <div className="py-2 ">
          <div className="flex justify-start items-center gap-1">
            {/* <img src="./logo.svg" alt="jerseyNation-logo" className="h-7" /> */}
            <p className="font-bold text-xl">
              Jersey<span className="text-white">Nation</span>
            </p>
          </div>
          <div></div>
        </div>
        <hr className="my-2 border border-black " />
        <div className="p-2 flex justify-between items-center flex-col sm:flex-row gap-2">
          <div>Copyright@JerseryNation</div>
          <div className="flex gap-2">
            <FaInstagram className="text-3xl" />
            <FaWhatsapp className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
