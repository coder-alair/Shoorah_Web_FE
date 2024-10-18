import React, { useEffect, useState } from "react";
import HomeGradient from "../../assets/images/homeGradient.png";
import ShoorahMediumGradient from "../../assets/images/ShoorahMediumGradient.png";
import ThemeLogo from "../../assets/images/themelogo.png";
import InfoLogo from "../../assets/images/infologo.png";
import NotifyLogo from "../../assets/images/notifylogo.png";
import { Api } from "../../api";
import AddSection from "../home/addSection";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";
import Lottie from "lottie-react";
import notifyLottie from "../../assets/lottie/lottie_info_shoorah.json";

const Hero = ({
  planeBg,
  show,
  setShow,
  hideInfo,
  heading,
  subhead,
  onlyNav,
}) => {
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const { theme } = useTheme();

  const handleClick = () => {
    history.push("/notifications");
  };

  const handleInfo = () => {
    setShow(!show);
  };

  const handlePersonalize = () => {
    history.push("/personalize");
  };

  return (
    <div>
      <div
        className={`relative ${
          planeBg ? `${theme.shoorah_bg_1} ` : ``
        } flex w-full flex-col items-center justify-center px-4 py-4 lg:gap-2 lg:py-[2rem] ${
          !onlyNav ? `sm:h-auto ` : `h-[3rem] sm:h-[4rem]`
        } `}
      >
        {!planeBg && (
          <img
            src={theme.shoorah_feather_gradient}
            className="absolute z-[-10] h-full w-full"
          />
        )}

        <div className="flex w-full items-center justify-end gap-3 sm:gap-5 lg:px-1">
          <div onClick={handlePersonalize}>
            <img
              src={theme.shoorah_hero_personalize}
              className="cursor-pointer hover:scale-110 h-[1.4rem] w-[1.4rem] sm:h-[1.8rem] sm:w-[1.8rem]"
            />
          </div>
          {!hideInfo && (
            <div
              onClick={handleInfo}
              className="h-[1.4rem] w-[1.4rem] sm:h-[1.8rem] sm:w-[1.8rem] cursor-pointer hover:scale-110"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="10"
                  transform="matrix(-1 0 0 1 22 2)"
                  fill={theme.shoorah_2}
                  stroke={theme.shoorah_7}
                  strokeWidth="1.5"
                />
                <path
                  d="M12 12L12 18"
                  stroke={theme.shoorah_7}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 7L12 6"
                  stroke={theme.shoorah_7}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}

          <div onClick={handleClick}>
            <img
              src={theme.shoorah_hero_notify}
              className="cursor-pointer hover:scale-110 h-[1.4rem] w-[1.4rem] sm:h-[1.8rem] sm:w-[1.8rem]"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-5  text-center lg:w-[70%]">
          <p className="P22Mackinac w-full px-4 text-2xl font-[500] lg:w-auto lg:px-0 lg:text-[2.5rem] xl:text-[4rem]">
            {heading}
          </p>
          {subhead && <p className="text-lg font-[400]">{subhead}</p>}
        </div>
      </div>
    </div>
  );
};

export default Hero;
