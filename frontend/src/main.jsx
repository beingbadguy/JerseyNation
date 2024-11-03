import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import Products from "./pages/Products.jsx";
import Users from "./pages/Users.jsx";
import Orders from "./pages/Orders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProduct from "./pages/AddProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import MainContext from "./Context/UserContext.jsx";
import axios from "axios";
import SingleProduct from "./pages/SingleProduct.jsx";
import Categories from "./pages/Categories.jsx";

// Set axios to include credentials in every request
axios.defaults.withCredentials = true;
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: "edit/:id",
        element: <UpdateProduct />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <MainContext>
      <RouterProvider router={router} />
    </MainContext>
  </QueryClientProvider>
);
