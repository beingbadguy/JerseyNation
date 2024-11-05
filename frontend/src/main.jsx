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
import SingleCategory from "./pages/SingleCategory.jsx";
import SearchResult from "./pages/SearchResult.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "../../backend/models/cart.model.js";
import Carts from "./pages/Carts.jsx";
import Checkout from "./pages/Checkout.jsx";
import User from "./pages/User.jsx";
import Confirm from "./pages/Confirm.jsx";
import UserOrder from "./pages/UserOrder.jsx";
import Errorpage from "./pages/Errorpage.jsx";

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
      {
        path: "category/:id",
        element: <SingleCategory />,
      },
      {
        path: "search/:name",
        element: <SearchResult />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "cart",
        element: <Carts />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "user",
        element: <User />,
      },

      {
        path: "confirm/:id",
        element: <Confirm />,
      },
      {
        path: "order",
        element: <UserOrder />,
      },
      {
        path: "*",
        element: <Errorpage />,
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
      {
        path: "*",
        element: <Errorpage />,
      },
    ],
  },
  {
    path: "*",
    element: <Errorpage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <MainContext>
      <RouterProvider router={router} />
    </MainContext>
  </QueryClientProvider>
);
