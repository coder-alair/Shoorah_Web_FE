import React from "react";
import { useTheme } from "../context/themeContext";

const SearchInputField = ({
  handleSearchKey,
  placeholder,
  searchKey,
  setSearchKey,
}) => {
  const { theme } = useTheme();
  return (
    <div className="relative w-full ">
      <div className="pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center self-center pl-6  xl:pl-12">
        <svg
          className=" h-4 w-4 xl:h-6 xl:w-6"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.57959 14.1598C11.2134 14.1598 14.1591 11.2139 14.1591 7.57991C14.1591 3.94592 11.2134 1 7.57959 1C3.94578 1 1 3.94592 1 7.57991C1 11.2139 3.94578 14.1598 7.57959 14.1598Z"
            stroke={`${theme.strokeColor}`}
            strokeWidth="1.71429"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.0008 15L12.2383 12.2373"
            stroke={`${theme.strokeColor}`}
            strokeWidth="1.71429"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        onChange={handleSearchKey}
        placeholder={placeholder}
        value={searchKey}
        style={{
          boxShadow:
            "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
        }}
        className={`placeholder:P22Mackinac P22Mackinac block h-full w-full appearance-none rounded-[3rem] border border-gray-300 px-3 py-4 pl-14 pr-5 sm:pr-20 text-base placeholder:tracking-wider xl:py-6 xl:pl-[5.5rem] xl:text-2xl  placeholder-[${theme.strokeColor}] outline-none  ${theme.shoorah_border_focus_4} ${theme.shoorah_border_ring_focus_4}`}
      />
      {searchKey && (
        <div
          onClick={() => setSearchKey("")}
          className="absolute right-0 top-1/2 z-10 flex  -translate-y-1/2 cursor-pointer items-center self-center pr-8 xl:top-[1.5rem] xl:translate-y-0 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill={theme.shoorah_7}
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchInputField;
