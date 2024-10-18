import React, { useEffect, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { useTheme } from "../../context/themeContext";
// import Lottie from "lottie-react";
import Lottie from "react-lottie";

const getTouches = (evt) => {
  return evt.touches || evt.originalEvent.touches; // browser API
};

const ShuruAnimateCircle = ({ setItem }) => {
  const { theme } = useTheme();
  const [goToSlide, setGoToSlide] = useState(0);
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showNavigation, setShowNavigation] = useState(false);
  const [enableSwipe, setEnableSwipe] = useState(true);
  const [animationConfig, setAnimationConfig] = useState(config.gentle);
  const [xDown, setXDown] = useState(null);
  const [yDown, setYDown] = useState(null);
  const [item, setItemText] = useState("");
  const [keySlide, setKeySlide] = useState(1);
  const [lottieAnimations, setLottieAnimation] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const slidesName = [
    "Content",
    "Angry",
    "Anxious",
    "Stress",
    "Surprised",
    "Happy",
    "Sad",
    "Excited",
    "Tired",
  ];

  const animationSetting = [
    {
      loop: true,
      autoplay: true,
      animationData: theme.shuruContentLotie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    {
      loop: true,
      autoplay: true,
      animationData: theme.shuruAngryLotie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    {
      loop: true,
      autoplay: true,
      animationData: theme.shuruAnxiousLotie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    {
      loop: true,
      autoplay: true,
      animationData: theme.shuruWorriedLotie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    {
      loop: true,
      autoplay: true,
      animationData: theme.shuruSurpriseLotie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    {
      loop: true,
      autoplay: true,
      animationData: theme.shuruHappyLotie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    {
      loop: true,
      autoplay: true,
      animationData: theme.shuruCryLotie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    {
      loop: true,
      autoplay: true,
      animationData: theme.shuruExcitedLotie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    {
      loop: true,
      autoplay: true,
      animationData: theme.shuruSleepLotie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
  ];

  const slides = [
    {
      key: 1,
      content: (
        <div className="h-[14rem] w-[16rem] 2xl:h-[15rem] 2xl:w-[17rem]">
          <Lottie
            options={animationSetting[0]}
            isStopped={lottieAnimations[0]}
          />
        </div>
      ),
    },
    {
      key: 2,
      content: (
        <div className="h-[14rem] w-[16rem] 2xl:h-[15rem] 2xl:w-[17rem]">
          <Lottie
            options={animationSetting[1]}
            isStopped={lottieAnimations[1]}
          />
        </div>
      ),
    },
    {
      key: 3,
      content: (
        <div className="h-[14rem] w-[16rem] 2xl:h-[15rem] 2xl:w-[17rem]">
          <Lottie
            options={animationSetting[2]}
            isStopped={lottieAnimations[2]}
          />
        </div>
      ),
    },
    {
      key: 4,
      content: (
        <div className="h-[14rem] w-[16rem] 2xl:h-[15rem] 2xl:w-[17rem]">
          <Lottie
            options={animationSetting[3]}
            isStopped={lottieAnimations[3]}
          />
        </div>
      ),
    },
    {
      key: 5,
      content: (
        <div className="h-[14rem] w-[16rem] 2xl:h-[15rem] 2xl:w-[17rem]">
          <Lottie
            options={animationSetting[4]}
            isStopped={lottieAnimations[4]}
          />
        </div>
      ),
    },
    {
      key: 6,
      content: (
        <div className="h-[14rem] w-[16rem] 2xl:h-[15rem] 2xl:w-[17rem]">
          <Lottie
            options={animationSetting[5]}
            isStopped={lottieAnimations[5]}
          />
        </div>
      ),
    },
    {
      key: 7,
      content: (
        <div className="h-[14rem] w-[16rem] 2xl:h-[15rem] 2xl:w-[17rem]">
          <Lottie
            options={animationSetting[6]}
            isStopped={lottieAnimations[6]}
          />
        </div>
      ),
    },
    {
      key: 8,
      content: (
        <div className="h-[14rem] w-[16rem] 2xl:h-[15rem] 2xl:w-[17rem]">
          <Lottie
            options={animationSetting[7]}
            isStopped={lottieAnimations[7]}
          />
        </div>
      ),
    },
    {
      key: 9,
      content: (
        <div className="h-[14rem] w-[16rem] 2xl:h-[15rem] 2xl:w-[17rem]">
          <Lottie
            options={animationSetting[8]}
            isStopped={lottieAnimations[8]}
          />
        </div>
      ),
    },
  ].map((slide, index) => ({
    ...slide,
    onClick: () => {
      setGoToSlide(index);
    },
  }));

  const onChangeInput = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    const name = e.target.name;

    switch (name) {
      case "goToSlide":
        setGoToSlide(value);
        break;
      case "offsetRadius":
        setOffsetRadius(value);
        break;
      default:
        break;
    }
  };

  const handleTouchStart = (evt) => {
    if (!enableSwipe) {
      return;
    }

    const firstTouch = getTouches(evt)[0];
    setXDown(firstTouch.clientX);
    setYDown(firstTouch.clientY);
  };

  function getNextItem() {
    let slide = goToSlide;
    if (slide < 0) {
      slide = (slide + slidesName.length) % slidesName.length; // Move to the next item or loop back to 0
      const currentItem = slidesName[slide];
      // setItemText(currentItem);
      setItem(slidesName[slide]);
      return currentItem;
    } else {
      slide = slide % slidesName.length; // Move to the next item or loop back to 0
      const currentItem = slidesName[slide];
      // setItemText(currentItem);

      setItem(slidesName[slide]);
      return currentItem;
    }
  }

  const handleTouchMove = (evt) => {
    if (!enableSwipe || (!xDown && !yDown)) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        /* left swipe */
        setGoToSlide(parseInt(goToSlide + 1));
      } else {
        /* right swipe */
        setGoToSlide(parseInt(goToSlide - 1));
      }
    }
  };

  useEffect(() => {
    let slide = goToSlide;
    const lottieAnimation = [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ];
    setLottieAnimation(lottieAnimation);

    if (slide < 0) {
      slide = (slide + slidesName.length) % slidesName.length; // Move to the next item or loop back to 0
      let animationPlayData = [...lottieAnimation];
      animationPlayData[slide] = false;
      setLottieAnimation(animationPlayData);
    } else {
      slide = slide % slidesName.length; // Move to the next item or loop back to 0
      let animationPlayData = [...lottieAnimation];
      animationPlayData[slide] = false;
      setLottieAnimation(animationPlayData);
    }
  }, [goToSlide]);

  return (
    <div className="flex  w-screen flex-col items-center justify-center ">
      <div className="flex flex-col gap-3 outline-none ">
        <p
          className={`P22Mackinac mt-8 text-4xl font-medium lg:text-5xl ${theme.shoorah_text_5} `}
        >
          ‘I’m feeling’
        </p>
      </div>
      <div
        // style={{ width: "30%", height: "100px", margin: "0 auto" }}
        className=" mt-32 flex h-full w-[18rem] flex-col items-center  justify-center gap-5"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="relative flex w-full origin-center  items-center justify-center  ">
          <Carousel
            slides={slides}
            goToSlide={goToSlide}
            offsetRadius={2}
            showNavigation={showNavigation}
            animationConfig={config.gentle}
            key={1}
          />
        </div>
        <div className="relative mt-[4.4rem] flex items-center justify-center lg:mt-[3rem] xl:mt-[4.4rem]">
          <div className=" flex h-[6rem] w-[20rem]  items-center justify-center">
            <div className="flex items-center  justify-center   gap-2">
              <button
                onClick={() => {
                  setGoToSlide(goToSlide - 1);
                }}
                className={`w-[3rem] cursor-pointer outline-none`}
              >
                <svg
                  width="24"
                  height="20"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.30078 13.2988C7.30078 13.2988 1.25078 10.0378 1.25078 7.27576C1.25078 4.51176 7.30078 1.24976 7.30078 1.24976"
                    stroke={`${theme.strokeColor2}`}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className={`flex w-[16rem] items-center justify-center rounded-[3rem] ${theme.shoorah_bg_5} P22Mackinac py-1 text-2xl font-medium text-white `}
              >
                {getNextItem()}
              </div>
              <button
                onClick={() => {
                  setGoToSlide(goToSlide + 1);
                }}
                className={`w-[3rem] rotate-180 outline-none`}
              >
                <svg
                  width="24"
                  height="20"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.30078 13.2988C7.30078 13.2988 1.25078 10.0378 1.25078 7.27576C1.25078 4.51176 7.30078 1.24976 7.30078 1.24976"
                    stroke={`${theme.strokeColor2}`}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShuruAnimateCircle;
