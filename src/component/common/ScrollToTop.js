import React from "react";
import { useTheme } from "../../contents/context/themeContext";
import { useAudio } from "../../contents/context/audiobar";

const ScrollToTop = () => {
  const { theme } = useTheme();
  const { audioNav } = useAudio();

  return (
    <a
      // onClick={() => {
      //   console.log("ScrollToTop")
      //   window.scrollTo({
      //     top: 0,
      //   });
      // }}
      href="#topbar"
      className={
        `fixed ${audioNav ? 'bottom-[13rem] sm:bottom-[13rem] right-2 lg:bottom-[6rem]' : 'bottom-[13vh] right-2 lg:bottom-2'}  bottom-[13vh] right-2 z-40 flex h-16 w-16 scale-75 cursor-pointer items-center justify-center sm:h-20   sm:w-20  lg:bottom-2`
      }
    // className=""
    >
      <div className="relative flex h-full  w-full items-center justify-center">
        <div
          className={`absolute flex h-full w-full items-center justify-center border border-[4px] border-gray-400  rounded-full ${theme.shoorah_bg_5}`}
        >
          <svg
            className="h-[25px] w-[25px] md:h-[40px] md:w-[40px]"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 7.75C9.5 7.75 7.428 4.25 6 4.25C4.5725 4.25 2.5 7.75 2.5 7.75"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default ScrollToTop;
