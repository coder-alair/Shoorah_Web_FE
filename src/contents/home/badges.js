import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";

const BadgesHomeSection = () => {
  const history = useHistory();
  const { theme } = useTheme();

  return (
    <div className="w-full px-4 xl:px-0">
      <div
        className={`relative  mt-[4rem] flex flex-col justify-center py-8 xl:mb-[1.5rem] xl:h-[10rem]  xl:py-0 xl:pl-4 ${theme.shoorah_bg_7} mx-auto w-full  overflow-hidden rounded-2xl xl:w-[50%]  xl:rounded-[3rem]`}
      >
        <div
          className={`absolute inset-x-0 left-[4rem] lg:left-[14rem] h-[450px] w-[600px] 2xl:w-[650px]`}
        >
          <img src={theme.badge_grad} className="mx-auto h-full w-full" />
        </div>
        <div className="flex items-center justify-evenly gap-4">
          <div
            className={`relative flex h-full w-full items-center justify-between overflow-hidden rounded-[3.5rem] px-4 outline-none xl:px-0`}
          >
            <div className="flex w-full items-center justify-start text-center text-[1.5rem] text-[#fff] sm:text-3xl xl:justify-center xl:gap-x-[2rem] xl:text-4xl">
              <p className="z-10 text-2xl font-medium xl:mr-[1rem] xl:text-3xl 2xl:text-[2.5rem]">
                My Badges
              </p>
            </div>
            <div className="relative flex w-full items-center justify-end outline-none xl:justify-center">
              <div
                onClick={() => history.push("/my-badges")}
                className={` bg-[#fff]   text-center   text-sm xl:w-[10rem] ${theme.shoorah_text_5} xl:text-md flex cursor-pointer items-center justify-center rounded-[3rem]  px-2 py-1 xl:px-3 xl:py-3`}
                style={{ zIndex: 10 }}
              >
                <p
                  className={` P22Mackinac text-sm xl:text-xl ${theme.shoorah_text_8}`}
                >
                  View More
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesHomeSection;
