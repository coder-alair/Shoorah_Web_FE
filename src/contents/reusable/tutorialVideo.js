import React, { Fragment, useEffect, useState } from "react";
import { Api } from "../../api";
import { errorToast } from "../../utils/helper";
import Loader from "../../component/common/Loader";
import { useTheme } from "../context/themeContext";

const TutorialVideo = ({
  show,
  setShow,
  descriptionOne = "",
  descriptionTwo = "",
  contentType,
  title,
  hideVideo
}) => {
  const [showControls, setShowControls] = useState(false);
  const [showVideo, setVideo] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialVideos, setTutorialVideos] = useState([]);
  const { theme } = useTheme();

  const [tutorialVideo, setTutorialVideo] = useState(null);

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  useEffect(() => {
    getTutorial();
  }, []);

  useEffect(() => {
    if (tutorialVideos.length) {
      setTutorialVideo(
        tutorialVideos.find((item) => {
          return item.content_type == contentType.value;
        }),
      );
    }
  }, [tutorialVideos]);

  const getTutorial = () => {
    setLoader(true);
    Api.getTutorialByType(1)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setLoader(false);
          setTutorialVideos(res.data.data);
        } else {
          errorToast(res.data.meta.message);
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  return (
    <div className="mt-8 px-4 xl:px-0">
      {show && (
        <Fragment>
          {showVideo && showTutorial && (
            <div className="relative mx-auto w-full xl:w-[75%]">
              {loader && <Loader />}
              <div className="relative mx-auto mt-5 h-auto w-[100%] overflow-hidden rounded-2xl border-transparent shadow-[0_1px_10px_0_rgb(0,0,0,0.1),0_1px_10px_0_rgb(0,0,0,0.10)] outline-none lg:rounded-[3rem]">
                <video
                  onClick={toggleControls}
                  controls={showControls}
                  src={tutorialVideo?.videoUrl}
                  autoPlay={true}
                  poster={tutorialVideo?.thumbnail}
                  className={`video-player relative h-auto w-[100%] ${showControls ? "show-controls" : ""
                    }`}
                ></video>
                {!showControls && (
                  <div
                    style={{ zIndex: "10" }}
                    className="absolute bottom-[1rem] right-[1rem] h-fit w-fit rounded-3xl bg-[white] px-3 py-2 text-black"
                  >
                    {tutorialVideo?.duration}
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  setVideo(false);
                  setShow(!show);
                }}
                className={`absolute right-0 top-[-1rem] cursor-pointer rounded-full p-3 ${theme.shoorah_bg_5} ${theme.shoorah_bg_hover_4} text-white`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </div>
            </div>
          )}
          {!showVideo && showTutorial && (
            <div className="relative mx-auto mt-5 h-fit w-full rounded-2xl border shadow-[0_1px_10px_0_rgb(0,0,0,0.1),0_1px_10px_0_rgb(0,0,0,0.10)] outline-none xl:w-[75%] xl:rounded-[3rem]">
              <div className="P22Mackinac flex flex-col gap-4 px-4 py-4 lg:gap-[2rem] lg:py-10 xl:pl-[5rem] xl:pr-6">
                <div className="flex gap-4">
                  <p className="P22Mackinac relative text-lg font-[700] lg:text-2xl xl:text-3xl">
                    {title}
                  </p>
                  {!hideVideo &&
                    <span
                      onClick={() => setVideo(true)}
                      className={`flex  cursor-pointer items-center justify-center rounded-2xl border-[3px] border-black bg-white px-1 ${theme.shoorah_text_1}`}
                    >
                      <svg
                        className="h-4 w-4 lg:h-6 lg:w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.1579 8.60503C20.614 10.1139 20.614 13.8861 18.1579 15.395L11.5263 19.4689C9.07017 20.9778 6 19.0917 6 16.074L6 7.92602C6 4.90827 9.07018 3.02218 11.5263 4.53105L18.1579 8.60503Z"
                          stroke={`#000`}
                          fill={theme.shoorah_2}
                          stroke-width="1.5"
                        />
                      </svg>
                    </span>

                  }

                </div>
                <p className=" P22Mackinac text-sm font-[700] lg:text-xl">
                  {descriptionOne}
                </p>
                <p className=" P22Mackinac text-sm lg:text-lg">
                  {descriptionTwo}
                </p>
              </div>
              <div
                onClick={() => setShow(!show)}
                className={`absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full p-2 lg:p-3 ${theme.shoorah_bg_5} ${theme.shoorah_bg_hover_4} text-white`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-x-lg h-3 w-3 lg:h-5 lg:w-5 "
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default TutorialVideo;
