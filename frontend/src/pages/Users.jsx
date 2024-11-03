import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { VscOctoface } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/auth/users`);
      return response.data;
    },
  });
  console.log(data);

  const [searchUser, setSearchUser] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (name) => {
    const user = data.users.filter((item) => {
      return item.name.toLowerCase().includes(name.trim().toLowerCase());
    });
    setSearchUser(user);
  };
  console.log(searchUser);

  return (
    <div className="">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl">Customers</h1>
        <div className="p-2 flex border border-gray-300 rounded-md  gap-2 bg-gray-100 w-[50%] ">
          <IoIosSearch className="text-2xl text-gray-400  " />
          <input
            type="text"
            className="outline-none bg-transparent w-full"
            placeholder="Cristiano Ronaldo"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <hr />
      {search.length > 0 ? (
        searchUser.length > 0 ? (
          <div>
            <div className="grid grid-cols-3 p-4 font-bold">
              <p>Name</p>
              <p>Email</p>
              {/* <p>Role</p> */}
              <p>Orders</p>
            </div>
            <hr />
            <div className=" flex flex-col">
              {searchUser?.map((user) => (
                <div
                  key={user._id}
                  className="grid sm:grid-cols-3 border p-2 sm:p-4 rounded-xl"
                >
                  <div>{user.name}</div>
                  <div>{user.email}</div>
                  {/* <div>{user.role}</div> */}
                  <div>{user.orders.length} <span className="sm:hidden">Orders</span></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 flex items-center gap-1 font-bold">
            <VscOctoface className="text-2xl text-green-500" />
            No User with such name found!
          </div>
        )
      ) : (
        <div>
          <div className="grid grid-cols-3 p-4 font-bold">
            <p>Name</p>
            <p>Email</p>
            {/* <p>Role</p> */}
            <p>Orders</p>
          </div>
          <hr />
          <div className=" flex flex-col">
            {data?.users?.map((user) => (
              <div
                key={user._id}
                className="grid sm:grid-cols-3 border p-2 sm:p-4 rounded-xl"
              >
                <div>{user.name}</div>
                <div>{user.email}</div>
                {/* <div>{user.role}</div> */}
                <div>
                  {user.orders.length}{" "}
                  <span className=" sm:hidden ">Orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
