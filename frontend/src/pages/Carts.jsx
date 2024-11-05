import React, { useContext, useEffect } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UserContext } from "../Context/UserContext";
import { MdOutlineChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Carts = () => {
  const queryClient = useQueryClient();
  const { cart, AddToCart, user } = useContext(UserContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return (
      cart?.cart?.items?.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ) || 0
    ); // Default to 0 if no items in the cart
  };
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const deleteCartItem = useMutation({
    mutationKey: ["deleteCartItem"],
    mutationFn: async (productId) => {
      const response = await axios.delete(
        `${baseUrl}/api/carts/delete/${productId}`
      );
      return response.data;
    },
    onSuccess: () => {
      console.log("item deleted");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    window.scrollTo(0, 0);
  }, [cart, navigate]);

  return (
    <div className="min-h-[80vh] mt-16 sm:mt-0  mb-10 ">
      <div className="mx-4  flex items-center gap-2 mt-4">
        <p
          className="cursor-pointer text-black hover:underline"
          onClick={() => navigate("/")}
        >
          Home
        </p>
        <MdOutlineChevronRight />
        <p>Cart</p>
      </div>
      {cart?.cart?.items.length < 1 || !cart ? (
        <span className=" text-red-500 font-bold flex items-center justify-center mt-10">
          You do not have any item in the cart
        </span>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 px-4">
          {/* Cart Items */}
          <div className="w-full md:w-3/4">
            {cart?.cart?.items?.map((item) => (
              <div
                key={item.product._id}
                className="grid grid-cols-2 sm:flex sm:items-center gap-4 border-b py-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                <div className="flex flex-col justify-between w-full gap-4">
                  <p className="font-bold">{item.product.name}</p>
                  <p className=" bg-gray-100 w-[60px] text-black flex items-center justify-center rounded italic">
                    Size:{item?.size?.toUpperCase()}
                  </p>
                  <p className="font-bold text-green-600">
                    ₹{item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-8">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          AddToCart.mutate({
                            productId: item.product._id,
                            quantity: -1,
                          });
                        }
                      }}
                      className="bg-gray-200 p-2 rounded-full"
                    >
                      <IoRemove />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => {
                        AddToCart.mutate({
                          productId: item.product._id,
                          quantity: 1,
                        });
                      }}
                      className="bg-gray-200 p-2 rounded-full"
                    >
                      <IoAdd />
                    </button>
                  </div>
                  <button
                    onClick={() => deleteCartItem.mutate(item.product._id)}
                    className="text-red-500"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-lg">Summary</h3>
            <div className="flex justify-between py-2">
              <p>Subtotal</p>
              <p>₹{calculateTotal().toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-2">
              <p>Discount</p>
              <p>₹0</p>
            </div>
            <hr />
            <div className="flex justify-between py-2 font-semibold">
              <p>Grand Total</p>
              <p>₹{calculateTotal().toFixed(2)}</p>
            </div>
            <button
              className="bg-black text-white w-full py-2 mt-4 rounded-md"
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Checkout now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;
