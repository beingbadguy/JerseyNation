import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const loginUser = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      setLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/api/auth/login`, data, {
          withCredentials: true,
        });

        console.log("Response data:", response.data);

        // Store token and navigate after successful login
        localStorage.setItem(
          "JerseyNation",
          JSON.stringify(response.data.data)
        );
        queryClient.setQueryData(["user"], response.data.user);
        navigate("/");
        window.location.reload();

        setLoading(false);
      } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        setError(error.response?.data.message);
        setLoading(false);
      }
    },
  });

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userForm.email === "" || userForm.password === "") {
      console.log("Please enter all the fields");
    } else {
      loginUser.mutate(userForm);
    }
  };
  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center flex-col gap-6 ">
      <div className="md:border p-6 mt-20 sm:p-12 md:shadow-md rounded-md lg:w-[30%]">
        <div className="flex justify-center items-center gap-1 flex-col">
          <img src="./logo.svg" alt="jerseyNation-logo" className="h-7" />

          {/* <p className="font-bold text-xl">
            Jersey<span className="text-green-500">Nation</span>
          </p> */}
          <p className="font-bold text-2xl">Welcome Back</p>
          <p>Login to continue</p>
        </div>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="border p-2 rounded-md outline-green-500 bg-gray-50"
              placeholder="Enter email address"
              value={userForm.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="password" className="font-bold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                required
                className="border p-2 rounded-md outline-green-500 bg-gray-50 w-full"
                placeholder="Enter password"
                value={userForm.password}
                onChange={handleChange}
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => {
                  setShowPass(!showPass);
                }}
              >
                {showPass ? <VscEye /> : <VscEyeClosed />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-md text-white font-bold p-2 bg-green-500 w-full flex items-center justify-center"
          >
            {loading ? (
              <TailSpin
                visible={true}
                height="25"
                width="25"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Login"
            )}
          </button>
          <p className="text-red-500">{error}</p>
        </form>
        <div className="mt-4">
          Don't Have an account?{" "}
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
