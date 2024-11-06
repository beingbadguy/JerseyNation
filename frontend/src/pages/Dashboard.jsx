import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <div className="p-4 text-xl  flex items-center flex-wrap gap-2">
        Hi {user?.name}, Welcome to the{" "}
        <p className="">
          Jersey<span className="text-yellow-500">Nation </span>
        </p>
        Dashboard
      </div>
      <hr />
      <h1 className="p-4 text-xl text-gray-500">
         Welcome to the heart of your football jersey
        business. Here, you can easily manage all aspects of your online store,
        from tracking inventory to processing customer orders. Stay updated with
        the latest jersey collections, monitor your sales performance, and
        ensure seamless delivery to your customers. Whether you're adding new
        products, reviewing order statuses, or optimizing your sales strategy,
        this dashboard puts everything you need at your fingertips. Your next
        sale is just a click away!
      </h1>
    </div>
  );
};

export default Dashboard;
