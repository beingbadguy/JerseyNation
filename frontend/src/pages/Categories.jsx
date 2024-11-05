import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { MdDeleteOutline, MdOutlineClose } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { UserContext } from "../Context/UserContext";

const Categories = () => {
  const { allCategories } = useContext(UserContext);
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const addCategory = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", category);
      formData.append("image", image);

      return await axios.post(
        `${baseUrl}/api/categories/createCategory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess: () => {
      setLoading(false);
      queryClient.invalidateQueries(["categories"]);
      URL.revokeObjectURL(image);
      setCategory("");
      setImage(null);
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    },
  });

  const deleteCategory = useMutation({
    mutationKey: ["DeleteCategory"],
    mutationFn: async (id) => {
      const response = await axios.post(
        `${baseUrl}/api/categories/category/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setCategory("");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const [category, setCategory] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !image) {
      return setError("Please enter a category and upload image");
    } else {
      setError(null);
      addCategory.mutate(category);
    }
  };

  return (
    <div className="">
      <div className="p-4 text-2xl">
        Categories ({allCategories?.categories?.length})
      </div>
      <hr />
      <div className="flex items-start  justify-between gap-4 mt-4 p-4 flex-col-reverse sm:flex-row">
        <div className="flex flex-col w-full ">
          <label htmlFor="category" className="font-bold">
            Category
          </label>
          <input
            type="text"
            className="border rounded-md  p-4 outline-green-500"
            placeholder="Enter category"
            name="category"
            value={category || ""}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <div className="flex flex-col py-4">
            <label htmlFor="productImage" className="font-bold">
              Product Image
            </label>
            <div
              className="h-[100px] rounded-xl flex items-center justify-center border-4 border-dashed cursor-pointer"
              onClick={() => imageRef.current.click()}
            >
              <CiImageOn className="text-3xl" />
            </div>
            <input
              ref={imageRef}
              type="file"
              id="productImage"
              hidden
              onChange={handleImageChange}
            />
          </div>
          {image ? (
            <div className="flex items-start justify-between">
              <div className="relative">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : URL.revokeObjectURL(image)
                  }
                  alt=""
                  className={`h-60 rounded-md  ${
                    image ? "border border-gray-300" : ""
                  }`}
                />
                <div
                  className={` ${
                    image ? "" : "hidden"
                  } bg-gray-300 p-2 absolute top-1 right-1 rounded-full hover:scale-[0.8] cursor-pointer transition-all duration-500`}
                  onClick={() => {
                    URL.revokeObjectURL(image);
                    setImage(null);
                  }}
                >
                  <MdOutlineClose
                    onClick={() => {
                      URL.revokeObjectURL(image);
                      setImage(null);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <p className="text-red-500">{error}</p>
          <div
            className="mt-2 bg-green-500 p-4 flex items-center justify-center text-white font-bold rounded-md cursor-pointer hover:bg-green-400"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            {loading ? (
              <TailSpin
                visible={true}
                height="25"
                width="25"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Create"
            )}
          </div>
        </div>
        <div className="w-full">
          <p className="font-bold ">All Categories</p>
          {allCategories?.categories?.length === 0 ? (
            <p className="text-red-500">
              You Dont't have any category yet, Please create one!
            </p>
          ) : (
            ""
          )}
          {allCategories?.categories?.map((category) => (
            <div
              key={category._id}
              className="p-4 border flex items-center justify-between mt-2"
            >
              <img
                src={category?.image}
                alt=""
                className="h-20 rounded-full w-20 object-cover"
              />
              <p className="font-bold">{category.name}</p>
              <MdDeleteOutline
                className="cursor-pointer hover:text-red-500"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete?")) {
                    deleteCategory.mutate(category._id);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
