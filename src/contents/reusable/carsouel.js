import React, { Fragment, useEffect, useRef, useState } from "react";
import Carousel from "react-elastic-carousel";
import SoundCard from "./soundCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";
import ritualsBg from "../../assets/svg/ritualsBgDefault.svg";
import affirmationBg from "../../assets/svg/affirmationBgDefault.png";
import { Api } from "../../api";
import { errorToast, successToast } from "../../utils/helper";
import { BOOKMARKS_CONTENT_TYPE } from "../../utils/constants";
import ConfirmPopup from "../../component/common/modals/ConfirmPopup";

const ReusableCarsouel = ({ type, data, left }) => {
  const { theme } = useTheme();
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const [affirPopup, setaffirPopup] = useState(false);
  const [ritualPopup, setRitualPopup] = useState(false);
  const [addRitual, setAddritual] = useState(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const history = useHistory();

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

  const divRef = useRef(null);

  const handleLeft = () => {
    divRef.current.scrollLeft -= 300;
  };

  const handleRight = () => {
    divRef.current.scrollLeft += 300;
  };

  const handleScroll = () => {
    const div = divRef.current;
    setShowLeftButton(div.scrollLeft > 0);
    setShowRightButton(
      div.scrollWidth > div.clientWidth &&
        div.scrollLeft < div.scrollWidth - div.clientWidth,
    );
  };

  useEffect(() => {
    const div = divRef.current;
    setShowRightButton(div.scrollWidth > div.clientWidth);
    div.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => {
      div.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full">
      {data.length ? (
        <div className="carousel-wrapper relative flex w-full items-center gap-5">
          {/* <Carousel breakPoints={breakPoints} pagination={false}>
           */}
          {showLeftButton && (
            <button
              onClick={handleLeft}
              className={`absolute left-[-3rem] z-10 mb-[4rem] hidden h-5 w-5 rounded-full xl:block`}
            >
              <svg
                className="rotate-180"
                width="26"
                height="26"
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
          )}
          <div
            ref={divRef}
            className={`flex w-[100%]  gap-[2rem] scroll-smooth px-3 ${
              data.length > 5 ? `` : left ? `` : `2xl:justify-center`
            }  scrollbar  mx-auto overflow-x-scroll`}
          >
            {data.map((i) => (
              <Fragment key={i.contentId}>
                {i.contentType == 3 ? (
                  <div
                    onClick={() =>
                      (window.location.href = `/soundPlayer/type/${i.contentType}/content/${i.contentId}`)
                    }
                    className="h-[24rem] w-[15rem] cursor-pointer"
                    key={i.contentId}
                  >
                    <SoundCard data={i} label={`Meditation`} />
                  </div>
                ) : i.contentType == 4 ? (
                  <div
                    onClick={() =>
                      (window.location.href = `/soundPlayer/type/${i.contentType}/content/${i.contentId}`)
                    }
                    className="h-[24rem] w-[15rem] cursor-pointer"
                    key={i.contentId}
                  >
                    <SoundCard data={i} label={`Sleep`} />
                  </div>
                ) : i.contentType == 5 ? (
                  <div
                    onClick={() =>
                      (window.location.href = `/soundPlayer/type/${i.contentType}/content/${i.contentId}`)
                    }
                    className="h-[24rem] w-[15rem] cursor-pointer"
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
                    className="mt-[2rem] h-[24rem] w-[15rem] cursor-pointer"
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
                        className={`relative h-[15rem] w-[100%] px-3 text-center ${theme.shoorah_bg_5} flex items-center justify-center overflow-hidden rounded-3xl text-white`}
                      >
                        <img
                          className=" absolute inset-y-0 h-full w-full"
                          src={ritualsBg}
                        />
                        <p className="P22Mackinac z-10 text-2xl">
                          {i.contentName}
                        </p>
                      </div>
                      <div className=" mt-3 w-full text-ellipsis whitespace-nowrap">
                        <p className="P22Mackinac my-1 w-full overflow-hidden !text-ellipsis text-xl font-medium">
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
                    className="mt-[2rem] h-[24rem] w-[15rem] cursor-pointer"
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
                        className={`relative h-[15rem] w-[100%] px-3 text-center ${theme.shoorah_bg_7} flex items-center justify-center overflow-hidden rounded-3xl text-white`}
                      >
                        <img
                          className=" absolute inset-y-0 right-[-1.5rem] h-full w-full"
                          src={affirmationBg}
                        />
                        <p className="P22Mackinac z-10 text-2xl">
                          {i.contentName}
                        </p>
                      </div>
                      <div className=" mt-3 w-full text-ellipsis whitespace-nowrap">
                        <p className="P22Mackinac my-1 w-full overflow-hidden !text-ellipsis text-xl font-medium">
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
                      (window.location.href = `/soundPlayer/type/${type}/content/${i.contentId}`)
                    }
                    className="h-[24rem] w-[15rem] cursor-pointer"
                    key={i.contentId}
                  >
                    <SoundCard data={i} label={``} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          {/* </Carousel> */}

          {showRightButton && (
            <button
              onClick={handleRight}
              className={`absolute right-[-3rem] z-10 mb-[4rem] hidden h-5 w-5 rounded-full xl:block`}
            >
              <svg
                className=""
                width="26"
                height="26"
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
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ReusableCarsouel;
