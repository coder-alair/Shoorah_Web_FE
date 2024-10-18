import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/themeContext";
import { useOutsideClick } from "../../utils/helper";

const categories = [
  {
    name: "Bright",
    id: 1,
  },
  {
    name: "Town",
    id: 2,
  },
  {
    name: "Sleep",
    id: 3,
  },
  {
    name: "Night",
    id: 4,
  },
  {
    name: "Goal",
    id: 5,
  },
  {
    name: "Run",
    id: 6,
  },
  {
    name: "Block",
    id: 7,
  },
  {
    name: "Run",
    id: 8,
  },
  {
    name: "Block",
    id: 9,
  },
];

const CategoryFilter = ({
  categories,
  setCategory,
  apiCall,
  category,
  refresh,
  setRefresh,
}) => {
  const [show, setShow] = useState(false);
  const [selectCategory, setSelectCategory] = useState();
  const { theme } = useTheme();

  const divRef = useRef(null);
  const scrollContainerRef = useRef(null);


  // console.log(categories);

  const handleClick = (item) => {
    const valid = selectCategory.find((i) => {
      return i.id == item.id;
    });
    if (valid) {
      let filtered = selectCategory.filter((i) => i.id != item.id);
      setSelectCategory(filtered);
    } else {
      setSelectCategory([...selectCategory, item]);
    }
  };

  useOutsideClick(divRef, () => {
    setShow(!show);
  });

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // Ensure the ref is not null
    if (scrollContainer) {
      // Set the color of the scrollbar thumb to red (replace with your desired color)
      scrollContainer.style.setProperty('--scroll-color', theme.shoorah_5);
    }
  }, [show]);




  return (
    <div
      onClick={() => setShow(!show)}
      className={` z-20 w-full cursor-pointer py-4 xl:py-5 ${theme.shoorah_bg_5} P22Mackinac relative flex items-center justify-between rounded-[3rem] border-transparent text-xl text-[#fff] shadow-[0_2px_10px_0_rgb(0,0,0,0.1),0_2px_10px_0_rgb(0,0,0,0.10)] outline-none`}
    >
      <div className=" P22Mackinac relative flex w-full items-center justify-between rounded-3xl border-transparent px-5 pl-10 text-xl text-[#fff] outline-none">
        <p className="P22Mackinac text-base xl:text-2xl">
          {category == "" ? "Select Category" : category?.name}
        </p>
        <p className="rotate-90 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className=" bi bi-play-fill h-5 w-5 xl:h-7 xl:w-7"
            viewBox="0 0 16 16"
          >
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
        </p>
      </div>
      {show && (
        <div
          ref={divRef}
          className="P22Mackinac absolute  bottom-2 left-0 flex h-40 w-full translate-y-full flex-col items-center justify-between overflow-hidden rounded-2xl bg-[#fff] px-3 py-3 pl-8 text-xl shadow-[0_2px_10px_0_rgb(0,0,0,0.1),0_2px_10px_0_rgb(0,0,0,0.10)] outline-none lg:bottom-auto lg:top-[5rem] lg:translate-y-0 xl:h-[35rem] xl:rounded-[4rem]"
        >
          <div ref={scrollContainerRef} className="style-scroll accent-[red] pr-[6rem] flex w-full flex-col items-center justify-between gap-2 overflow-y-scroll text-xl text-black xl:gap-5  xl:py-[1.5rem]">
            {categories.map((item) => (
              <div
                key={item.id}
                className="flex h-[3rem] w-[100%] items-center justify-between pt-1 xl:px-3"
              >
                <p
                  onClick={() => {
                    item?.name == category?.name
                      ? setCategory("")
                      : setCategory(item);
                  }}
                  className={`P22Mackinac cursor-pointer ${
                    category?.name == item.name
                      ? `text-base font-semibold tracking-wide text-[#313b6b] xl:text-2xl`
                      : `text-base text-[#313b6b] xl:text-2xl`
                  } `}
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden w-full px-3 py-3 pr-8 xl:block">
            <button
              onClick={() => {
                apiCall();
                setShow(false);
              }}
              className={`${theme.shoorah_bg_5} P22Mackinac mt-2 w-full rounded-3xl py-4 text-xl font-[500] tracking-wider text-white`}
            >
              View Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
