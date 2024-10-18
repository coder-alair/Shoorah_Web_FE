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

const Hero = ({ setRefresh, refresh }) => {
  let [affirmation, setAffirmation] = useState();
  const [userName, setUserName] = useState("");
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const { theme } = useTheme();

  const getAffirmation = () => {
    setLoader(true);
    Api.getTodayAffirmation()
      .then((res) => {
        setAffirmation(res.data.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
      });
  };

  useEffect(() => {
    getAffirmation();
  }, [refresh]);

  const handleClick = () => {
    // history.push("/notifications",{
    //     state: ""
    // });
    history.push({
      pathname: "/notifications",
      state: { name: userName },
    });
  };

  const handlePersonalize = () => {
    history.push("/personalize");
  };

  const handleBookmarks = () => {
    history.push("/bookmarks");
  };

  return (
    <div className="w-[full]">
      <div
        className={`relative flex h-[45vh] w-[100%] items-center justify-center xl:h-[30rem]`}
      >
        <img
          className="absolute inset-y-0 h-[100%] w-[100%]"
          src={`${theme.shoorah_feather_gradient}`}
        />
        <div className="absolute right-2 sm:right-5 top-0 flex gap-5 px-1 pt-4">
          <div onClick={handlePersonalize}>
            <img
              src={theme.shoorah_hero_personalize}
              className="h-[1.4rem] w-[1.4rem] sm:h-[1.8rem] sm:w-[1.8rem] cursor-pointer hover:scale-110"
            />
          </div>

          <div
            onClick={handleBookmarks}
            className="h-[1.1rem] w-[1.1rem] sm:h-[1.4rem]  sm:w-[1.4rem] cursor-pointer hover:scale-110"
          >
            {/* {window.location.pathname.includes('home') ? */}
            <svg
              viewBox="0 0 16 19"
              fill={theme.shoorah_2}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6574 17.2644C14.6099 17.9296 13.8109 18.2404 13.3263 17.7824L8.98146 13.6749C8.43076 13.1543 7.56936 13.1543 7.01866 13.6749L2.67386 17.7824C2.18933 18.2404 1.39024 17.9296 1.34274 17.2644C1.01994 12.7453 1.00633 8.2133 1.27447 3.69352C1.36248 2.21016 2.60458 1.07129 4.09054 1.07129H11.9096C13.3956 1.07129 14.6376 2.21016 14.7256 3.69352C14.9939 8.2133 14.9801 12.7453 14.6574 17.2644Z"
                stroke={theme.shoorah_7}
                strokeWidth="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div onClick={handleClick}>
            <img
              src={theme.shoorah_hero_notify}
              className="h-[1.4rem] w-[1.4rem] sm:h-[1.8rem] sm:w-[1.8rem] cursor-pointer hover:scale-110"
            />
          </div>
        </div>
        <div
          className={`absolute bottom-0 flex h-[14rem] w-[26rem] flex-wrap justify-center self-end rounded-t-full text-center lg:h-[20rem] lg:w-[35rem] xl:h-[16rem] xl:h-[22rem] xl:w-[32rem] xl:w-[42rem]`}
        >
          <div className="relative flex h-full w-full justify-center">
            <img
              className="absolute inset-y-0 h-full w-full rounded-t-full "
              src={`${theme.shoorah_light_gradient}`}
            />
            <div
              className={`${
                affirmation?.displayName?.length > 80
                  ? ` w-[90vw] xl:w-[100rem]`
                  : ` w-[90vw] xl:w-[60rem]`
              } z-10 flex self-center lg:mt-[4rem] `}
            >
              <p
                className={`P22Mackinac z-10 font-[500] ${
                  affirmation?.displayName.length > 60
                    ? `text-3xl lg:text-5xl `
                    : `text-4xl lg:text-5xl `
                }`}
              >
                {affirmation?.displayName}
              </p>
            </div>
          </div>
        </div>
      </div>
      <AddSection
        data={affirmation}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </div>
  );
};

export default Hero;
