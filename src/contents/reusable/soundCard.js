import React from "react";

const SoundCard = ({ data: i, label }) => {
  return (
    <div className="mt-[2rem] w-full cursor-pointer">
      <div className="relative flex h-fit flex-col ">
        {/* className="2xl:w-[15rem] w-[13rem] object-cover !shadow-[0_1px_16px_0_rgba(0,0,0,0.1),_0_8px_16px_rgba(0,0,0,0.1)] 2xl:h-[15rem] h-[13rem] xl self-start rounded-3xl" */}
        <div className=" aspect-square w-full self-start rounded-3xl object-cover !shadow-[0_1px_16px_0_rgba(0,0,0,0.1),_0_8px_16px_rgba(0,0,0,0.1)]">
          <img
            src={i.image}
            // className="object-cover w-[100%] 2xl:h-[15rem] h-[13rem]  self-start rounded-3xl"
            className="aspect-square w-full self-start  rounded-3xl object-cover"
          />
        </div>
        <div className="absolute right-2 top-[5px] text-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="#fff"
            strokeWidth={`2px`}
            fill="currentColor"
            className="bi bi-play-fill w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
            viewBox="0 0 16 16"
          >
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
        </div>
        <div className=" mt-1 w-full text-ellipsis whitespace-nowrap">
          <p className="mb-1 mt-[0.5rem] w-full overflow-hidden !text-ellipsis text-[10px] md:text-sm">
            {label} {i.duration}
          </p>
          <p className="P22Mackinac mb-1 w-full overflow-hidden !text-ellipsis text-[14px] md:text-lg font-medium xl:text-xl">
            {i.description}
          </p>
          <p className="P22Mackinac  w-full overflow-hidden !text-ellipsis text-[10px] md:text-sm font-medium">
            {i.expertName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SoundCard;
