import React, { useState } from "react";
import { Slider } from "antd";
import "antd/dist/reset.css"; // Import Ant Design CSS
import rangeLines from "../../assets/svg/rangeLines.svg"; // Import the rangeLines image
import { useTheme } from "../context/themeContext";

const RangeSlider = ({
  negative,
  positive,
  onValueChange,
  prof,
  negativeImage,
  positiveImage,
  isCustomStyling,
}) => {
  const [label, setLabel] = useState(0);
  const { theme } = useTheme();

  const handleSliderChange = (value) => {
    onValueChange(value);
    setLabel(Math.abs(value));
  };

  const CustomThumbSvg = () => (
    <svg
      width="13"
      height="17"
      viewBox="0 0 13 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 4.67072C0.5 3.96171 0.87537 3.3057 1.48662 2.94646L5.48662 0.595582C6.11219 0.227925 6.88781 0.227925 7.51338 0.595582L11.5134 2.94646C12.1246 3.3057 12.5 3.96171 12.5 4.67072V15C12.5 16.1046 11.6046 17 10.5 17H2.5C1.39543 17 0.5 16.1046 0.5 15V4.67072Z"
        fill={theme.shoorah_2}
      />
    </svg>
  );

  return (
    <div className="my-6 flex w-screen items-center justify-center px-4 lg:w-full xl:w-[90rem] xl:px-0">
      <div
        className={`flex w-full flex-col rounded-2xl lg:w-full lg:rounded-[3rem]   xl:w-[70%]  ${
          isCustomStyling && `${theme.shoorah_bg_5} p-1`
        } `}
      >
        <div
          className={`flex w-full flex-col ${
            isCustomStyling ? "border-white" : "border-gray-500"
          } rounded-2xl border-[2px] border-dashed px-6 py-5 lg:rounded-[3rem]`}
        >
          <div
            className={`flex text-xl ${
              prof ? "justify-center" : "justify-between"
            } ${isCustomStyling && "text-white"} `}
          >
            {positive && negative && (
              <>
                <div className="P22Mackinac flex gap-2 sm:text-base tracking-wide text-[12px] xl:text-2xl">
                  <img src={negativeImage} className=" h-[1.2rem] w-[1.2rem] sm:h-[2rem] sm:w-[2rem]" />
                  {negative}
                </div>
                <div className="P22Mackinac flex gap-2 sm:text-base tracking-wider text-[12px] xl:text-2xl">
                  {positive}
                  <img src={positiveImage} className="h-[1.2rem] w-[1.2rem] sm:h-[2rem] sm:w-[2rem]" />
                </div>
              </>
            )}
            {prof && (
              <div className="P22Mackinac flex w-full justify-between text-2xl tracking-wider">
                <img src={negativeImage} className="h-[1.2rem] w-[1.2rem] sm:h-[2rem] sm:w-[2rem]" />
                {prof}
                <img src={positiveImage} className="h-[1.2rem] w-[1.2rem] sm:h-[2rem] sm:w-[2rem]" />
              </div>
            )}
          </div>

          <img
            className="mt-4 h-auto w-full xl:mt-0 xl:h-[5rem]"
            src={rangeLines} // Add a class for the slider container
          />

          <div
            className="slider-container !P22Mackinac py-1 xl:py-3" // Add a class for the slider container
          >
            <Slider
              min={-5}
              max={5}
              marks={{
                "-5": "5",
                "-4": "4",
                "-3": "3",
                "-2": "2",
                "-1": "1",
                0: "0",
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5",
              }}
              step={1}
              onChange={handleSliderChange}
              defaultValue={0}
              tipFormatter={null}
              handle={(sliderProps) => (
                <div
                  className="custom-thumb"
                  style={{
                    left: `${sliderProps.offset}%`, // Set the custom thumb's position
                    transform: "translateX(-50%)", // Center the thumb over the slider track
                  }}
                >
                  <CustomThumbSvg />
                </div>
              )} // You can set the initial value here
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
