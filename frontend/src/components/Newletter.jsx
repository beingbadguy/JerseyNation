import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const Newsletter = () => {
  const [useremail, setUseremail] = useState();
  const [error, setError] = useState();
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const sendNewsletter = useMutation({
    mutationKey: ["newsletter"],
    mutationFn: async ({ email }) => {
      const response = await axios.post(
        `${baseUrl}/api/newsletters/send`,
        { email },
        { withCredentials: true }
      );
      return response.data;
    },

    onSuccess: (data) => {
      console.log(data);
      setUseremail("");
      setError("Newsletter subscription successful");
      console.log("Newsletter subscription successful");
    },
    onError: (error) => {
      console.error("Error sending newsletter:", error);
      if (error.status === 400) {
        setError("You have already subscribed.");
        return;
      }
      setError("Error sending newsletter. Please try again later.");
    },
    // Retrying the mutation 3 times if it fails
  });

  return (
    <div className="flex items-center justify-center flex-col w-full text-center my-16 gap-6 px-4">
      {/* Header Text */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-800">
        Join Our Newsletter
      </h2>
      <p className="text-gray-600 text-sm sm:text-lg">
        Stay updated with exclusive offers and the latest jersey arrivals.
      </p>
      {error ? <p className="text-red-500">{error}</p> : ""}

      {/* Input and Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-[50%]">
        <input
          type="string"
          placeholder="Enter your email address"
          className="border border-gray-300 p-3 rounded-md w-full sm:w-auto flex-grow bg-gray-100 focus:outline-none focus:border-green-600 transition duration-300"
          onChange={(e) => {
            setUseremail(e.target.value);
          }}
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 shadow-md hover:shadow-lg"
          onClick={() => {
            if (!useremail) {
              setError("Please enter your email address.");
              return;
            } else {
              const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
              if (emailRegex.test(useremail)) {
                sendNewsletter.mutate({ email: useremail });
              } else {
                setError("Please enter a valid email address.");
              }
            }
          }}
        >
          Subscribe
        </button>
      </div>

      {/* Additional Message */}
      <p className="text-xs text-gray-500 mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default Newsletter;
