import React, { useEffect, useRef, useState } from "react";
import Loader from "../component/common/Loader";
import { useTheme } from "../contents/context/themeContext";
import shoorah from "../assets/audio/shoorah.mp3";
import mountain from "../assets/audio/mountain_river.mp3";
import rainforest from "../assets/audio/rain_forest.mp3";
import rain from "../assets/audio/relaxing_rain.mp3";
import jungle from "../assets/audio/tropical_jungle.mp3";
import waves from "../assets/audio/waves.mp3";

import shoorahImage from "../assets/audio/soundImages/shoorah.jpg";
import mountainImage from "../assets/audio/soundImages/mountain.jpg";
import rainforestImage from "../assets/audio/soundImages/rain_forest.jpg";
import forestImage from "../assets/audio/soundImages/jungle.jpg";
import wavesImage from "../assets/audio/soundImages/waves.jpg";
import rainImage from "../assets/audio/soundImages/relaxing_rain.jpg";
import { useWebSound } from "../contents/context/webSound";

import Lottie from "lottie-react";
import audioAnimation from "../assets/lottie/lottie_audio_animation_shoorah.json";
import playBtn from "../assets/audiosvg/ic_play.svg";
import pauseBtn from "../assets/audiosvg/ic_pause.svg";
import voice from "../assets/audiosvg/ic_voice.svg";
import { useAudio } from "../contents/context/audiobar";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import Swiper from "react-slick";

