import React, { useEffect, useState } from "react";
import Carousel from "../layout/carsouel";
import { Api } from "../../api";
import Loader from "../../component/common/Loader";
import { useTheme } from "../context/themeContext";
import NewCarousel from "../reusable/newCarsouel";
import TrendCarsoeul from "../reusable/trendingCarsouel";

const Trending = () => {
  const [trendings, setTrendings] = useState([]);
  const [loader, setLoader] = useState(false);
  const { theme } = useTheme();

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

  useEffect(() => {
    getTrendings();
  }, []);

  const getTrendings = async () => {
    setLoader(true);
    Api.getTrendings()
      .then((res) => {
        setTrendings(res.data.data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="relative mx-auto w-[100%] pt-[2rem]">
      {loader && <Loader />}

      {/* <img src={shoorahShape2} className='absolute z-[-3] left-[-15vw] bottom-[-1vh] sm:bottom-[-5vh] xl:bottom-[-5vh]  2xl:bottom-[-10vh] w-[20rem] sm:w-[22rem] xl:w-[28rem] 2xl:w-[36rem] 2xl:h-[70vh] h-[50vh] sm:h-[60vh]' /> */}
      <div className="absolute bottom-[-1vh] left-[-15vw] z-[-3] h-[50vh] w-[14rem] md:w-[20rem] lg:w-[28rem]  sm:bottom-[-5vh] sm:h-[60vh] sm:w-[22rem] xl:bottom-[-5vh] xl:w-[28rem] 2xl:bottom-[-10vh] 2xl:h-[60vh] 2xl:w-[36rem]">
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>

      <h1 className=" P22Mackinac px-4 text-left text-2xl font-medium xl:text-center xl:text-[2.5rem]">
        Trending
      </h1>
      <div className=" mx-auto flex h-auto w-[100%]  items-center justify-center  xl:mt-[2rem] xl:h-[20rem] xl:h-[20rem]">
        {trendings.length > 0 && <TrendCarsoeul data={trendings} left={true} />}
        {trendings.length == 0 && (
          <p className="text-2xl">No trendings This Month</p>
        )}
      </div>
    </div>
  );
};

export default Trending;
