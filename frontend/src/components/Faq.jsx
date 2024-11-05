import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const Faq = ({
  question = "What types of football jerseys do you offer?",
  answer = "We offer a wide range of football jerseys, including those from popular leagues like the Premier League, La Liga, Serie A, and international teams. Our collection features both home and away kits for men, women, and children.",
}) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="px-2 flex justify-center items-center mt-2 sm:w-[80%] md:w-[60%] lg:w-[50%]">
      <div className="w-full">
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out bg-green-200 p-2 rounded-md`}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            <div className="flex items-center gap-2">
              <BsChevronDown
                className={`transform ${collapse ? "rotate-180" : ""}`}
              />
              <p>{question}</p>
            </div>
          </div>
          <div
            className={`${
              collapse ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
            } transition-all duration-300 ease-in-out overflow-hidden `}
          >
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