const PersonaliseSound = ({ tab }) => {
  const [loader, setLoader] = useState(false);
  const { theme } = useTheme();
  const {
    setAudio,
    volume,
    setVolume,
    volumeRef,
    setThemePage,
    SoundBar,
    audio,
    isPlaying,
    setIsPlaying,
    audioRef,
    onLoadedMetadata,
    currentTrack,
    progressBarRef,
  } = useWebSound();
  const [music, setMusic] = useState(audio);
  const { setAudioNav, setIsPlaying: setPlay } = useAudio();

  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    arrows: true,
    centerPadding: "40px",
    slidesToShow: 3,
    speed: 500,
  };

  const sliderRef = useRef(null);

  const sounds = [
    {
      name: "Shoorah",
      sound: shoorah,
      image: shoorahImage,
    },
    {
      name: "Mountain",
      sound: mountain,
      image: mountainImage,
    },
    {
      name: "Rain Forest",
      sound: rainforest,
      image: rainforestImage,
    },
    {
      name: "Rain",
      sound: rain,
      image: rainImage,
    },
    {
      name: "Jungle",
      sound: jungle,
      image: forestImage,
    },
    {
      name: "Waves",
      sound: waves,
      image: wavesImage,
    },
    {
      name: "Shoorah",
      sound: shoorah,
      image: shoorahImage,
    },
    {
      name: "Mountain",
      sound: mountain,
      image: mountainImage,
    },
    {
      name: "Rain Forest",
      sound: rainforest,
      image: rainforestImage,
    },
    {
      name: "Rain",
      sound: rain,
      image: rainImage,
    },
    {
      name: "Jungle",
      sound: jungle,
      image: forestImage,
    },
    {
      name: "Waves",
      sound: waves,
      image: wavesImage,
    },
  ];

  const websounds = [
    {
      name: "Shoorah",
      sound: shoorah,
      image: shoorahImage,
    },
    {
      name: "Mountain",
      sound: mountain,
      image: mountainImage,
    },
    {
      name: "Rain Forest",
      sound: rainforest,
      image: rainforestImage,
    },
    {
      name: "Rain",
      sound: rain,
      image: rainImage,
    },
    {
      name: "Jungle",
      sound: jungle,
      image: forestImage,
    },
    {
      name: "Waves",
      sound: waves,
      image: wavesImage,
    },
  ];

  useEffect(() => {
    setLoader(true);
    setThemePage(false);
    setAudioNav(false);
    setPlay(false);
    setInterval(() => {
      setLoader(false);
    }, [1000]);
  }, []);

  return (
    <div className="w-full">
      {loader && <Loader />}

      <div className=" relative mt-20 h-full w-screen">
        <div
          className={`absolute  inset-0  flex h-screen w-screen scale-x-[300%]  flex-col  items-center rounded-[50%] lg:scale-x-125 ${theme.shoorah_bg_8}`}
        ></div>

        <div className="flex h-full w-full items-center justify-center">
          <div className=" absolute left-1/2 top-0 flex h-[20vh] w-[90vw] -translate-x-1/2 -translate-y-[35%] flex-col justify-center gap-8 rounded-3xl bg-white px-4 xl:w-[40rem] xl:px-[2rem] 2xl:h-[14rem]">
            <div className="P22Mackinac text-base lg:text-xl">Theme Volume</div>

            <div className=" flex cursor-pointer gap-1 px-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_479_11147)">
                  <path
                    d="M17 11.1194L13.04 7.15942"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.96 7.19946L13 11.1595"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.15305 7.01567C1.04438 7.63847 0.963867 8.33133 0.963867 9.00004C0.963867 9.66876 1.04438 10.3616 1.15305 10.9844C1.36176 12.1804 2.26417 13.1778 3.46612 13.3488C3.76341 13.3911 4.10939 13.4274 4.51714 13.4539C5.48909 13.5168 6.36752 14.0601 6.89096 14.8815C7.09603 15.2032 7.31276 15.5173 7.53684 15.8152C8.5438 17.1544 10.1137 16.3811 10.1822 14.7071C10.2393 13.3098 10.2853 11.4306 10.2853 9.00004C10.2853 6.5695 10.2393 4.69033 10.1822 3.29304C10.1137 1.61896 8.5438 0.84568 7.53684 2.18481C7.31276 2.48281 7.09603 2.79681 6.89096 3.11858C6.36752 3.93995 5.48909 4.48329 4.51714 4.54623C4.10939 4.57262 3.76341 4.60889 3.46612 4.65121C2.26417 4.82227 1.36176 5.81968 1.15305 7.01567Z"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_479_11147">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                orient="horizontal"
                // ref={volumeRef}
                onChange={(e) => setVolume(e.target.value)}
                className="mx-5 w-full cursor-pointer"
              />

              <svg
                width="28"
                height="28"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_487_11335)">
                  <path
                    d="M13.1787 7.4469C13.5563 7.78992 13.8218 8.31815 13.8218 9.00015C13.8218 9.68214 13.5563 10.2104 13.1787 10.5534"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.0576 4.29504C16.2168 5.32296 17.0365 6.92406 17.0365 8.9999C17.0365 11.0757 16.2168 12.6768 15.0576 13.7047"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.15305 7.01567C1.04438 7.63847 0.963867 8.33133 0.963867 9.00004C0.963867 9.66876 1.04438 10.3616 1.15305 10.9844C1.36176 12.1804 2.26417 13.1778 3.46612 13.3488C3.76341 13.3911 4.10939 13.4274 4.51714 13.4539C5.48909 13.5168 6.36752 14.0601 6.89096 14.8815C7.09603 15.2032 7.31276 15.5173 7.53684 15.8152C8.5438 17.1544 10.1137 16.3811 10.1822 14.7071C10.2393 13.3098 10.2853 11.4306 10.2853 9.00004C10.2853 6.5695 10.2393 4.69033 10.1822 3.29304C10.1137 1.61896 8.5438 0.84568 7.53684 2.18481C7.31276 2.48281 7.09603 2.79681 6.89096 3.11858C6.36752 3.93995 5.48909 4.48329 4.51714 4.54623C4.10939 4.57262 3.76341 4.60889 3.46612 4.65121C2.26417 4.82227 1.36176 5.81968 1.15305 7.01567Z"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_487_11335">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <div className="  z-10 mt-[5rem] flex w-[100vw] flex-col  items-center justify-center gap-2 text-center text-white md:mt-[8rem] xl:top-[10rem] xl:w-[75vw] 2xl:top-[10rem] 2xl:mt-32">
            <p className="P22Mackinac mt-4 text-xl font-medium text-white lg:mt-8 ">
              Choose your sound
            </p>

            <div className="relative z-10 mx-auto mt-4 block h-[10rem] w-[100%] lg:hidden 2xl:w-[90%]">
              <Swiper
                slideToClickedSlide={true}
                spaceBetween={60}
                loop={true}
                //    navigation
                // onSwiper={(swiper) => {
                //   swiperRef.current = swiper;
                // }}
                centeredSlides={true}
                // onSlideChange={(e) => console.log(e.snapIndex)}

                onRealIndexChange={(e) => {
                  // console.log(e.realIndex);
                  setActiveSlide(e.realIndex);

                  setMusic(sounds[e.realIndex]);
                  setAudio(sounds[e.realIndex]);
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 3,
                  },
                  400: {
                    slidesPerView: 3,
                  },
                  639: {
                    slidesPerView: 3,
                  },
                  865: {
                    slidesPerView: 3,
                  },
                  1280: {
                    slidesPerView: 3,
                  },
                }}>
                {sounds.map((i, index) => (
                  <SwiperSlide
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={i.contentId}
                  >

                    <div className=" w-full items-center justify-center">
                      <div
                        onClick={() => {
                          setMusic(i);
                          setAudio(i);
                          setActiveSlide(index);
                          // sliderRef.current.slickGoTo(index);
                        }}
                        className={`relative w-16 cursor-pointer overflow-hidden xl:w-[5rem] ${activeSlide != index
                          ? ` mt-3 h-16 xl:h-[5rem]`
                          : ` border-[4px] ${theme.shoorah_border_5} h-[6rem] border xl:h-[8rem]`
                          } rounded-full `}
                      >
                        <img
                          src={i.image}
                          className="absolute h-full w-full object-cover"
                        />
                      </div>
                      {/* <h1>{i.name}</h1> */}

                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <p className="P22Mackinac  mt-2 text-lg text-white sm:text-xl ">
                {music.name}
              </p>
            </div>

            <div className="scrollbar mx-auto mt-[0.5rem] hidden w-full gap-x-[1rem] overflow-x-scroll lg:flex  xl:w-[90%] xl:justify-evenly">
              {websounds.map((i) => (
                <div
                  key={i.name}
                  className="flex flex-col items-center justify-between gap-y-4 xl:gap-y-0"
                >
                  <div className="flex flex-col items-center justify-center xl:h-[10rem]">
                    <div
                      onClick={() => {
                        setMusic(i);
                        setAudio(i);
                      }}
                      className={`relative w-16 cursor-pointer overflow-hidden xl:w-[5rem] ${music?.name != i.name
                        ? ` h-16 xl:h-[5rem]`
                        : ` border-[4px] ${theme.shoorah_border_5} h-16 border xl:h-[8rem]`
                        } rounded-full `}
                    >
                      <img
                        src={i.image}
                        className="absolute h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="P22Mackinac text-lg xl:text-xl">
                    {music.name == i.name ? i.name : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* discarded design */}
      <div
        className={`absolute left-[-15%] top-[40%] hidden  h-screen w-[130%] flex-col items-center rounded-[50%] ${theme.shoorah_bg_8}`}
      >
        {/* <img src={theme.shoorah_mac} className='absolute z-10 top-[-7rem] left-[40%] w-[28rem] h-[17rem]' /> */}
        <div className="relative z-10">
          <div className=" absolute left-[-18rem] top-[-5rem] flex h-[13rem] w-[40rem] flex-col justify-center gap-8 rounded-3xl bg-white px-[2rem] 2xl:h-[14rem]">
            <div className="P22Mackinac text-xl">Theme Volume</div>

            <div className=" flex cursor-pointer gap-1 px-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_479_11147)">
                  <path
                    d="M17 11.1194L13.04 7.15942"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.96 7.19946L13 11.1595"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.15305 7.01567C1.04438 7.63847 0.963867 8.33133 0.963867 9.00004C0.963867 9.66876 1.04438 10.3616 1.15305 10.9844C1.36176 12.1804 2.26417 13.1778 3.46612 13.3488C3.76341 13.3911 4.10939 13.4274 4.51714 13.4539C5.48909 13.5168 6.36752 14.0601 6.89096 14.8815C7.09603 15.2032 7.31276 15.5173 7.53684 15.8152C8.5438 17.1544 10.1137 16.3811 10.1822 14.7071C10.2393 13.3098 10.2853 11.4306 10.2853 9.00004C10.2853 6.5695 10.2393 4.69033 10.1822 3.29304C10.1137 1.61896 8.5438 0.84568 7.53684 2.18481C7.31276 2.48281 7.09603 2.79681 6.89096 3.11858C6.36752 3.93995 5.48909 4.48329 4.51714 4.54623C4.10939 4.57262 3.76341 4.60889 3.46612 4.65121C2.26417 4.82227 1.36176 5.81968 1.15305 7.01567Z"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_479_11147">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                orient="horizontal"
                // ref={volumeRef}
                onChange={(e) => setVolume(e.target.value)}
                className="mx-5 w-full cursor-pointer"
              />

              <svg
                width="28"
                height="28"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_487_11335)">
                  <path
                    d="M13.1787 7.4469C13.5563 7.78992 13.8218 8.31815 13.8218 9.00015C13.8218 9.68214 13.5563 10.2104 13.1787 10.5534"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.0576 4.29504C16.2168 5.32296 17.0365 6.92406 17.0365 8.9999C17.0365 11.0757 16.2168 12.6768 15.0576 13.7047"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.15305 7.01567C1.04438 7.63847 0.963867 8.33133 0.963867 9.00004C0.963867 9.66876 1.04438 10.3616 1.15305 10.9844C1.36176 12.1804 2.26417 13.1778 3.46612 13.3488C3.76341 13.3911 4.10939 13.4274 4.51714 13.4539C5.48909 13.5168 6.36752 14.0601 6.89096 14.8815C7.09603 15.2032 7.31276 15.5173 7.53684 15.8152C8.5438 17.1544 10.1137 16.3811 10.1822 14.7071C10.2393 13.3098 10.2853 11.4306 10.2853 9.00004C10.2853 6.5695 10.2393 4.69033 10.1822 3.29304C10.1137 1.61896 8.5438 0.84568 7.53684 2.18481C7.31276 2.48281 7.09603 2.79681 6.89096 3.11858C6.36752 3.93995 5.48909 4.48329 4.51714 4.54623C4.10939 4.57262 3.76341 4.60889 3.46612 4.65121C2.26417 4.82227 1.36176 5.81968 1.15305 7.01567Z"
                    stroke={theme.shoorah_6}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_487_11335">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute top-[8rem] z-10 flex w-[75%] flex-col items-center justify-center gap-2 text-center text-white xl:top-[10rem] 2xl:top-[10rem]">
          <div className="scrollbar mx-auto mt-[0.5rem] flex w-[90%] gap-x-[1rem]  overflow-x-scroll xl:justify-evenly">
            {websounds.map((i) => (
              <div
                key={i.name}
                className="flex flex-col items-center justify-between"
              >
                <div className="flex h-[10rem] flex-col items-center justify-center">
                  <div
                    onClick={() => {
                      setMusic(i);
                      setAudio(i);
                    }}
                    className={`relative w-[5rem] cursor-pointer overflow-hidden ${music?.name != i.name
                      ? `h-[5rem]`
                      : ` border-[4px] ${theme.shoorah_border_5} h-[8rem] border`
                      } rounded-full `}
                  >
                    <img
                      src={i.image}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="P22Mackinac  text-xl">
                  {music.name == i.name ? i.name : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaliseSound;
