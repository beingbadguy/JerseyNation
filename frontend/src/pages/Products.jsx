import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { IoIosAddCircleOutline, IoIosSearch } from "react-icons/io";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { VscOctoface } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Products = () => {
  const queryClient = useQueryClient();
  const { data } = useContext(UserContext);

  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const [searchProduct, setSearchProduct] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (name) => {
    const product = data.products.filter((item) => {
      return item.name.toLowerCase().includes(name.trim().toLowerCase());
    });
    setSearchProduct(product);
  };

  const deleteProductMutation = useMutation({
    mutationFn: async (productId) => {
      const response = await axios.delete(
        `${baseUrl}/api/products/product/${productId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
      console.log("Product deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      console.log("Failed to delete product. Please try again.");
    },
  });

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete")) {
      deleteProductMutation.mutate(productId);
    }
  };

  return (
    <div>
      <div className="p-4 flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl">Products ({data?.products?.length})</h1>
        <div className="p-2 flex border border-gray-300 rounded-md  gap-2 bg-gray-100 w-[50%] ">
          <IoIosSearch className="text-2xl text-gray-400  " />
          <input
            type="text"
            className="outline-none bg-transparent w-full"
            placeholder="Real Madrid Jersey"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
        <div
          className="  flex gap-1 bg-black text-white p-2 rounded cursor-pointer"
          onClick={() => {
            navigate("/dashboard/add");
          }}
        >
          <IoIosAddCircleOutline className="text-2xl" />
          <p className="hidden sm:block">Add Product</p>
        </div>
      </div>
      <hr />

      {search.length > 0 ? (
        searchProduct.length > 0 ? (
          <div>
            <div
              className="p-4 grid 
           grid-cols-4 sm:grid-cols-5 font-bold "
            >
              <div>Picture</div>
              <div>Name</div>
              <div>Quantity</div>
              <div>Price</div>
              <div className=" hidden sm:block">Actions</div>
            </div>
            <div>
              {searchProduct?.map((item, index) => (
                <div key={index}>
                  <div
                    key={index}
                    className="p-4 border border-gray-300 rounded-md gap-4 grid grid-cols-4 sm:grid-cols-5"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-10 h-10 object-cover"
                    />
                    <h2>{item.name}</h2>
                    <p>{item.quantity}</p>
                    <p>₹{item.price}</p>
                    <div className="flex items-center gap-4">
                      <CiEdit
                        className="text-2xl cursor-pointer hover:text-green-500"
                        onClick={() => {
                          navigate(`/dashboard/edit/${item._id}`);
                        }}
                      />
                      <MdDeleteOutline
                        className="text-2xl cursor-pointer hover:text-red-500"
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 flex items-center gap-1 font-bold">
            <VscOctoface className="text-2xl text-green-500" />
            No Product with such name found!
          </div>
        )
      ) : (
        <div>
          <div className="p-4 grid grid-cols-4 sm:grid-cols-5 font-bold ">
            <div>Picture</div>
            <div>Name</div>
            <div>Quantity</div>
            <div>Price</div>
            <div className="hidden sm:block">Actions</div>
          </div>
          <div>
            {data?.products?.map((item, index) => (
              <div key={index}>
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-md gap-4 grid grid-cols-4 sm:grid-cols-5"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-10 h-10 object-cover"
                  />
                  <h2>{item.name}</h2>
                  <p>{item.quantity}</p>
                  <p>₹{item.price}</p>
                  <div className="flex items-center gap-4">
                    <CiEdit
                      className="text-2xl cursor-pointer hover:text-green-500 "
                      onClick={() => {
                        navigate(`/dashboard/edit/${item._id}`);
                      }}
                    />
                    <MdDeleteOutline
                      className="text-2xl cursor-pointer hover:text-red-500"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
