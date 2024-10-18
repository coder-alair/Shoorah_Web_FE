import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";

const BackButton = () => {
  const history = useHistory();
  const { theme } = useTheme();
  return (
    <button
      className={`P22Mackinac absolute left-[-10rem] z-20  hidden h-[4rem] w-[4rem] rotate-180 cursor-pointer items-center justify-center  rounded-full border border-transparent text-xl font-[1000] text-white hover:scale-110 xl:flex `}
      onClick={() => history.goBack()}
      title="Go Back"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.375 0.75C1.375 0.75 6.625 3.858 6.625 6C6.625 8.14125 1.375 11.25 1.375 11.25"
          stroke={`${theme.strokeColor2}`}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};

export default BackButton;
