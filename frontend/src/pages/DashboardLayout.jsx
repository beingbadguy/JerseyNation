import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiChrome } from "react-icons/fi";

const DashboardLayout = () => {
  const menuBar = [
    {
      id: 1,
      name: "Home",
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjEgMjEiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTEuNSAxMC41bDktOWw5IDkiLz48cGF0aCBkPSJNMy41IDguNXY3YTIgMiAwIDAgMCAyIDJoMTBhMiAyIDAgMCAwIDItMnYtNyIvPjwvZz48L3N2Zz4=",
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Products",
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTQ2NCAxNDRjOC44MzcgMCAxNiA3LjE2MyAxNiAxNnYzMDRjMCA4LjgzNi03LjE2MyAxNi0xNiAxNkgxNjBjLTguODM3IDAtMTYtNy4xNjQtMTYtMTZWMTYwYzAtOC44MzcgNy4xNjMtMTYgMTYtMTZ6bS01MiA2OEgyMTJ2MjAwaDIwMHptNDkzLjMzMyA4Ny42ODZjNi4yNDggNi4yNDggNi4yNDggMTYuMzc5IDAgMjIuNjI3bC0xODEuMDIgMTgxLjAyYy02LjI0OCA2LjI0OC0xNi4zNzggNi4yNDgtMjIuNjI3IDBsLTE4MS4wMTktMTgxLjAyYy02LjI0OC02LjI0OC02LjI0OC0xNi4zNzkgMC0yMi42MjdsMTgxLjAyLTE4MS4wMmM2LjI0OC02LjI0OCAxNi4zNzgtNi4yNDggMjIuNjI3IDB6bS04NC44NTMgMTEuMzEzTDcxMyAyMDMuNTJMNjA1LjUyIDMxMUw3MTMgNDE4LjQ4ek00NjQgNTQ0YzguODM3IDAgMTYgNy4xNjQgMTYgMTZ2MzA0YzAgOC44MzctNy4xNjMgMTYtMTYgMTZIMTYwYy04LjgzNyAwLTE2LTcuMTYzLTE2LTE2VjU2MGMwLTguODM2IDcuMTYzLTE2IDE2LTE2em0tNTIgNjhIMjEydjIwMGgyMDB6bTQ1Mi02OGM4LjgzNyAwIDE2IDcuMTY0IDE2IDE2djMwNGMwIDguODM3LTcuMTYzIDE2LTE2IDE2SDU2MGMtOC44MzcgMC0xNi03LjE2My0xNi0xNlY1NjBjMC04LjgzNiA3LjE2My0xNiAxNi0xNnptLTUyIDY4SDYxMnYyMDBoMjAweiIvPjwvc3ZnPg==",
      path: "products",
    },
    {
      id: 3,
      name: "Users",
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9ImN1cnJlbnRDb2xvciI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNOSAxLjI1YTQuNzUgNC43NSAwIDEgMCAwIDkuNWE0Ljc1IDQuNzUgMCAwIDAgMC05LjVaTTUuNzUgNmEzLjI1IDMuMjUgMCAxIDEgNi41IDBhMy4yNSAzLjI1IDAgMCAxLTYuNSAwWiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTE1IDIuMjVhLjc1Ljc1IDAgMCAwIDAgMS41YTIuMjUgMi4yNSAwIDAgMSAwIDQuNWEuNzUuNzUgMCAwIDAgMCAxLjVhMy43NSAzLjc1IDAgMSAwIDAtNy41WiIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTMuNjc4IDEzLjUyYzEuNC0uOCAzLjI4My0xLjI3IDUuMzIyLTEuMjdjMi4wNCAwIDMuOTIyLjQ3IDUuMzIyIDEuMjdjMS4zNzguNzg4IDIuNDI4IDEuOTkgMi40MjggMy40OHMtMS4wNSAyLjY5Mi0yLjQyOCAzLjQ4Yy0xLjQuOC0zLjI4MyAxLjI3LTUuMzIyIDEuMjdjLTIuMDQgMC0zLjkyMi0uNDctNS4zMjItMS4yN0MyLjMgMTkuNjkyIDEuMjUgMTguNDkgMS4yNSAxN3MxLjA1LTIuNjkyIDIuNDI4LTMuNDhabS43NDQgMS4zMDNDMy4yNjcgMTUuNDgzIDIuNzUgMTYuMjggMi43NSAxN3MuNTE3IDEuNTE3IDEuNjcyIDIuMTc3QzUuNTU2IDE5LjgyNSA3LjE3MyAyMC4yNSA5IDIwLjI1YzEuODI3IDAgMy40NDQtLjQyNSA0LjU3OC0xLjA3M2MxLjE1NS0uNjYgMS42NzItMS40NTggMS42NzItMi4xNzdjMC0uNzItLjUxNy0xLjUxNy0xLjY3Mi0yLjE3N2MtMS4xMzQtLjY0OC0yLjc1MS0xLjA3My00LjU3OC0xLjA3M2MtMS44MjcgMC0zLjQ0NC40MjUtNC41NzggMS4wNzNaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMTguMTYgMTMuMjY3YS43NS43NSAwIDAgMC0uMzIgMS40NjZjLjc5Mi4xNzMgMS40MjUuNDcyIDEuODQzLjgxNGMuNDE4LjM0Mi41NjcuNjc3LjU2Ny45NTNjMCAuMjUtLjEyLjU0NS0uNDUzLjg1NGMtLjMzNS4zMTEtLjg1LjU5OC0xLjUxMy43OThhLjc1Ljc1IDAgMSAwIC40MzIgMS40MzdjLjgyMy0uMjQ4IDEuNTU4LS42MzEgMi4xMDItMS4xMzZjLjU0Ni0uNTA3LjkzMi0xLjE3NC45MzItMS45NTNjMC0uODY1LS40NzQtMS41ODgtMS4xMTctMi4xMTRjLS42NDQtLjUyNy0xLjUxLS45MDgtMi40NzItMS4xMTlaIi8+PC9nPjwvc3ZnPg==",
      path: "users",
    },
    {
      id: 4,
      name: "Orders",
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTUgMTcuMzg1VjguMUwzLjQ1IDQuNjkycS0uMDc5LS4xODItLjAwNi0uMzg3VDMuNyA0LjAycS4xODMtLjA3OS4zODgtLjAwOHEuMjA0LjA3LjI4My4yNTJMNi4wODUgOC4wNWgxMS44M2wxLjcxNC0zLjc4NXEuMDc5LS4xODIuMjgzLS4yNTV0LjM4OC4wMTFxLjE4My4wNzkuMjU2LjI4NHQtLjAwNi4zODdMMTkgOC4xdjkuMjg1cTAgLjY3LS40NzIgMS4xNDNxLS40NzIuNDcyLTEuMTQzLjQ3Mkg2LjYxNXEtLjY3IDAtMS4xNDMtLjQ3MlE1IDE4LjA1NiA1IDE3LjM4NVptNS00Ljg4NWg0cS4yMTMgMCAuMzU3LS4xNDNxLjE0My0uMTQ0LjE0My0uMzU3dC0uMTQzLS4zNTdRMTQuMjEzIDExLjUgMTQgMTEuNWgtNHEtLjIxMyAwLS4zNTcuMTQzcS0uMTQzLjE0NC0uMTQzLjM1N3QuMTQzLjM1N3EuMTQ0LjE0My4zNTcuMTQzWk02LjYxNSAxOGgxMC43N3EuMjY5IDAgLjQ0Mi0uMTczdC4xNzMtLjQ0MlY5LjA1SDZ2OC4zMzVxMCAuMjY5LjE3My40NDJ0LjQ0Mi4xNzNaTTYgMThWOS4wNVYxOFoiLz48L3N2Zz4=",
      path: "orders",
    },
    {
      id: 5,
      name: "Categories",
      icon: "https://img.icons8.com/?size=100&id=15634&format=png&color=000000",
      path: "categories",
    },
  ];
  const [activePath, setActivePath] = useState();
  const navigate = useNavigate();

  return (
    <div className="flex ">
      <div className="flex items-center justify-center  w-full absolute sm:hidden gap-2 bottom-[5%]    ">
        <div className=" flex gap-4 rounded-md  backdrop-blur-md  p-2 border z-[999]">
          {menuBar.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                navigate(item.path);
              }}
              className="cursor-pointer"
            >
              <img src={item.icon} alt="" className="h-7 " />
            </div>
          ))}
          <div>
            <FiChrome
              className="mt-[2px] text-2xl cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full  h-[100vh] ">
        <div className="md:w-[20%]  items-start   flex-col border shadow-xl hidden sm:flex">
          <div className=" flex items-center gap-2 p-2 mt-5">
            <img src="./logo.svg" alt="" />

            <p className="font-bold text-xl hidden lg:block">
              Jersey<span className="text-green-500">Nation</span>
            </p>
          </div>
          <hr className="w-full mt-6" />
          <div className="flex items-center justify-center  flex-col   w-full">
            {menuBar.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-start pl-4  w-full p-4 cursor-pointer gap-4 rounded-xl ${
                  activePath === item.path ? "bg-green-100" : ""
                } `}
                onClick={() => {
                  navigate(item.path);
                  setActivePath(item.path);
                }}
              >
                <img src={item.icon} alt="" className="h-5 " />
                <h2 className="w-[100px] hidden md:block ">{item.name}</h2>
              </div>
            ))}
          </div>
          <div
            className="flex items-center justify-start  border absolute bottom-10 left-20 font-bold bg-black text-white p-2 rounded-lg cursor-pointer gap-2 hover:scale-90 transition-all duration-200"
            onClick={() => {
              navigate("/");
            }}
          >
            <FiChrome className="text-xl" />
          </div>
        </div>
        <div className=" w-[100%] h-[740px] overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
