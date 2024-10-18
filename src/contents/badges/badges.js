import React, { useEffect, useState } from "react";
import Header from "../me/header";

import bronze from "../../assets/svg/badges/bronze_badge.png";
import bronzeDisable from "../../assets/svg/badges/bronze_badge_disable.png";
import silver from "../../assets/svg/badges/silver_badge.png";
import silverDisable from "../../assets/svg/badges/silver_badge_disable.png";

import gold from "../../assets/svg/badges/gold_badge.png";
import goldDisable from "../../assets/svg/badges/gold_badge_disable.png";

import platinum from "../../assets/svg/badges/platinum_badge.png";
import platinumDisable from "../../assets/svg/badges/platinum_badge_disable.png";

import daimond from "../../assets/svg/badges/diamond_badge.png";
import daimondDisable from "../../assets/svg/badges/diamond_badge_disable.png";

import shuru from "../../assets/svg/badges/shoorah_guru_badge.png";
import shuruDisable from "../../assets/svg/badges/shoorah_guru_badge_disable.png";

import { Api } from "../../api";
import lockSvg from "../../assets/svg/lock.svg";
import { useAuth } from "../context/user";
import DetailsSection from "./detailsSection";
import { errorToast } from "../../utils/helper";
import Loader from "../../component/common/Loader";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";

const badges = [
  {
    name: "Bronze",
    number: 1,
    colour: `border-[#8B4513]`,
    text: `text-[#8B4513]`,
    image: bronze,
    disableImg: bronzeDisable,
  },
  {
    name: "Silver",
    number: 2,
    colour: "border-[#C0C0C0]",
    text: `text-[#C0C0C0]`,
    image: silver,
    disableImg: silverDisable,
  },
  {
    name: "Gold",
    number: 3,
    colour: "border-[#FFD700]",
    text: `text-[#FFD700]`,
    image: gold,
    disableImg: goldDisable,
  },
  {
    name: "Platinum",
    number: 4,
    colour: "border-[#BA55D3]",
    text: `text-[#BA55D3]`,
    image: platinum,
    disableImg: platinumDisable,
  },
  {
    name: "Daimond",
    number: 5,
    colour: "border-[#32CD32]",
    text: `text-[#32CD32]`,

    image: daimond,
    disableImg: daimondDisable,
  },
  {
    name: "Shoorah Guru",
    number: 6,
    text: `text-[#6167e7]`,
    colour: "border-[#6167e7]",
    image: shuru,
    disableImg: shuruDisable,
  },
];

