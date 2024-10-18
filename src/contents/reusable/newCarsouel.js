import React, { Fragment, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import SoundCard from "./soundCard";
import ConfirmPopup from "../../component/common/modals/ConfirmPopup";
import { errorToast, successToast } from "../../utils/helper";
import { BOOKMARKS_CONTENT_TYPE } from "../../utils/constants";
import { Api } from "../../api";
import ritualsBg from "../../assets/svg/ritualsBgDefault.svg";
import affirmationBg from "../../assets/svg/affirmationBgDefault.png";
import { useTheme } from "../context/themeContext";
import "../../assets/css/reusable_carsouel.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NewCarsouel = ({ data, left,type }) => {
  const { theme } = useTheme();
  const [affirPopup, setaffirPopup] = useState(false);
  const [ritualPopup, setRitualPopup] = useState(false);
  const [addRitual, setAddritual] = useState(null);
  const swiper = useSwiper();
  const swiperRef = useRef();
  const history = useHistory();

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        onClick={onClick}
        className={`h-5 w-5 ${
          className.includes("disable") && "opacity-25"
        } absolute right-[-2rem] top-1/2 z-10 hidden rounded-full outline-none xl:block`}
      >
        <svg
          className=""
          width="18"
          height="18"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.375 0.75C1.375 0.75 6.625 3.858 6.625 6C6.625 8.14125 1.375 11.25 1.375 11.25"
            stroke={theme.shoorah_7}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        onClick={onClick}
        className={`z-10 h-5 w-5 ${
          className.includes("disable") && "opacity-25"
        }  absolute left-[-2rem] top-1/2 hidden rounded-full outline-none xl:block`}
      >
        <svg
          className="rotate-180"
          width="18"
          height="18"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.375 0.75C1.375 0.75 6.625 3.858 6.625 6C6.625 8.14125 1.375 11.25 1.375 11.25"
            stroke={theme.shoorah_7}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    );
  }

  const addToMyRituals = async () => {
    let payload = {
      ritualIds: [addRitual.contentId],
    };
    Api.addToMyRituals(payload)
      .then((res) => {
        if (res?.data?.meta?.code === 1) {
          successToast(res?.data?.meta?.message);
        } else {
          errorToast(res.data.meta.message);
        }
      })
      .catch((err) => errorToast(err));
  };

  const createBookmark = (id) => {
    let reqBody = {
      contentType: BOOKMARKS_CONTENT_TYPE.AFFIRMATION,
      contentId: id,
    };
    Api.saveAffirmationToBookmarks(reqBody)
      .then((res) => {
        successToast(res.data.meta.message);
      })
      .catch((err) => {
        errorToast(err.message);
      });
  };

  const userActivity = (i) => {
    let feature =
      i.contentType == 5 ? 5 : i.contentType == 3 ? 8 : i.contentType == 4 ? 9 : null;
    let payload = {
      featureType: feature,
    };
    Api.userActivityStatus(payload)
      .then((res) => {
        if (res.data.meta.code == 1) {
          console.log("success");
          if (res.data.data.totalCount > 1) {
            history.push('/subscription');
          } else {
            window.location.href = `/soundPlayer/type/${i.contentType}/content/${i.contentId}`;
          }
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRedirection = (i) => {
    Api.getCurrentPlan().then((res) => {
      if (res.data.meta.code == 1) {
        if (res?.data?.data?.accountType != "SUBSCRIBED") {
          userActivity(i);
        }
        else{
          window.location.href = `/soundPlayer/type/${i.contentType}/content/${i.contentId}`;
        }
      }
    });
  }

  if (!data.length) {
    return "";
  }

  return (
    <div className="relative mx-auto w-[90%] 2xl:w-[90%]">
      <Swiper
        loop={true}
        spaceBetween={10}
        //    navigation
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={() => console.log("slide change")}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 2,
          },
          639: {
            slidesPerView: 2,
          },
          865: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {data.map((i) => {
          return (
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={i.contentId}
            >
              {i.contentType == 3 ? (
                <div
                  onClick={() =>
                    handleRedirection(i)
                  }
                  className="mx-auto aspect-square  w-full cursor-pointer   xl:h-[24rem] xl:w-[15rem]"
                  key={i.contentId}
                >
                  <SoundCard data={i} label={`Meditation`} />
                </div>
              ) : i.contentType == 4 ? (
                <div
                onClick={() =>
                  handleRedirection(i)
                }
                  className="aspect-square w-full  cursor-pointer xl:h-[24rem]   xl:w-[15rem]"
                  key={i.contentId}
                >
                  <SoundCard data={i} label={`Sleep`} />
                </div>
              ) : i.contentType == 5 ? (
                <div
                onClick={() =>
                  handleRedirection(i)
                }
                  className="aspect-square w-full  cursor-pointer xl:h-[24rem]   xl:w-[15rem]"
                  key={i.contentId}
                >
                  <SoundCard data={i} label={`Shoorah Pods`} />
                </div>
              ) : i.contentType == 7 ? (
                <div
                  onClick={() => {
                    setRitualPopup(true);
                    setAddritual(i);
                  }}
                  className="mt-[2rem] w-full cursor-pointer xl:h-[24rem] xl:w-[15rem] "
                  key={i.contentId}
                >
                  <ConfirmPopup
                    open={ritualPopup}
                    setOpen={setRitualPopup}
                    message={"Are you sure you want to save this ritual?"}
                    setAccepted={() => addToMyRituals(i.contentId)}
                    handleNo={() => {
                      setRitualPopup(false);
                    }}
                  />
                  <div className="relative flex h-fit flex-col  items-start justify-evenly overflow-hidden">
                    <div
                      className={`relative aspect-square w-[100%] px-3 text-center xl:h-[15rem] ${theme.shoorah_bg_5} flex items-center justify-center overflow-hidden rounded-3xl text-white`}
                    >
                      <img
                        className=" absolute inset-y-0 h-full w-full"
                        src={ritualsBg}
                      />
                      <p className="P22Mackinac z-10 text-sm xl:text-2xl">
                        {i.contentName}
                      </p>
                    </div>
                    <div className=" mt-3 w-full text-ellipsis whitespace-nowrap">
                      <p className="P22Mackinac my-1 w-full overflow-hidden !text-ellipsis text-lg font-medium xl:text-xl">
                        {i.contentType == 7
                          ? `Rituals`
                          : i.contentType == 2
                            ? `Affirmation`
                            : null}
                      </p>
                    </div>
                  </div>
                </div>
              ) : i.contentType == 2 ? (
                <div
                  onClick={() => {
                    setaffirPopup(true);
                  }}
                  className="mt-[2rem] w-full cursor-pointer xl:h-[24rem] xl:w-[15rem] "
                  key={i.contentId}
                >
                  <ConfirmPopup
                    open={affirPopup}
                    setOpen={setaffirPopup}
                    message={
                      "Are you sure you want to bookmark this affirmation?"
                    }
                    setAccepted={() => createBookmark(i.contentId)}
                    handleNo={() => {
                      setaffirPopup(false);
                    }}
                  />
                  <div className="relative flex h-fit flex-col  items-start justify-evenly overflow-hidden">
                    <div
                      className={`relative aspect-square w-[100%] px-3 text-center xl:h-[15rem] ${theme.shoorah_bg_7} flex items-center justify-center overflow-hidden rounded-3xl text-white`}
                    >
                      <img
                        className=" absolute inset-y-0 right-[-1.5rem] h-full w-full"
                        src={affirmationBg}
                      />
                      <p className="P22Mackinac z-10 text-sm xl:text-2xl">
                        {i.contentName}
                      </p>
                    </div>
                    <div className=" mt-3 w-full text-ellipsis whitespace-nowrap">
                      <p className="P22Mackinac my-1 w-full overflow-hidden !text-ellipsis text-lg font-medium xl:text-xl">
                        {i.contentType == 7
                          ? `Rituals`
                          : i.contentType == 2
                            ? `Affirmation`
                            : null}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                onClick={() =>
                  handleRedirection(i)
                }
                  className="aspect-square w-full  cursor-pointer xl:h-[24rem]   xl:w-[15rem]"
                  key={i.contentId}
                >
                  <SoundCard data={i} label={``} />
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button
        className="absolute -left-6 top-[35%] z-10"
        onClick={() => swiperRef.current.slidePrev()}
      >
        <svg
          className="rotate-180"
          width="18"
          height="18"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.375 0.75C1.375 0.75 6.625 3.858 6.625 6C6.625 8.14125 1.375 11.25 1.375 11.25"
            stroke={theme.shoorah_7}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        className="absolute -right-6 top-[35%] z-10"
        onClick={() => swiperRef.current.slideNext()}
      >
        <svg
          className=""
          width="18"
          height="18"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.375 0.75C1.375 0.75 6.625 3.858 6.625 6C6.625 8.14125 1.375 11.25 1.375 11.25"
            stroke={theme.shoorah_7}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default NewCarsouel;
