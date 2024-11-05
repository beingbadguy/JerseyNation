import React from "react";

const Newsletter = () => {
  return (
    <div className="flex items-center justify-center flex-col w-full text-center my-16 gap-6 px-4">
      {/* Header Text */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-800">
        Join Our Newsletter
      </h2>
      <p className="text-gray-600 text-sm sm:text-lg">
        Stay updated with exclusive offers and the latest jersey arrivals.
      </p>

      {/* Input and Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-[50%]">
        <input
          type="email"
          placeholder="Enter your email address"
          className="border border-gray-300 p-3 rounded-md w-full sm:w-auto flex-grow bg-gray-100 focus:outline-none focus:border-green-600 transition duration-300"
        />
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 shadow-md hover:shadow-lg">
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
