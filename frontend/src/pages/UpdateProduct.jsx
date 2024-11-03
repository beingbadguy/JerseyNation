import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { GoChevronLeft } from "react-icons/go";
import { IoIosAirplane } from "react-icons/io";
import { TailSpin } from "react-loader-spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  // State to hold product data
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    category: "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Fetch categories
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/categories/`);
      return response.data;
    },
  });

  // Fetch product by ID
  const {
    data: actualProductData,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/products/product/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      setProductData({
        name: data.name || "",
        price: data.price || "",
        description: data.description || "",
        quantity: data.quantity || "",
        category: data.category || "",
      });
    },
  });
  console.log(actualProductData);

  const addProductMutation = useMutation({
    mutationFn: async (newProduct) => {
      setUploading(true);
      const formData = new FormData();
      Object.keys(newProduct).forEach((key) => {
        formData.append(key, newProduct[key]);
      });

      return await axios.put(
        `${baseUrl}/api/products/product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess: () => {
      setUploading(false);
      queryClient.invalidateQueries(["products"]);
      navigate("/dashboard/products");
    },
    onError: (error) => {
      setUploading(false);
      setUploadError("Failed to update product. Please try again.");
      console.error("Error updating product:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Check if all fields are filled
    if (
      !productData.name ||
      !productData.price ||
      !productData.description ||
      !productData.quantity ||
      !productData.category
    ) {
      setUploadError("Please fill in all required fields.");
      return;
    } else {
      setUploadError(null); // Reset error

      // Create a new product object with only the changed fields
      const updatedProductData = {};
      for (const key in productData) {
        if (productData[key] !== actualProductData[key]) {
          updatedProductData[key] = productData[key];
        }
      }

      // Ensure there are changes to be sent
      if (Object.keys(updatedProductData).length > 0) {
        addProductMutation.mutate(updatedProductData);
      } else {
        setUploadError("No changes detected.");
      }
    }
  };

  if (isCategoriesLoading || isProductLoading) {
    return <TailSpin visible={true} height="50" width="50" color="gray" />;
  }

  // Loading and error handling
  if (productError) return <div>Error loading product!</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 m-2">
          <GoChevronLeft
            className="text-3xl cursor-pointer"
            onClick={() => window.history.back()}
          />
          <p>Back to the Product List</p>
        </div>
        <h2 className=" hidden sm:block font-bold text-2xl text-green-500">Edit Product</h2>
      </div>
      <hr className="my-2" />

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
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

          <div className="flex flex-col gap-2">
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
                {categoriesData?.categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {uploadError && <p className="text-red-500 font-bold">{uploadError}</p>}

        <div className="flex items-center mt-4">
          <button
            className={`bg-green-500 p-2 rounded text-white font-bold flex items-center gap-2 px-4 justify-center ${
              uploading ? "opacity-50" : ""
            }`}
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? (
              <TailSpin height="25" width="25" color="white" />
            ) : (
              "Update Product"
            )}
            <IoIosAirplane className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
