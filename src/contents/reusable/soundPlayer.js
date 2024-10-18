import React, { useEffect, useState } from "react";
import Navbar from "../layout/navbar";
import ThemeLogo from "../../assets/images/themelogo.png";
import InfoLogo from "../../assets/images/infologo.png";
import NotifyLogo from "../../assets/images/notifylogo.png";
import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import SideMenu from "../layout/sideMenu";
import Hero from "./hero";
import shoorahShape6 from "../../assets/images/shoorahshape6.png";
// import SoundBar from './soundBar';
import { useTheme } from "../context/themeContext";
import ShapeLottie from "../../assets/lottie/lottie_star_shape_shoorah.json";
import Lottie from "lottie-react";
import { useAudio } from "../context/audiobar";
import { Api } from "../../api";
import Loader from "../../component/common/Loader";
import BackButton from "./backButton";

const SoundPlayerPage = ({ description, expertName, title }) => {
  const history = useHistory();
  const { theme } = useTheme();
  const [loader, setLoader] = useState(false);
  const { id: contentId, type: contentType } = useParams();
  const location = useLocation();
  let sound = location.state;
  const [content, setContent] = useState(null);
  const { SoundBar, setContentType, setAudioNav, setAudio } = useAudio();

  const [isShowMoreOpen, setIsShowMoreOpen] = useState(false);

  const getSound = () => {
    setLoader(true);
    Api.getSoundById(contentType, contentId)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setLoader(false);
          setContent(res.data.data[0]);
        } else {
          setLoader(false);
          console.log(res.data.meta.message);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  const userActivity = () => {
    let payload = {
      featureType: contentType == 5 ? 5 : contentType == 3 ? 8 : contentType == 4 ? 9 : 3
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


  useEffect(() => {
    getSound();
    addToRecent();
    userActivity();
  }, []);

  const addToRecent = () => {
    const payload = {
      contentType: contentType,
      contentId: contentId,
    };
    Api.addToRecentPlay(payload)
      .then(() => {
        console.log("added to recent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (content) {
      setAudioNav(true);
      setAudio(content);
      setContentType(contentType);
    }
  }, [content]);

  return (
    <>
      <div className="h-screen w-full overflow-hidden">
        <Navbar />
        <SideMenu />
        {loader && <Loader />}

        <div
          className={`relative h-full  items-center justify-between gap-10 border pt-3 bg-[${theme.shoorah_1}] `}
        >
          <div className="absolute left-[10rem] top-[0rem]">
            <BackButton />
          </div>

          <Hero hideInfo={true} onlyNav={true} planeBg={true} />

          <div>
            <div
              className={`absolute bottom-0 left-0 right-0 flex h-[85vh] w-full scale-x-[150%] flex-col items-center rounded-[50%] md:scale-x-[150%] ${theme.shoorah_bg_8}`}
            ></div>
            <div className="h-full w-full">
              <div className=" absolute right-1/2 top-8 z-10 aspect-square w-36 translate-x-1/2  lg:top-0  lg:h-[13rem] lg:w-[13rem] 2xl:h-[15rem] 2xl:w-[15rem]">
                <Lottie animationData={theme.shoorahMusicShapeLottie} />
              </div>
            </div>
            <div className=" relative z-10 mx-auto sm:mt-[8rem] mt-[11rem] flex w-full flex-col justify-center gap-2 text-center text-white md:mt-[10rem] xl:w-1/2 2xl:mt-[15rem] ">
              <p className=" P22Mackinac text-base md:leading-10 font-medium tracking-wider lg:text-[2rem] 2xl:text-[2.5rem]">
                {content?.contentName}
              </p>
              <p className=" P22Mackinac lg:text-md text-sm tracking-wider 2xl:text-2xl">
                {content?.expertName}
              </p>
              <p className=" P22Mackinac 2xl:text-md mt-2 hidden text-sm tracking-wider lg:block">
                Description:
              </p>
              <p className=" P22Mackinac 2xl:text-md px-4 text-xs tracking-wider lg:px-0 lg:text-sm">
                {content?.description.length > 100 ? (
                  <>
                    {" "}
                    {content?.description?.substring(0, 100)}{" "}
                    <span
                      onClick={() => {
                        setIsShowMoreOpen(true);
                      }}
                      className={`${theme.shoorah_text_5} cursor-pointer font-medium underline`}
                    >
                      Show More
                    </span>
                  </>
                ) : (
                  content?.description
                )}
              </p>
            </div>
          </div>

          {/* discarded  */}
          <div
            className={`absolute left-[-5%] right-0 top-[25%] hidden  h-screen flex-col items-center rounded-[50%] xl:w-[110%] ${theme.shoorah_bg_8}`}
          >
            <div className="relative h-full w-full">
              <div className="absolute -top-32 flex h-full   w-full justify-center lg:top-[-8%] xl:top-[-10%] xl:top-[15%]">
                {/* <img src={shoorahShape6} className='absolute z-10 top-[-5rem] left-[45%] w-[12rem] h-[12rem]' /> */}
                <div className=" z-10  h-[13rem] w-[13rem] 2xl:h-[15rem] 2xl:w-[15rem]">
                  <Lottie animationData={theme.shoorahMusicShapeLottie} />
                </div>
              </div>
            </div>
            <div className="absolute top-[5.5rem] z-10 flex w-[40rem] flex-col justify-center gap-2 text-center text-white 2xl:top-[8rem]">
              <p className=" P22Mackinac text-[2rem] tracking-wider 2xl:text-[2.5rem]">
                {content?.contentName}
              </p>
              <p className=" P22Mackinac text-md tracking-wider 2xl:text-2xl">
                {content?.expertName}
              </p>
              <p className=" P22Mackinac 2xl:text-md mt-2 text-sm tracking-wider">
                Description:
              </p>
              <p className=" P22Mackinac 2xl:text-md text-sm tracking-wider">
                {content?.description}
              </p>
            </div>
          </div>

          {/* {content &&

                    <SoundBar sound={content} />
                } */}
        </div>
      </div>

      {isShowMoreOpen && (
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/40">
          <div className="relative flex min-h-[40vh] w-[90vw] flex-col rounded-2xl bg-white p-4 lg:w-[40vw]">
            <h5 className="w-full text-center text-xl font-medium">
              {" "}
              {content?.contentName}
            </h5>
            <div className="my-4 h-[1px] w-full rounded-lg bg-gray-300 text-center"></div>
            <p className="w-full text-center text-sm text-gray-800">
              {content?.description}
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              onClick={() => {
                setIsShowMoreOpen(false);
              }}
              className="absolute right-4 top-2 h-6 w-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default SoundPlayerPage;
