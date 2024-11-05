import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineChevronRight } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const Checkout = () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { cart, user } = useContext(UserContext);
  const [selectedShipping, setSelectedShipping] = useState();
  // console.log(user);

  // Local state for address and phone
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const addContact = useMutation({
    mutationKey: ["addContact"],
    mutationFn: async ({ address, phone }) => {
      const response = await axios.put(`${baseUrl}/api/auth/user`, {
        address,
        phone,
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]); // Invalidate user query on success
      console.log("Contact updated successfully!");
      // console.log(data?.user);

      localStorage.setItem("JerseyNation", JSON.stringify(data?.user));
      setIsEditing(false); // Close editing mode on success
    },
    onError: (error) => {
      console.log(error.message);
      setError("Failed to update contact. Please try again.");
    },
    onMutate: () => {
      setLoading(true); // Set loading state when mutation is triggered
    },
    onSettled: () => {
      setLoading(false); // Reset loading state when mutation settles
    },
  });
  // console.log(cart?.cart?._id);

  const createOrder = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/api/checkouts/checkout`, {
          cartId: cart?.cart?._id,
          deliveryAddress: address,
          deliveryPhone: phone,
          deliveryMethod: selectedShipping?.label,
          paymentMethod: "COD", // Ensure paymentMethod is sent
          total: calculateTotal(),
          items: cart?.cart?.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        });
        return response.data;
      } catch (error) {
        console.log(error.message);
        setError("Failed to create order. Please try again.");
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]); // Invalidate cart query on success
      console.log("Order created successfully!");
      // console.log(data?.order);
      navigate(`/confirm/${data?.order?._id}`);
      window.location.reload();
      // navigate(`/order/${data?.order.id}`);
    },
  });

  const createOrderHandler = () => {
    if (!address || !phone) {
      setError("Please fill out all required fields.");
      return;
    } else {
      setCreating(true);
      setTimeout(() => {
        createOrder.mutate();
        setCreating(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (!cart?.cart?.items?.length) {
      navigate("/cart");
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }
  }, [cart, navigate]);

  const handleShippingChange = (shippingOption) => {
    setSelectedShipping(shippingOption);
  };

  const calculateTotal = () => {
    const subtotal =
      cart?.cart?.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ) || 0;
    const shippingCost = selectedShipping?.price || 0;
    return subtotal + shippingCost;
  };

  const shippingOptions = [
    {
      id: 1,
      label: "Free Shipping",
      price: 0,
      days: "7-10 Business Days",
    },
    {
      id: 2,
      label: "Standard Shipping",
      price: 50,
      days: "3-5 Business Days",
    },
    {
      id: 3,
      label: "Express Shipping",
      price: 150,
      days: "1-2 Business Days",
    },
  ];

  const handleUpdateAddress = () => {
    setError(""); // Reset error state
    if (!address || !phone) {
      return setError("Please enter a valid address and phone number");
    } else if (isNaN(phone) || phone.length < 10) {
      return setError("Please enter a valid phone number");
    } else {
      addContact.mutate({ address, phone });
    }
  };

  return (
    <div className="min-h-[80vh] mt-16 sm:mt-0 mb-10">
      <div className="mx-4 flex items-center gap-2 mt-4">
        <p
          className="cursor-pointer text-black hover:underline"
          onClick={() => navigate("/")}
        >
          Home
        </p>
        <MdOutlineChevronRight />
        <p
          onClick={() => navigate("/cart")}
          className="hover:underline cursor-pointer"
        >
          Cart
        </p>
        <MdOutlineChevronRight />
        <p>Checkout</p>
      </div>

      <div className="mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Your Order</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    className="border p-2 w-full mb-2"
                  />

                  <input
                    type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="border p-2 w-full mb-2"
                  />
                  {error && <p className="text-red-500">{error}</p>}
                  <button
                    onClick={handleUpdateAddress}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                    disabled={loading} // Disable the button while loading
                  >
                    {loading ? "Saving..." : "Save Address"}
                  </button>
                </div>
              ) : (
                <div>
                  <p>Address: {user?.address || "No address provided"}</p>
                  <p>Phone: +91 {user?.phone || "No phone number provided"}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-2 text-green-500 hover:underline"
                  >
                    Edit Address
                  </button>
                </div>
              )}
            </div>
            <div className="border p-4 rounded-md border-gray-300">
              <h4 className="text-lg font-semibold mb-2">Order Summary</h4>
              <div className="flex flex-col gap-4 my-2">
                {cart?.cart?.items?.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <img
                      src={item?.product.image}
                      alt=""
                      className="h-[72px] rounded"
                    />
                    <div>
                      {item?.product?.name}
                      <li>
                        ₹
                        {item?.product?.price +
                          " x " +
                          item.quantity +
                          " = " +
                          "₹" +
                          item.product.price * item.quantity}
                      </li>
                      <li className="bg-green-200 w-[70px] flex items-center justify-center rounded-sm italic">
                        size: {item.size}
                      </li>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="flex justify-between mt-2">
                <p>Subtotal</p>
                <p>
                  ₹
                  {cart?.cart?.items.reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                  ) || 0}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p>Shipping Cost</p>
                <p>₹{selectedShipping?.price || 0}</p>
              </div>
              <hr />
              <div className="flex justify-between mt-4">
                <p className="font-bold">Grand Total</p>
                <p className="font-bold">₹{calculateTotal()}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Shipping Method</h4>
            <div className="flex flex-col space-y-2">
              {shippingOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={selectedShipping?.id === option.id}
                    onChange={() => handleShippingChange(option)}
                  />
                  <span className="ml-2">
                    {option.label} ({option.days}) - ₹{option.price}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto flex items-center justify-center"
              onClick={createOrderHandler}
            >
              {creating ? (
                <TailSpin
                  visible={true}
                  height="20"
                  width="100"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="2"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Pay with COD"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
