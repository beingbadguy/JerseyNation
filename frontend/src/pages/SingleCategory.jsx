import React, { useContext, useEffect } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { FaRegHeart } from "react-icons/fa";

const SingleCategory = () => {
  const navigate = useNavigate();
  const { data, user } = useContext(UserContext);
  // console.log(data.products);
  const { id } = useParams();
  const productList = data?.products?.filter(
    (product) => product.category.name === id
  );
  // console.log(productList);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="min-h-[71vh] mt-16 sm:mt-0">
      <div className="m-4 flex items-center gap-2 mt-4">
        <p
          className="cursor-pointer text-black hover:underline"
          onClick={() => navigate("/")}
        >
          Home
        </p>
        <MdOutlineChevronRight />
        <p className="text-gray-600">
          Showing all the product of "
          <span className="text-green-500 font-bold">{id}</span>"
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-4 m-4">
        {productList?.map((item, index) => (
          <div
            key={item._id}
            className="border rounded-md p-2 relative cursor-pointer"
          >
            <div className="">
              <img
                src={item.image}
                alt=""
                className="p-2 hover:scale-75 transition-all duration-500"
                onClick={() => {
                  navigate(`/product/${item._id}`);
                }}
              />
            </div>
            <hr />
            <h3 className="font-bold">{item.name}</h3>
            <p className="text-green-500 font-bold">₹{item.price}</p>
            <div
              className="absolute top-3 right-3 bg-gray-100 rounded-full p-2 cursor-pointer"
              onClick={() => {
                // console.log()
                if (!user) {
                  navigate("/login");
                } else {
                  likeHandler(item._id);
                }
              }}
            >
              <FaRegHeart className="text-xl sm:text-2xl text-black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCategory;
