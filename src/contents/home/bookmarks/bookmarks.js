import React, { useState } from "react";
import Header from "../../me/header";
import MeditationBookmarks from "./MeditationBookmarks";
import SleepBookmarks from "./SleepBookmarks";
import PodsBookmarks from "./PodsBookmarks";
import { useTheme } from "../../context/themeContext";

const BookmarksPage = () => {
  const [tab, setTab] = useState(0);
  const { theme } = useTheme();

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

  return (
    <div className="relative h-fit min-h-screen w-full overflow-hidden">
      <div className="flex justify-center">
        <Header hide={true} home={true} goBack={true} title={`My Bookmarks`} />
      </div>

      <div className=" mt-[2rem] grid grid-cols-3 items-center justify-center px-4 lg:flex lg:gap-[5rem] lg:px-0">
        <div
          onClick={() => setTab(0)}
          className={
            tab == 0
              ? `rounded-[2rem] ${theme.shoorah_bg_1}  w-full py-3 text-center md:px-12 lg:w-auto lg:px-16 ${theme.shoorah_text_5} P22Mackinac ease cursor-pointer text-base duration-1000 lg:text-xl`
              : `rounded-[2rem] text-base lg:text-xl ${theme.inactiveToggleText} P22Mackinac ease w-full cursor-pointer py-3 text-center duration-1000 md:px-12 lg:w-auto lg:px-16`
          }
        >
          Meditations
        </div>
        <div
          onClick={() => setTab(1)}
          className={
            tab == 1
              ? `rounded-[2rem] ${theme.shoorah_bg_1}  w-full py-3 text-center md:px-12 lg:w-auto lg:px-16 ${theme.shoorah_text_5} P22Mackinac ease cursor-pointer text-base duration-1000 lg:text-xl`
              : `rounded-[2rem] text-base lg:text-xl ${theme.inactiveToggleText} P22Mackinac ease w-full cursor-pointer py-3 text-center duration-1000 md:px-12 lg:w-auto lg:px-16`
          }
        >
          Sleep
        </div>
        <div
          onClick={() => setTab(2)}
          className={
            tab == 2
              ? `rounded-[2rem] ${theme.shoorah_bg_1}  w-full py-3 text-center md:px-12 lg:w-auto lg:px-16 ${theme.shoorah_text_5} P22Mackinac ease cursor-pointer text-base duration-1000 lg:text-xl`
              : `rounded-[2rem] text-base lg:text-xl ${theme.inactiveToggleText} P22Mackinac ease w-full cursor-pointer py-3 text-center duration-1000 md:px-12 lg:w-auto lg:px-16`
          }
        >
          Shoorah Pods
        </div>
      </div>

      <div className="mx-auto w-full lg:mt-[2rem]">
        {tab == 0 ? (
          <MeditationBookmarks />
        ) : tab == 1 ? (
          <SleepBookmarks />
        ) : (
          <PodsBookmarks />
        )}
      </div>

      <div
        style={{ rotate: "20deg" }}
        className="absolute right-[-20%] top-[-4rem] z-[-3] w-[14rem] md:right-[-15%] md:w-[20rem] lg:w-[28rem]"
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
        className="absolute left-[-20%] top-[25rem] z-[-3] w-[14rem] md:left-[-15%] md:w-[20rem] lg:w-[28rem]"
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: pentagonContent }}
        />
      </div>
    </div>
  );
};

export default BookmarksPage;
