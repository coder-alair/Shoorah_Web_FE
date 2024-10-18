import React, { useState } from "react";
import { useTheme } from "../context/themeContext";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        boxShadow:
          "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
      }}
      className="my-4 w-full rounded-2xl border bg-white lg:rounded-[3rem]"
    >
      <div
        className="relative flex cursor-pointer items-center px-4 py-3 lg:px-10"
        onClick={toggleAccordion}
      >
        {/* <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i> */}
        <svg
          className={
            (isOpen ? ` rotate-90 ` : ` `) +
            " absolute right-2 h-4 w-4 lg:right-[2rem] lg:h-6 lg:w-6"
          }
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.375 0.75C1.375 0.75 6.625 3.858 6.625 6C6.625 8.14125 1.375 11.25 1.375 11.25"
            stroke={theme.shoorah_5}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p className="P22Mackinac text-base lg:text-2xl">{title}</p>
      </div>
      <div
        className={`max-h-0 w-full overflow-hidden px-4 pt-0 transition-all lg:px-10 ${
          isOpen ? "max-h-screen" : ""
        }`}
      >
        <pre className="P22Mackinac whitespace-pre-line pb-8 text-justify text-sm">
          {content}
        </pre>
      </div>
    </div>
  );
};

export default Accordion;
