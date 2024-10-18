import React, { Fragment, useEffect, useState } from "react";
import shoorahShape4 from "../../assets/images/shoorahshape4.png";
import { Api } from "../../api";
import Loader from "../../component/common/Loader";
import { successToast } from "../../utils/helper";
import { useTheme } from "../context/themeContext";
import shoorahGradient from "../../assets/svg/shoorah_heavy_gradient.svg";

const DailyRituals = () => {
  const [myRituals, setMyRituals] = useState([]);
  const [loader, setLoader] = useState(false);
  const { theme } = useTheme();

  const apiCall = () => {
    getMyRituals();
  }

  useEffect(() => {
    apiCall();
  }, []);

  const getMyRituals = async () => {
    setLoader(true);
    Api.getRitualStatus()
      .then((res) => {
        setMyRituals(res.data.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const userActivity = () => {
    let payload = {
      featureType: 10
    }
    Api.userActivityStatus(payload).then((res) => {
      if (res.data.meta.code == 1) {
        console.log("success")
      } else {
        console.log("error");
      }
    }).catch((err) => {
      console.error(err);
    })
  }

  const updateRitual = async (i, index) => {
    let payload = {
      ritualId: i?.id || i?.ritualId,
      isCompleted: !i.isCompleted,
    };
    Api.updateUserRituals(payload)
      .then((res) => {
        apiCall();
        setMyRituals((prev) => {
          prev[index].isCompleted = !prev[index].isCompleted;
          return [...prev];
        });
        if (i.isCompleted) {
          userActivity();
        }

      })
      .catch((err) => console.log(err.message));
  };

  const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
    <div className="w-full">
      <div className="relative mt-[3.5rem]">
        {loader && <Loader />}

        <h1 className=" xl:font-semiBold P22Mackinac my-2 px-4 text-left text-2xl font-medium xl:px-0 xl:text-center xl:text-4xl">
          Your Daily Rituals
        </h1>

        {/* <img src={shoorahShape4} className='absolute h-[60vh]  bottom-[-24vh] left-[-16vw] w-[30vw]' /> */}
        <div className="absolute bottom-[-12rem] left-[-4rem] z-[-3] h-[30rem] w-[14rem] sm:left-[-12rem] md:w-[20rem] lg:w-[28rem]">
          <svg
            // width={1440}
            // height={1440}
            viewBox="0 0 1440 1440"
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>

        <div className=" mx-auto flex w-full items-center justify-center px-4 py-5 xl:mt-[1rem] xl:w-[50%] xl:px-0">
          <div
            style={{
              boxShadow:
                "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
            }}
            className="w-full rounded-3xl bg-[#fff] px-2 py-2 text-[1.5rem] xl:mt-2 xl:rounded-[3.5rem] xl:px-10 "
          >
            {myRituals?.length ? (
              <div
                className={`h-fit w-full ${myRituals.length ? `max-h-[30rem]` : ``
                  } scrollbar overflow-y-scroll px-2 py-3`}
              >
                {myRituals.map((ritual, index) => (
                  <React.Fragment key={ritual?.id || ritual?.ritualId}>
                    <div className="my-4 flex items-center">
                      <div className="P22Mackinac w-[90%] text-lg xl:text-2xl">
                        {ritual.ritualName}
                      </div>

                      <div
                        onClick={() => updateRitual(ritual, index)}
                        className={` relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full ${theme.shoorah_bg_2} aspect-square h-8 text-[#fff] xl:h-[3rem] xl:w-[3rem]`}
                      >
                        {ritual.isCompleted && (
                          <>
                            <img
                              className="aspect-square h-8 object-cover xl:h-[20rem] xl:w-[20rem]"
                              src={theme.shoorah_hard_gradient}
                            />
                            <p className={`absolute ${theme.tickColor}`}>
                              {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check2 cursor-pointer" viewBox="0 0 16 16">
                                                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                                            </svg> */}
                              <svg
                                className="aspect-square h-4 xl:h-8"
                                width="30"
                                height="30"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.795365 11.3882L6.38386 17.4533C6.38386 17.4533 9.96556 6.85147 17.0165 1.5438"
                                  stroke={theme.tickColor}
                                  stroke-width="1.5"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    {index != myRituals.length - 1 && (
                      <div className="my-5 border border-b"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : null}
            {(!myRituals || myRituals.length == 0) && (
              <div className="P22Mackinac flex w-full  px-2 py-3 text-left text-lg xl:px-0 xl:text-2xl">
                No rituals today
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyRituals;
