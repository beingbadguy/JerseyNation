import React from "react";

import { TbFaceId } from "react-icons/tb";

const ErrorPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center  text-black mx-4">
      <TbFaceId className="text-8xl mb-10" />
      <h1 className=" text-2xl sm:text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="sm:text-lg mb-6">Oops! It seems you've taken a wrong turn.</p>
      <a
        href="/"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;
