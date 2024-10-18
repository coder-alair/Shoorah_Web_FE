import React from "react";
import shoorahShape6 from "../../assets/images/shoorahshape6.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";

const Gratitude = () => {
  const history = useHistory();
  const { theme } = useTheme();

  const handleClick = () => {
    history.push("/journal/add-gratitude");
  };

  const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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

  return (
    <div className="w-full">
      <div className="relative mt-[4.5rem]">
        <h1 className=" P22Mackinac px-4 text-left text-2xl font-[500] xl:text-center xl:text-[2.5rem]">
          Today's Gratitude
        </h1>

        <div className="rotate-16 absolute right-[-5rem] sm:right-[-10rem] top-[-3rem] z-[-3] w-[14rem] md:w-[20rem] lg:w-[28rem]">
          <svg
            // width={1440}
            // height={1440}
            viewBox="0 0 1440 1440"
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>

        <div className=" mx-auto my-8 flex h-auto w-full items-center justify-center px-4 xl:my-[2rem] xl:h-[20rem] xl:w-[50%]">
          <div
            style={{
              boxShadow:
                "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
            }}
            className={`relative bg-[#fff] ${theme.gratitudeShadow} h-full w-[100%] rounded-2xl py-5 text-[1.5rem] xl:rounded-[3.5rem]`}
          >
            <textarea
              value=""
              readOnly
              onClick={handleClick}
              placeholder="Write your gratitude..."
              className="placeholderText  h-full w-[100%] cursor-pointer resize-none break-all rounded-[3.5rem] px-4 placeholder-gray-400 outline-none placeholder:text-sm xl:h-[90%] xl:px-10 xl:pt-4 xl:placeholder:text-[1.5rem]"
            />
            <div
              className={`absolute bottom-3 right-2 flex items-center justify-center gap-3  xl:bottom-[2rem] xl:right-[2.5rem] ${theme.gradtitudeImage}`}
            >
              <label
                htmlFor="file"
                className="h-[30px"
                onClick={handleClick}
                disabled
              >
                <img
                  src={`${theme.shoorah_add_image_icon}`}
                  className=" h-4 w-4 xl:h-[30px] xl:w-[30px]"
                />
              </label>
              <label
                className=" P22Mackinac cursor-pointer text-xs xl:text-lg"
                onClick={handleClick}
                disabled
              >
                Add image
              </label>
              <label></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gratitude;
