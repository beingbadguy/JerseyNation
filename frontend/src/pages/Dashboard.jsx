import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <div className="p-4 text-xl font-bold flex items-center flex-wrap gap-2">
        Hi {user?.name}, Welcome to the{" "}
        <p className="underline">
          Jersey<span className="text-green-500">Nation </span>
        </p>
        Dashboard
      </div>
      <hr />
    </div>
  );
};

export default Dashboard;
