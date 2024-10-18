import React from "react";
import { useTheme } from "../context/themeContext";

const ContainerData = ({ title, buttonClick, data, type }) => {
  const { theme } = useTheme();
  return (
    <div>
      <div className="my-4 mt-[2rem] flex w-[90vw] flex-col justify-center rounded-3xl border py-2 shadow-lg md:py-2 lg:px-5 lg:pb-4 xl:my-[3rem]">
        <div className="flex h-full justify-between px-5 py-3">
          <p className="P22Mackinac cursor-default text-lg font-normal xl:text-2xl">
            {title}
          </p>
          <button
            className={`P22Mackinac ${theme.shoorah_text_7} text-sm lg:text-base xl:text-xl`}
            onClick={buttonClick}
          >
            Edit
          </button>
        </div>
        {data.length > 0 && (
          <div className=" flex flex-wrap gap-3 px-5 py-3 lg:gap-5 lg:px-8">
            {data.map((i, index) => (
              <p
                key={index}
                className={`lg:text-md P22Mackinac cursor-default rounded-[3rem] px-2 py-3 text-sm sm:px-4 lg:px-8 ${theme.shoorah_focus_gradient} ${theme.shoorah_text_5} `}
              >
                {i[type]}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContainerData;
