import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { VscOctoface } from "react-icons/vsc";

const Orders = () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const { data: ordersData } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/checkouts/orders`);
      return response.data; // Adjust according to your API response structure
    },
  });

  const [searchOrder, setSearchOrder] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const handleSearch = (name) => {
    if (!ordersData) return; // Prevent errors if data is not loaded yet
    const filtered = ordersData.filter((order) =>
      order.user.name.toLowerCase().includes(name.trim().toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const displayedOrders = searchOrder.length > 0 ? filteredOrders : ordersData;

  return (
    <div>
      <div className="p-4 flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl">Orders ({displayedOrders?.length})</h1>
        <div className="p-2 flex border border-gray-300 rounded-md gap-2 bg-gray-100 w-[50%]">
          <IoIosSearch className="text-2xl text-gray-400" />
          <input
            type="text"
            className="outline-none bg-transparent w-full"
            placeholder="Search for a user"
            value={searchOrder}
            onChange={(e) => {
              setSearchOrder(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <hr />

      {displayedOrders?.length > 0 ? (
        <div>
          <div className="p-4 grid grid-cols-3 font-bold">
            <div>Order ID</div>
            <div>Customer Name</div>
            <div>Total Amount</div>
          </div>
          <div>
            {displayedOrders.map((order) => (
              <div
                key={order._id}
                className="p-4 border border-gray-300 rounded-md  grid  sm:grid-cols-3"
              >
                <p>{order._id}</p>
                <p>{order.user.name}</p>
                <p>₹{order.total}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 flex items-center gap-1 font-bold">
          <VscOctoface className="text-2xl text-green-500" />
          No orders found!
        </div>
      )}
    </div>
  );
};

export default Orders;
