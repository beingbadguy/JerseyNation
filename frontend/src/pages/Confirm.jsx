import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";

const Confirm = () => {
  const { cart } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id.length);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id || id.length !== 24) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-[534px] flex items-center justify-center flex-col gap-4">
      {loading ? (
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <div className="min-h-[534px] flex items-center justify-center flex-col gap-4">
          <div className="bg-yellow-300 h-20 w-20 flex items-center justify-center rounded-full">
            <FaCheck className="text-5xl text-yellow-600" />
          </div>
          <div>
            <p className="font-bold text-sm md:text-2xl text-center">
              Your Order Has Been Created Succefully
            </p>
          </div>
          <div className="w-[70%] text-center ">
            Order Id : <span className="text-neutral-400">{id}</span>
          </div>
          <div className="w-[70%] text-center ">
            <p className="">
              Thankyou for Shopping, You must have received an email regarding
              this order, We are on the way to fullfill your order.
            </p>
          </div>
          <div className="flex gap-5">
            <Link to={"/"}>
              <button className="bg-green-700 text-white p-2 rounded hover:bg-green-500 transition-all duration-300 hover:scale-95">
                Back to home
              </button>
            </Link>
            <Link to={"/order"}>
              <button className="bg-yellow-300 text-black p-2 rounded  hover:bg-yellow-500 transition-all duration-300 hover:scale-95">
                Check my orders
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirm;
