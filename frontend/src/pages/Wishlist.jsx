import React, { useContext, useEffect } from "react";
import { MdDeleteOutline, MdOutlineChevronRight } from "react-icons/md";
import { UserContext } from "../Context/UserContext";
import { BsViewList } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Wishlist = () => {
  const queryClient = useQueryClient();

  const { wishlist, user } = useContext(UserContext);
  // console.log(wishlist?.wishlist.items);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const deleteWishlistHandler = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${baseUrl}/api/wishlists/delete/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlists"]);
      console.log("Product liked successfully");
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="min-h-[71vh] mt-16 sm:mt-0 mb-10">
      <div className="m-4 flex items-center gap-2 mt-4">
        <p
          className="cursor-pointer text-black hover:underline"
          onClick={() => navigate("/")}
        >
          Home
        </p>
        <MdOutlineChevronRight />
        <p className="text-gray-600">Wishlist</p>
      </div>
      <div className="flex items-center justify-center">
        {wishlist?.wishlist?.items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-4 mx-4">
            {wishlist?.wishlist?.items.map((item, index) => (
              <div key={item._id} className="border rounded-md p-2 relative">
                <div className="">
                  <img
                    src={item.product.image}
                    alt=""
                    className="p-2 hover:scale-75 transition-all duration-500"
                    onClick={() => {
                      navigate(`/product/${item.product._id}`);
                    }}
                  />
                </div>
                <hr />
                <h3 className="font-bold">{item.product.name}</h3>
                <p className="text-green-500 font-bold">
                  ₹{item.product.price}
                </p>
                <div
                  className="absolute top-3 right-3 bg-gray-100 rounded-full p-2 cursor-pointer"
                  onClick={() => {
                    deleteWishlistHandler.mutate(item.product._id);
                  }}
                >
                  <IoClose className="text-xl sm:text-2xl text-black" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-red-500 font-bold">
            You don't have any item in the wishlist!
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
