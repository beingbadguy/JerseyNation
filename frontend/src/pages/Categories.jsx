import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/categories`);
      return response.data;
    },
  });

  const addCategory = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: async () => {
      const response = await axios.post(
        `${baseUrl}/api/categories/createCategory`,
        {
          name: category,
        }
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

      setCategory("");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const [error, setError] = useState();
  const [category, setCategory] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      return setError("Please enter a category");
    } else {
      setError(null);
      addCategory.mutate(category);
    }
  };

  console.log(data);
  return (
    <div className="">
      <div className="p-4 text-2xl">Categories</div>
      <hr />
      <div className="flex items-start  justify-between gap-4 mt-4 p-4 flex-col-reverse sm:flex-row">
        <div className="flex flex-col w-full">
          <label htmlFor="category">Category</label>
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
          <p className="text-red-500">{error}</p>
          <p
            className="mt-2 bg-green-500 p-4 flex items-center justify-center text-white font-bold rounded-md cursor-pointer hover:bg-green-400"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Create
          </p>
        </div>
        <div className="w-full">
          <p>All Categories</p>
          {data?.categories?.map((category) => (
            <div
              key={category._id}
              className="p-4 border flex items-center justify-between mt-2"
            >
              <p className="font-bold">{category.name}</p>
              <MdDeleteOutline
                className="cursor-pointer hover:text-red-500"
                onClick={() => {
                  deleteCategory.mutate(category._id);
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
