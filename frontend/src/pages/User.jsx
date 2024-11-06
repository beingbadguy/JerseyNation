import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MdLocalPhone,
  MdLocationPin,
  MdOutlineChevronRight,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { CiEdit, CiImageOn, CiLogout } from "react-icons/ci";
import { GoVerified } from "react-icons/go";
import { BiBarcodeReader } from "react-icons/bi";
// import React, { useContext, useState, useRef } from "react";
// import { UserContext } from "../Context/UserContext";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
// import { CiImageOn } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";
import { IoCloseOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

const User = () => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const updateProfile = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("phone", phone);
      if (avatar) formData.append("avatar", avatar);

      return await axios.put(`${baseUrl}/api/auth/user`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: (data) => {
      setLoading(false);
      queryClient.invalidateQueries(["user"]);
      // console.log(data.data.user);
      localStorage.setItem("JerseyNation", JSON.stringify(data.data.user));
      window.scrollTo(0, 0);
      window.location.reload();
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !phone || isNaN(phone)) {
      setError("All fields are required and phone must be numeric");
      return;
    } else if (phone.length !== 10) {
      setError("Phone number must be of 10 digits");
      return;
    } else {
      setError(null);
      updateProfile.mutate();
    }
  };

  const logout = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      return await axios.post(`${baseUrl}/api/auth/logout`);
    },
    onSuccess: () => {
      localStorage.removeItem("JerseyNation");
      window.location.reload();
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="min-h-[80vh] mt-16 sm:mt-0 mb-10">
      <div className="mx-4  flex items-center gap-2 mt-2 ">
        <p
          className="cursor-pointer text-black hover:underline"
          onClick={() => navigate("/")}
        >
          Home
        </p>
        <MdOutlineChevronRight />
        <p className=" cursor-pointer ">Profile</p>
      </div>
      <div className="flex justify-between ">
        <div className="p-4 flex items-center gap-4">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt=""
              className="  object-cover rounded-full w-[80px] h-[80px] sm:h-[100px] sm:w-[100px]"
            />
          ) : (
            <div className="border border-gray-400 rounded-full w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] flex items-center justify-center">
              <FaRegUser className="text-2xl sm:text-4xl " />
            </div>
          )}

          <div className="relative">
            <div className="font-bold text-xl sm:text-2xl flex gap-1 items-center">
              {user?.name} <GoVerified className="text-blue-400 text-lg" />
            </div>
            <p className="text-sm sm:text-md">{user?.email}</p>
          </div>
        </div>
        <div className="mr-10">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout")) {
                logout.mutate();
              }
            }}
            className="flex items-center gap-2 rounded-full p-2 bg-gray-200 hover:bg-red-200 hover:text-red-500 "
          >
            <CiLogout />
          </button>
        </div>
      </div>
      <hr />
      <div className="m-4 flex flex-col gap-2">
        {user?.address ? (
          <div className="flex gap-1 items-center">
            <MdLocationPin />
            <p>{user?.address}</p>
          </div>
        ) : (
          ""
        )}
        {user?.phone ? (
          <div className="flex gap-1 items-center">
            <MdLocalPhone />
            <p>{user?.phone}</p>
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-1 items-center">
          <BiBarcodeReader />
          <p
            className="underline  cursor-pointer"
            onClick={() => {
              navigate("/order");
            }}
          >
            Orders
          </p>
        </div>
      </div>

      <div
        className="absolute right-10  
         top-[33%] sm:top-[32%] cursor-pointer text-black  rounded-full p-2 bg-gray-200 hover:bg-green-200 hover:text-green-500 "
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? (
          <IoCloseOutline className="text-lg" />
        ) : (
          <CiEdit className="text-lg" />
        )}
      </div>

      {/* edit items  */}

      <div className={` ${isEditing ? "" : "hidden"} p-4`}>
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md p-2 outline-green-500"
          />

          <label htmlFor="address" className="font-bold">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded-md p-2 outline-green-500"
          />

          <label htmlFor="phone" className="font-bold">
            Phone
          </label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded-md p-2 outline-green-500"
          />

          <label htmlFor="avatar" className="font-bold">
            Profile Image
          </label>
          <div
            className={`h-[100px] rounded-xl flex items-center justify-center border-4  ${
              preview ? "border-none" : "border-dashed"
            }  cursor-pointer`}
            onClick={() => imageRef.current.click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="h-full object-cover rounded-full w-[100px]"
              />
            ) : (
              <CiImageOn className="text-3xl" />
            )}
          </div>
          <input
            type="file"
            id="avatar"
            ref={imageRef}
            hidden
            onChange={handleImageChange}
          />

          {preview && (
            <div className="relative">
              <MdOutlineClose
                className="absolute top-0 right-0 bg-gray-300 rounded-full cursor-pointer"
                onClick={() => {
                  URL.revokeObjectURL(preview);
                  setAvatar(null);
                  setPreview("");
                }}
              />
            </div>
          )}

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="mt-4 bg-green-500 p-4 text-white font-bold rounded-md cursor-pointer hover:bg-green-400 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <TailSpin height="25" width="25" color="white" />
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default User;
