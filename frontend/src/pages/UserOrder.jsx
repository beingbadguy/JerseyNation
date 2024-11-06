import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { MdOutlineChevronRight } from "react-icons/md";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

const UserOrder = () => {
  const navigate = useNavigate();
  const { cart, user } = useContext(UserContext);
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const queryClient = useQueryClient();

  const {
    data: orders,
    IsError,
    isLoading,
  } = useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/checkouts/order`);
      return response.data;
    },
    onSuccess: (response) => {
      //   console.log(response);
    },
  });
  console.log(orders);

  //   orders?.map((item) => {
  //     console.log(item);
  //   });

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
        <p className=" cursor-pointer ">Orders</p>
      </div>
      <div className="flex items-center justify-center">
        {orders && orders?.length > 0 ? (
          <div className="p-4 grid grid-cols-1 gap-4 w-full">
            {orders?.map((item) => (
              <div key={item._id} className="border rounded-md p-4 shadow-md ">
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4">
                  <p className="">ORDER ID:{item?._id}</p>
                  <p>{format(parseISO(item.createdAt), "MMMM d, yyyy ")}</p>

                  <div className="flex justify-between w-full">
                    <p
                      className={`${
                        item?.status === "pending"
                          ? "text-red-500 rounded "
                          : ""
                      }`}
                    >
                      {item?.status}
                    </p>

                    <p
                      className={`${
                        item?.deliveryMethod === "Express Shipping"
                          ? "text-yellow-500"
                          : "text-green-500"
                      } ${
                        item?.deliveryMethod === "Standard Shipping"
                          ? "text-teal-500"
                          : ""
                      }`}
                    >
                      {item?.deliveryMethod}
                    </p>
                  </div>
                </div>
                <p className="text-xl my-4">Order Items</p>
                <div className="flex flex-col gap-4">
                  {item?.items?.map((product) => (
                    <div key={product._id} className="flex gap-4">
                      <img
                        src={product.product.image}
                        alt=""
                        className="w-24 h-24 "
                      />
                      <div>
                        <p>{product.product.name}</p>
                        <div className="flex gap-2">
                          <p>₹{product.product.price}</p>
                          <p>X</p>
                          <p>{product.quantity}</p>=
                          <p>₹{product.product.price * product.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <hr className="my-2" />
                  <div className="flex gap-2 items-center font-bold">
                    Grand Total :<p>₹{item.total}</p>
                    <p className="font-normal text-gray-300">
                      *including delivery
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 mt-10 font-bold">
            You have not placed any order yet!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
