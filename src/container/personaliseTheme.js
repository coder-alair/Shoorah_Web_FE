import React, { Fragment, useEffect, useRef, useState } from "react";
import { useTheme } from "../contents/context/themeContext";
import Carousel from "react-elastic-carousel";
import shoorahTheme from "../assets/svg/themes/feathers/shoorah/Shoorah Medium Gradient.png";
import landTheme from "../assets/svg/themes/feathers/land/Land Medium Gradient.png";
import bloomTheme from "../assets/svg/themes/feathers/Bloom/Bloom Medium Gradient.png";
import oceanTheme from "../assets/svg/themes/feathers/Ocean/Ocean Medium Gradient.png";
import sunTheme from "../assets/svg/themes/feathers/Sun/Sun Medium Gradient.png";
import desertTheme from "../assets/svg/themes/feathers/Desert/Desert Medium Gradient.png";
import Loader from "../component/common/Loader";
import { useWebSound } from "../contents/context/webSound";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import Swiper from "react-slick";

const PersonaliseTheme = () => {
  const { theme, toggleTheme } = useTheme();
  const [loader, setLoader] = useState(false);
  const { setThemePage } = useWebSound();
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

  const swiperRef = useSwiper(null);

  const themes = [
    {
      name: "Shoorah",
      image: shoorahTheme,
      index: 0,
      border: "!border-[#4a56db]",
    },
    {
      name: "Land",
      image: landTheme,
      index: 1,
      border: "!border-[#67a14a]",
    },
    {
      name: "Bloom",
      image: bloomTheme,
      index: 2,
      border: "!border-[#f05289]",
    },
    {
      name: "Ocean",
      image: oceanTheme,
      index: 3,
      border: "!border-[#21bdad]",
    },
    {
      name: "Sun",
      image: sunTheme,
      index: 4,
      border: "!border-[#edcc12]",
    },
    {
      name: "Dessert",
      image: desertTheme,
      index: 5,
      border: "!border-[#d97f56]",
    },

  ];

  const webthemes = [
    {
      name: "Shoorah",
      image: shoorahTheme,
      border: "!border-[#4a56db]",
    },
    {
      name: "Land",
      image: landTheme,
      border: "!border-[#67a14a]",
    },
    {
      name: "Bloom",
      image: bloomTheme,
      border: "!border-[#f05289]",
    },
    {
      name: "Ocean",
      image: oceanTheme,
      border: "!border-[#21bdad]",
    },
    {
      name: "Sun",
      image: sunTheme,
      border: "!border-[#edcc12]",
    },
    {
      name: "Dessert",
      image: desertTheme,
      border: "!border-[#d97f56]",
    },
  ];

  useEffect(() => {
    if (theme.name.length) {
      let findIndex = themes.find((i) => i.name == theme.name);
      if (findIndex) {
        setActiveSlide(findIndex.index);
      }
    }
  }, [theme]);

  useEffect(() => {
    if (swiperRef?.current) {
      swiperRef.current.slideTo(activeSlide);
    }
  }, [activeSlide]);

  useEffect(() => {
    setLoader(true);
    setThemePage(true);
    setInterval(() => {
      setLoader(false);
    }, [1000]);
  }, []);

  return (
    <div className="h-full w-full lg:h-auto">
      {loader && <Loader />}

      <div className=" relative mt-20 h-full w-screen ">
        {/* background */}
        <div
          className={`absolute  inset-0  flex h-screen w-screen scale-x-[200%]  flex-col  items-center rounded-[50%] lg:scale-x-125 ${theme.shoorah_bg_8}`}
        ></div>

        {/* mac image */}
        <div className="flex h-full relative w-full items-center justify-end lg:justify-center">
          <div className="absolute h-[12rem] w-[18rem] md:h-[16rem] md:w-[24rem] top-0  inset-x-[15%] md:inset-x-[28%] lg:inset-x-[38%] 2xl:inset-x-[40%] -translate-y-1/4 ">
            <img
              src={theme.shoorah_mac}
              className="z-10 w-full h-full "
            />
          </div>

          <div className=" top-[10rem] z-10 mt-[28px] flex w-[100vw] flex-col items-center justify-center gap-2 text-center text-white xl:w-[75%] ">
            <p className="P22Mackinac  mt-[5rem] text-xl font-medium text-white sm:mt-12 md:mt-[8rem] xl:mt-[12rem] ">
              Choose your Palette
            </p>

            <div className="relative z-10 mx-auto mt-4 block h-[10rem] w-[100%] lg:hidden 2xl:w-[90%]">
              <Swiper
                slideToClickedSlide={true}
                spaceBetween={60}
                loop={true}
                initialSlide={activeSlide}
                centeredSlides={true}

                onRealIndexChange={(e) => {
                  setActiveSlide(e.realIndex);

                  toggleTheme(themes[e.realIndex].name);
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
                {themes.map((i, index) => (

                  <SwiperSlide
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <div className="w-full items-center justify-center">
                      <div
                        onClick={() => {
                          toggleTheme(i.name);
                          setActiveSlide(index);
                        }}
                        className={`relative w-16 cursor-pointer overflow-hidden xl:w-[5rem] ${activeSlide != index
                          ? ` mt-3 h-16  xl:h-[5rem]`
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
                {theme.name}
              </p>
            </div>

            <div className="scrollbar mx-auto mt-[2rem] hidden w-full gap-[2rem] overflow-x-scroll lg:flex  xl:w-[90%] xl:justify-evenly">
              {webthemes.map((i) => (
                <div
                  key={i.name}
                  className="flex flex-col items-center justify-between  gap-y-4 xl:gap-y-0"
                >
                  <div className="flex h-auto flex-col items-center justify-center gap-3 xl:h-[10rem]">
                    <div
                      onClick={() => toggleTheme(i.name)}
                      className={`relative w-16 cursor-pointer overflow-hidden xl:w-[5rem] ${theme.name != i.name
                        ? ` h-16 xl:h-[5rem]`
                        : ` border-[4px] ${i.border} h-28 border xl:h-[8rem]`
                        } rounded-full `}
                    >
                      <img src={i.image} className="absolute h-full w-full" />
                    </div>
                  </div>
                  <div className="P22Mackinac  text-xl">
                    {theme.name == i.name ? i.name : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* discarded design */}
      {/* { <div
        className={`absolute left-[-15%] top-[40%] flex h-[100rem] w-[130%] flex-col items-center rounded-[50%] ${theme.shoorah_bg_8}`}
      >



        
        <div className="relative flex h-full w-full justify-center">
          <div className="absolute top-[-5rem] ">
            <img
              src={theme.shoorah_mac}
              className="z-10  h-[17rem] w-[25rem]"
            />
          </div>
        </div>
        <div className="absolute top-[10rem] z-10 flex w-[75%] flex-col items-center justify-center gap-2 text-center text-white xl:top-[13rem] 2xl:top-[15rem]">
          <div className="scrollbar mx-auto mt-[2rem] flex w-[90%] gap-[2rem]  overflow-x-scroll xl:justify-evenly">
            {themes.map((i) => (
              <div
                key={i.name}
                className="flex flex-col  items-center justify-between"
              >
                <div className="flex h-[10rem] flex-col items-center justify-center gap-3">
                  <div
                    onClick={() => toggleTheme(i.name)}
                    className={`relative w-[5rem] cursor-pointer overflow-hidden ${
                      theme.name != i.name
                        ? `h-[5rem]`
                        : ` border-[4px] ${i.border} h-[8rem] border`
                    } rounded-full `}
                  >
                    <img src={i.image} className="absolute h-full w-full" />
                  </div>
                </div>
                <div className="P22Mackinac  text-xl">
                  {theme.name == i.name ? i.name : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>} */}
    </div>
  );
};

export default PersonaliseTheme;
