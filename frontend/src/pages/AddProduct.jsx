import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { GoChevronLeft } from "react-icons/go";
import { IoIosAirplane } from "react-icons/io";
import { IoPaperPlaneSharp } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const AddProduct = () => {
  const navigate = useNavigate();
  const imageRef = useRef();
  const queryClient = useQueryClient();
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/categories/`);
      return response.data;
    },
  });

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const addProductMutation = useMutation({
    mutationFn: async (newProduct) => {
      setUploading(true);
      const formData = new FormData();
      Object.keys(newProduct).forEach((key) => {
        formData.append(key, newProduct[key]);
      });
      if (image) {
        formData.append("image", image);
      }
      return await axios.post(`${baseUrl}/api/products/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      setUploading(false);
      // Invalidate and refetch products
      queryClient.invalidateQueries(["products"]);
      setProductData({
        name: "",
        price: "",
        description: "",
        quantity: "",
        category: "",
      });
      URL.revokeObjectURL(image);
      setImage(null);
      console.log("Product added successfully!");
      navigate("/dashboard/products");
    },
    onError: (error) => {
      setUploading(false);
      console.error("Error adding product:", error);
      setUploadError("Failed to add product. Please try again.");
    },
  });

  const handleSubmit = () => {
    if (
      !productData.name ||
      !productData.price ||
      !productData.description ||
      !productData.quantity ||
      !productData.category ||
      image === null
    ) {
      //   alert("Please fill in all required fields.");
      setUploadError("Please fill in all required fields.");
      return;
    } else {
      addProductMutation.mutate(productData);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 m-4">
          <GoChevronLeft
            className="text-3xl cursor-pointer"
            onClick={() => {
              window.history.back();
            }}
          />
          <p>Back to the Product List</p>
        </div>
        <div className="font-bold text-2xl text-green-500 hidden">Add Product</div>
      </div>
      <hr />

      <div className="p-4">
        <div className="grid grid-cols-2 gap-5">
          {/* Product Name */}
          <div className="flex flex-col">
            <label htmlFor="productName" className="font-bold">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              placeholder="Enter product name"
              className="border p-2 outline-green-500 rounded-md"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </div>
          {/* Product Price */}
          <div className="flex flex-col">
            <label htmlFor="productPrice" className="font-bold">
              Product Price
            </label>
            <input
              type="number"
              id="productPrice"
              placeholder="Enter product price"
              className="border p-2 outline-green-500 rounded-md"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 my-4">
          {/* Product Description */}
          <div className="flex flex-col">
            <label htmlFor="productDescription" className="font-bold">
              Product Description
            </label>
            <textarea
              id="productDescription"
              placeholder="Enter product description"
              className="border p-2 outline-green-500 rounded-md"
              rows={5}
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </div>
          {/* Product Quantity & Category */}
          <div className="flex flex-col gap-2 justify-between h-full">
            <div className="flex flex-col">
              <label htmlFor="productQuantity" className="font-bold">
                Product Quantity
              </label>
              <input
                type="number"
                id="productQuantity"
                placeholder="Enter product quantity"
                className="border p-2 outline-green-500 rounded-md"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="productCategory" className="font-bold">
                Product Category
              </label>
              <select
                id="productCategory"
                className="border p-3 outline-green-500 rounded-md"
                name="category"
                value={productData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {data?.categories.map((item, index) => (
                  <option key={index} value={item._id} className="p-2">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Image */}
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
        <div className="flex items-start justify-between">
          <div className="relative">
            <img
              src={
                image ? URL.createObjectURL(image) : URL.revokeObjectURL(image)
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
              <MdOutlineClose />
            </div>
          </div>
          <div>
            <p className="text-red-500 font-bold">{uploadError}</p>

            <div
              className="mt-4 bg-green-500 p-2 rounded text-black font-bold cursor-pointer flex items-center gap-2 px-4 justify-center"
              onClick={handleSubmit}
            >
              {uploading ? (
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
                <div className="flex items-center  gap-2">
                  Add Product
                  <IoIosAirplane className="text-xl" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