const BadgesScreen = () => {
  const [badgesData, setBadgesData] = useState([]);
  const [loader, setLoader] = useState([]);
  const { user } = useAuth();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const badge = searchParams.get("badge");
  const { theme } = useTheme();

  const [selectBadge, setSelectBadge] = useState(badge || 1);
  const [badgeInfo, setBadgeInfo] = useState(null);
  const [badgeInfoData, setBadgeInfoData] = useState(null);

  const getBadgeCounts = () => {
    setLoader(true);
    Api.getBadgeCount(user?._id)
      .then((res) => {
        const badgesWithCount = badges.map((badge) => {
          const matchingData = res.data.data.find(
            (item) => item.badgeType === badge.number,
          );
          return {
            ...badge,
            badgeCount: matchingData ? matchingData.badgeCount : 0,
          };
        });
        setBadgesData(badgesWithCount);
        setLoader(false);
      })
      .catch((err) => {
        console.log("error in getting badge counts");
        setLoader(false);
      });
  };

  const getBadgeInfo = () => {
    if (selectBadge < 6) {
      setLoader(true);
      Api.badgeInfo(selectBadge)
        .then((res) => {
          if (res.data.meta.code == 1) {
            setLoader(false);
            setBadgeInfoData(res.data.data);
            setBadgeInfo(res.data.meta.badgeInfo);
          } else {
            setLoader(false);
            errorToast(`Some error happen while getting badges`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setBadgeInfo(null);
      setBadgeInfoData(null);
    }
  };

  useEffect(() => {
    getBadgeCounts();
  }, []);

  useEffect(() => {
    getBadgeInfo();
  }, [selectBadge]);

  const starContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
    
    <svg
       version="1.1"
       id="svg2"
       viewBox="0 0 1440 1440"
       sodipodi:docname="Shoorah_Shape_6.ai"
       xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
       xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:svg="http://www.w3.org/2000/svg">
      <defs
         id="defs6">
        <clipPath
           clipPathUnits="userSpaceOnUse"
           id="clipPath16">
          <path
             d="M 0,1080 H 1080 V 0 H 0 Z"
             id="path14" />
        </clipPath>
      </defs>
      <sodipodi:namedview
         id="namedview4"
         pagecolor="#ffffff"
         bordercolor="#000000"
         borderopacity="0.25"
         inkscape:showpageshadow="2"
         inkscape:pageopacity="0.0"
         inkscape:pagecheckerboard="0"
         inkscape:deskcolor="#d1d1d1" />
      <g
         id="g8"
         inkscape:groupmode="layer"
         inkscape:label="Shoorah_Shape_6"
         transform="matrix(1.3333333,0,0,-1.3333333,0,1440)">
        <g
           id="g10">
          <g
             id="g12"
             clip-path="url(#clipPath16)">
            <g
               id="g18"
               transform="translate(521.5967,987.506)">
              <path
                 d="m 0,0 c 20.898,1.528 41.033,-5.669 58.768,-18.731 28.293,-20.881 55.696,-42.829 84.254,-63.408 6.291,-4.549 15.302,-7.499 23.245,-7.766 37.373,-1.279 74.817,-0.337 112.155,-1.955 46.169,-1.972 80.414,-32.859 86.669,-77.287 4.799,-33.96 7.909,-68.117 12.76,-102.042 1.049,-7.126 4.941,-15.035 10.147,-20.224 24.098,-24.026 49.636,-46.738 73.805,-70.747 37.551,-37.355 40.695,-79.384 8.086,-121.395 -21.165,-27.315 -44.57,-53.154 -66.341,-80.166 -4.335,-5.385 -7.321,-13.133 -7.499,-19.868 -0.87,-34.761 -0.249,-69.539 -0.942,-104.318 -0.888,-46.951 -37.035,-82.956 -86.83,-87.967 -36.947,-3.714 -73.893,-7.713 -110.768,-12.227 -5.598,-0.675 -11.623,-4.354 -15.87,-8.175 -26.141,-23.511 -51.288,-47.893 -77.838,-71.031 -39.772,-34.707 -87.15,-37.213 -130.476,-6.558 -28.736,20.331 -55.837,42.58 -84.236,63.319 -5.633,4.123 -13.915,6.86 -21.112,7.091 -38.173,1.173 -76.434,0.764 -114.571,2.221 -46.614,1.777 -82.725,35.774 -87.808,81.588 -3.732,33.588 -6.237,67.3 -10.343,100.834 -0.871,7.108 -5.064,14.928 -10.183,20.277 -22.676,23.476 -46.542,45.867 -69.236,69.272 -40.395,41.691 -41.745,83.863 -4.123,128.557 20.916,24.915 43.255,48.782 63.994,73.769 4.727,5.651 8.015,13.826 8.406,20.987 1.688,34.228 1.724,68.544 3.181,102.789 1.973,47.13 36.288,81.304 86.475,86.582 34.565,3.661 69.379,6.255 103.872,10.538 7.909,0.977 16.527,5.242 22.445,10.467 26.373,23.263 51.715,47.627 77.715,71.263 C -45.406,-9.028 -25.449,-0.373 0,0"
                 style="fill:${theme.shoorahShapeColor};fill-opacity:0.59;fill-rule:nonzero;stroke:none"
                 id="path20" />
            </g>
          </g>
        </g>
      </g>
    </svg>`;

  const pentagonContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
    
    <svg
       version="1.1"
       id="svg2"
       width="1440"
       height="1440"
       viewBox="0 0 1440 1440"
       sodipodi:docname="Shoorah_Shape_4.ai"
       xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
       xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:svg="http://www.w3.org/2000/svg">
      <defs
         id="defs6">
        <clipPath
           clipPathUnits="userSpaceOnUse"
           id="clipPath16">
          <path
             d="M 0,1080 H 1080 V 0 H 0 Z"
             id="path14" />
        </clipPath>
      </defs>
      <sodipodi:namedview
         id="namedview4"
         pagecolor="#ffffff"
         bordercolor="#000000"
         borderopacity="0.25"
         inkscape:showpageshadow="2"
         inkscape:pageopacity="0.0"
         inkscape:pagecheckerboard="0"
         inkscape:deskcolor="#d1d1d1" />
      <g
         id="g8"
         inkscape:groupmode="layer"
         inkscape:label="Shoorah_Shape_4"
         transform="matrix(1.3333333,0,0,-1.3333333,0,1440)">
        <g
           id="g10">
          <g
             id="g12"
             clip-path="url(#clipPath16)">
            <g
               id="g18"
               transform="translate(105.6093,714.7515)">
              <path
                 d="m 0,0 c 27.746,53.893 58,114.862 89.892,174.906 19.243,36.211 50.711,59.697 89.275,70.514 128.976,36.192 259.264,59.099 391.769,65.423 42.497,2.025 78.728,-13.459 108.499,-42.613 91.898,-89.931 171.647,-190.293 241.466,-299.081 25.337,-39.412 27.227,-83.433 14.365,-129.073 -33.877,-119.818 -79.421,-235.567 -137.324,-346.997 -23.755,-45.659 -59.909,-75.893 -110.081,-90.104 -125.294,-35.478 -253.094,-55.589 -382.476,-63.167 -48.416,-2.815 -89.66,12.36 -122.805,45.698 -90.181,90.74 -169.45,189.888 -234.97,299.177 -24.834,41.418 -27.996,86.113 -12.263,132.332 C -44.619,-124.214 -23.255,-65.886 0,0"
                 style="fill:${theme.shoorahShapeColor};fill-opacity:0.59;fill-rule:nonzero;stroke:none"
                 id="path20" />
            </g>
          </g>
        </g>
      </g>
    </svg>`;

  const svgContent = `
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
    
    <svg
      version="1.1"
      id="svg2"
      width="1440"
      height="1440"
      viewBox="0 0 1440 1440"
      xmlns="http://www.w3.org/2000/svg">
      <defs
        id="defs6">
        <clipPath
          clipPathUnits="userSpaceOnUse"
          id="clipPath16">
          <path
            d="M 0,1080 H 1080 V 0 H 0 Z"
            id="path14" />
        </clipPath>
      </defs>
      <g
        id="g8"
        transform="matrix(1.3333333,0,0,-1.3333333,0,1440)">
        <g
          id="g10">
          <g
            id="g12"
            clip-path="url(#clipPath16)">
            <g
              id="g18"
              transform="translate(873.2513,202.354)">
              <path
                d="m 0,0 c -129.901,-41.799 -260.349,-82.769 -391.324,-122.891 -126.585,-38.821 -262.742,27.307 -302.694,146.674 -41.535,123.569 -82.562,247.232 -123.004,370.989 -38.915,119.536 30.661,246.083 154.079,283.642 127.961,38.953 255.412,78.736 382.297,119.329 C -158.283,836.885 -26.045,773.489 16.056,655.196 59.532,532.607 103.536,410.131 148.086,287.75 191.223,169.684 125.604,40.404 0,0"
                style="fill:${theme.shoorahShapeColor};fill-opacity:0.59;fill-rule:nonzero;stroke:none"
                id="path20" />
            </g>
          </g>
        </g>
      </g>
    </svg>
    `;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {loader && <Loader />}
      <div className="flex justify-center">
        <Header hide={true} goBack={true} home={true} title={`My Badges`} />
      </div>

      <div className="scrollbar mx-auto mt-4 md:mt-6 flex w-[90%] gap-[2rem] overflow-x-scroll  lg:mt-0 xl:justify-evenly">
        {badgesData.map((i) => (
          <div
            onClick={() => {
              setSelectBadge(i.number);
            }}
            className={`md:h-[10rem] md:w-[10rem] h-[7rem] w-[7rem] cursor-pointer   ${
              selectBadge == i.number ? `rounded-3xl px-2 bg-white border` : ``
            }  flex flex-col  items-center justify-around`}
            key={i.number}
          >
            <div
              className={`relative flex h-[4rem] w-[4rem] md:h-[5rem] md:w-[5rem] items-center justify-center rounded-full p-2`}
            >
              {i.badgeCount != 0 && (
                <img
                  src={i.image}
                  className={`h-[100%] w-[100%] object-cover`}
                />
              )}
              {i.badgeCount == 0 && (
                <img
                  src={i.disableImg}
                  className={`h-[100%] w-[100%] object-cover`}
                />
              )}
              {i.badgeCount == 0 && (
                <img
                  src={lockSvg}
                  className="absolute bottom-[-8px] z-10 h-[2rem] w-[2rem]  rounded-3xl object-cover grayscale"
                />
              )}
              {i.badgeCount != 0 && (
                <div
                  className={`border ${i.text} border-solid ${i.colour} absolute bottom-[-8px] z-10 rounded-3xl text-sm md:text-base bg-white px-3 md:px-5`}
                >
                  {i.badgeCount}
                </div>
              )}
            </div>
            {i.badgeCount != 0 && (
              <div className={`P22Mackinac  ${i.text} text-sm md:text-lg tracking-wider`}>
                {i.name}
              </div>
            )}
            {i.badgeCount == 0 && (
              <div className={`P22Mackinac  ${i.text} text-lg font-[600]`}>
                <p> </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <DetailsSection badgeInfo={badgeInfo} badgeInfoData={badgeInfoData} />

      <div
        style={{ rotate: "20deg" }}
        className={`absolute right-[-15%] top-[-4rem] md:top-[-8rem]  z-[-3]   w-[14rem] md:w-[20rem] lg:w-[28rem]`}
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: starContent }}
        />
      </div>

      <div
        style={{ rotate: "20deg" }}
        className={`absolute left-[-15%] top-[20rem] md:top-[20rem] z-[-3]  w-[14rem] md:w-[20rem] lg:w-[28rem]`}
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: pentagonContent }}
        />
      </div>

      <div
        style={{ rotate: "60deg" }}
        className={`absolute top-[40rem] md:top-[50rem] right-[-15%] z-[-3]  w-[14rem] md:w-[20rem] lg:w-[28rem]`}
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  );
};

export default BadgesScreen;
