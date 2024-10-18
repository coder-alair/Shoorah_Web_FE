import React, { useRef, useState, Fragment, useEffect } from "react";
import Setting from "./shuruHome/setting";
import { useTheme } from "../context/themeContext";
import Navbar from "../layout/navbar";
import SideMenu from "../layout/sideMenu";
import Hero from "../reusable/hero";
import camera from "../../assets/shuru_characters/shuru_camera.svg";
import calenderSvg from "../../assets/svg/calenderSvg.svg";
import ShuruCircle from "./shuruCircle";
import TextCircle from "./textCircle";
import { DateRangePicker } from "react-date-range";
import { Transition } from "@headlessui/react";
import {
  errorToast,
  getLocalStorageItem,
  isObjectEmpty,
  useOutsideClick,
} from "../../utils/helper";
import { Api } from "../../api";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAudio } from "../context/audiobar";
import Loader from "../../component/common/Loader";
import ConfirmPopup from "../../component/common/modals/ConfirmPopup";
import DownloadShuruReport from "./shuruHome/downloadReport";
import { useAuth } from "../context/user";

const ShuruProfile = () => {
  const { theme } = useTheme();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showTimeSpent, setShowTimeSpent] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [timeSpent, setTimespent] = useState({
    length: 0,
    paginatedResult: [],
  });
  const [timeSpentResult, setTimespentResult] = useState(null);
  const { audioNav } = useAudio();
  const [downloadReport, setReport] = useState(false);
  const { user: me } = useAuth();

  const [timeSpentDate, setTimeSpentDate] = useState({
    startDate: new Date(new Date().getTime() - 24 * 3600000),
    endDate: new Date(),
  });

  const [userMoodRecords, setUserMoodRecords] = useState([]);
  const [moods, setMoods] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatHistoryDate, setChatHistoryDate] = useState({
    startDate: new Date(new Date().getTime() - 24 * 3600000),
    endDate: new Date(),
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getTime() - 24 * 3600000),
    endDate: new Date(),
  });

  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => {
    if (showFilterModal) setShowFilterModal(!showFilterModal);
    if (showTimeSpent) setShowTimeSpent(!showTimeSpent);
    if (showChatHistory) setShowChatHistory(!showChatHistory);
  });

  const handleMoodRecordDateChange = (e) => {
    let start = new Date(e?.selection?.startDate);
    start.setHours(new Date().getHours());
    start.setMinutes(new Date().getMinutes());
    start.setSeconds(new Date().getSeconds());
    let end = new Date(e?.selection?.endDate);
    end.setHours(new Date().getHours());
    end.setMinutes(new Date().getMinutes());
    end.setSeconds(new Date().getSeconds());
    const date = {
      startDate: start,
      endDate: end,
    };
    setDateRange(date);
  };

  const handleTimeSpentDateRange = (e) => {
    let start = new Date(e?.selection?.startDate);
    start.setHours(new Date().getHours());
    start.setMinutes(new Date().getMinutes());
    start.setSeconds(new Date().getSeconds());
    let end = new Date(e?.selection?.endDate);
    end.setHours(new Date().getHours());
    end.setMinutes(new Date().getMinutes());
    end.setSeconds(new Date().getSeconds());
    const date = {
      startDate: start,
      endDate: end,
    };
    setTimeSpentDate(date);
  };

  const handleTimeChatHistoryDateRange = (e) => {
    let start = new Date(e?.selection?.startDate);
    start.setHours(new Date().getHours());
    start.setMinutes(new Date().getMinutes());
    start.setSeconds(new Date().getSeconds());
    let end = new Date(e?.selection?.endDate);
    end.setHours(new Date().getHours());
    end.setMinutes(new Date().getMinutes());
    end.setSeconds(new Date().getSeconds());
    const date = {
      startDate: start,
      endDate: end,
    };

    setChatHistoryDate(date);
  };

  useEffect(() => {
    const id = getLocalStorageItem("userData");
    setUserId(JSON.parse(id));
  }, []);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  useEffect(() => {
    if (!me?.shuruUsage) {
      history.replace('/home')
    }
  }, [me]);

  const getUser = () => {
    Api.getUserProfile(userId.id)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setUser(res?.data?.data);
        } else {
          errorToast("Something wrong happen");
        }
      })
      .catch((err) => console.log(err));
  };

  const getTimeSpent = () => {
    Api.shuruGetTimeSpent(
      1,
      10,
      timeSpentDate.startDate.toISOString().split("T")[0],
      timeSpentDate.endDate.toISOString().split("T")[0],
    )
      .then((res) => {
        if (res.data) {
          setTimespent(res.data);
          if (res.data.data.paginatedResult == null) {
            setTimespentResult(null);
          }
          setTimespentResult(res.data.data.paginatedResult[0]);
        } else {
          errorToast("something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMood();
  }, []);

  const getMood = () => {
    Api.shuruGetMood()
      .then((res) => {
        setMoods(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getUserMoodRecord = () => {
    setLoader(true);
    Api.shuruGetUserMood(
      1,
      10,
      dateRange.startDate.toISOString().split("T")[0],
      dateRange.endDate.toISOString().split("T")[0],
    )
      .then((res) => {
        if (isObjectEmpty(res.data.data)) {
          setUserMoodRecords([]);
          setLoader(false);
        } else if (!isObjectEmpty(res.data.data)) {
          setUserMoodRecords(res.data.data.moodData);
          setLoader(false);
        } else {
          errorToast("something went wrong");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const getChatSession = () => {
    setLoader(true);
    Api.shuruChatSession(
      1,
      2,
      chatHistoryDate.startDate.toISOString().split("T")[0],
      chatHistoryDate.endDate.toISOString().split("T")[0],
    )
      .then((res) => {
        if (res.data.data.data == null) {
          setChatHistory([]);
          setLoader(false);
        } else {
          setChatHistory(res.data.data.data);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    getTimeSpent();
    getChatSession();
    getUserMoodRecord();
  }, [timeSpentDate, chatHistoryDate, dateRange]);

  return (
    <div
      className={`w-screen overflow-x-hidden pb-[4rem] md:pb-[13vh] lg:pb-0 ${audioNav && `mb-[10rem]`
        } `}
    >
      {loader && <Loader />}
      <Navbar />
      <Hero hideInfo={true} onlyNav={true} planeBg={true} />
      <SideMenu />

      {/* hero */}
      <div className="relative block h-[10rem] w-full ">
        <div
          className={`absolute  flex h-full w-full scale-x-110  flex-col items-center justify-center rounded-b-[50%] text-white ${theme.shoorah_bg_5}`}
        ></div>

        {/* nav links */}
        <div className="absolute left-8 top-8 flex gap-3 outline-none">
          <a
            href="/shuru"
            // type="button"
            title="Leave Shuru"
            // onClick={() => setShow(!show)}
            className={
              "flex  w-full  items-center py-3 text-left text-sm text-gray-700"
            }
          >
            <div className="mr-2 h-[2rem] w-[2rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke={`#fff`}
                  stroklinecap="round"
                  strokeLinejoin="round"
                  d="M7 4.129C5.74 5.16 5.11 5.79 4.129 7 5.11 8.21 5.74 8.84 7 9.871"
                ></path>
                <path
                  stroke={`#fff`}
                  stroklinecap="round"
                  d="M10.482 4.135a86.718 86.718 0 0 0-.063-1.54C10.374 1.678 9.6.923 8.587.85a39.976 39.976 0 0 0-5.67 0c-1.012.072-1.787.827-1.833 1.746A88.811 88.811 0 0 0 .977 7c0 1.511.037 2.985.107 4.404.046.92.82 1.674 1.833 1.746a39.962 39.962 0 0 0 5.67 0c1.012-.072 1.787-.827 1.832-1.746.026-.506.046-1.02.063-1.539"
                ></path>
                <path
                  stroke={`#fff`}
                  stroklinecap="round"
                  strokeLinejoin="round"
                  d="M13.023 7 4.161 7"
                ></path>
              </svg>
            </div>
          </a>
        </div>
        <div className="absolute right-8 top-9 flex -rotate-90 gap-3 outline-none">
          <button
            // type="button"
            title="Download Report"
            // onClick={() => setShow(!show)}
            onClick={() => setReport(!downloadReport)}
            className={
              "flex  w-full  items-center text-left  text-sm text-gray-700"
            }
          >
            <div className="mr-2 h-[2rem] w-[2rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke={`#fff`}
                  stroklinecap="round"
                  strokeLinejoin="round"
                  d="M7 4.129C5.74 5.16 5.11 5.79 4.129 7 5.11 8.21 5.74 8.84 7 9.871"
                ></path>
                <path
                  stroke={`#fff`}
                  stroklinecap="round"
                  d="M10.482 4.135a86.718 86.718 0 0 0-.063-1.54C10.374 1.678 9.6.923 8.587.85a39.976 39.976 0 0 0-5.67 0c-1.012.072-1.787.827-1.833 1.746A88.811 88.811 0 0 0 .977 7c0 1.511.037 2.985.107 4.404.046.92.82 1.674 1.833 1.746a39.962 39.962 0 0 0 5.67 0c1.012-.072 1.787-.827 1.832-1.746.026-.506.046-1.02.063-1.539"
                ></path>
                <path
                  stroke={`#fff`}
                  stroklinecap="round"
                  strokeLinejoin="round"
                  d="M13.023 7 4.161 7"
                ></path>
              </svg>
            </div>
          </button>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ">
          <div className=" inset-x-0 bottom-[-8rem] flex items-center justify-center">
            <div className="relative h-36 w-36  rounded-2xl border-8 border-white bg-white lg:h-[14rem] lg:w-[14rem] lg:rounded-[4rem]">
              {user?.profile && !user?.profile.includes("null") && (
                <img
                  src={user?.profile}
                  className="h-full w-full rounded-2xl object-cover lg:rounded-[4rem]"
                />
              )}
              {!user.profile ||
                (user?.profile.includes("null") && (
                  <img
                    src={theme.shoorah_light_gradient}
                    className="h-full w-full rounded-2xl lg:rounded-[4rem]"
                  />
                ))}
              <div
                onClick={() => history.push("/account", userId)}
                className={`flex h-[4.5rem] w-[4.5rem] cursor-pointer items-center justify-center ${theme.shoorah_bg_5} absolute bottom-[-2rem] left-[4.5rem] rounded-full border border-[5px] border-white`}
              >
                <img
                  src={camera}
                  className=" h-6 w-6 lg:h-[2rem] lg:w-[2rem]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div
          style={{ borderRadius: "0 0 50% 50% /0 0 90% 90%" }}
          className={`absolute left-[calc(0%-8rem)] top-[-5px] flex h-[15rem] w-[calc(100%+300px)] flex-col items-center justify-center text-white ${theme.shoorah_bg_5}`}
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-x-0 bottom-[-8rem] flex items-center justify-center">
              <div className="relative  h-[14rem] w-[14rem] rounded-[4rem] border-8 border-white bg-white">
                {user?.profile && !user?.profile.includes("null") && (
                  <img
                    src={user?.profile}
                    className="h-full w-full rounded-[4rem] object-cover"
                  />
                )}
                {!user.profile ||
                  (user?.profile.includes("null") && (
                    <img
                      src={theme.shoorah_light_gradient}
                      className="h-full w-full rounded-[4rem]"
                    />
                  ))}
                <div
                  onClick={() => history.push("/account", userId)}
                  className={`flex h-[4.5rem] w-[4.5rem] cursor-pointer items-center justify-center ${theme.shoorah_bg_5} absolute bottom-[-2rem] left-[4.5rem] rounded-full border border-[5px] border-white`}
                >
                  <img src={camera} className="h-[2rem] w-[2rem]" />
                </div>
              </div>
            </div>
            <div className="absolute left-[10rem] top-[2rem] flex gap-3 outline-none">
              <a
                href="/shuru"
                // type="button"
                title="Leave Shuru"
                // onClick={() => setShow(!show)}
                className={
                  "flex  w-full  items-center py-3 text-left text-sm text-gray-700"
                }
              >
                <div className="mr-2 h-[2rem] w-[2rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke={`#fff`}
                      stroklinecap="round"
                      strokeLinejoin="round"
                      d="M7 4.129C5.74 5.16 5.11 5.79 4.129 7 5.11 8.21 5.74 8.84 7 9.871"
                    ></path>
                    <path
                      stroke={`#fff`}
                      stroklinecap="round"
                      d="M10.482 4.135a86.718 86.718 0 0 0-.063-1.54C10.374 1.678 9.6.923 8.587.85a39.976 39.976 0 0 0-5.67 0c-1.012.072-1.787.827-1.833 1.746A88.811 88.811 0 0 0 .977 7c0 1.511.037 2.985.107 4.404.046.92.82 1.674 1.833 1.746a39.962 39.962 0 0 0 5.67 0c1.012-.072 1.787-.827 1.832-1.746.026-.506.046-1.02.063-1.539"
                    ></path>
                    <path
                      stroke={`#fff`}
                      stroklinecap="round"
                      strokeLinejoin="round"
                      d="M13.023 7 4.161 7"
                    ></path>
                  </svg>
                </div>
              </a>
            </div>
            <div className="absolute right-[16rem] top-[2rem] flex -rotate-90 gap-3 outline-none">
              <button
                // type="button"
                title="Download Report"
                // onClick={() => setShow(!show)}
                onClick={() => setReport(!downloadReport)}
                className={
                  "flex  w-full  items-center text-left  text-sm text-gray-700"
                }
              >
                <div className="mr-2 h-[2rem] w-[2rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke={`#fff`}
                      stroklinecap="round"
                      strokeLinejoin="round"
                      d="M7 4.129C5.74 5.16 5.11 5.79 4.129 7 5.11 8.21 5.74 8.84 7 9.871"
                    ></path>
                    <path
                      stroke={`#fff`}
                      stroklinecap="round"
                      d="M10.482 4.135a86.718 86.718 0 0 0-.063-1.54C10.374 1.678 9.6.923 8.587.85a39.976 39.976 0 0 0-5.67 0c-1.012.072-1.787.827-1.833 1.746A88.811 88.811 0 0 0 .977 7c0 1.511.037 2.985.107 4.404.046.92.82 1.674 1.833 1.746a39.962 39.962 0 0 0 5.67 0c1.012-.072 1.787-.827 1.832-1.746.026-.506.046-1.02.063-1.539"
                    ></path>
                    <path
                      stroke={`#fff`}
                      stroklinecap="round"
                      strokeLinejoin="round"
                      d="M13.023 7 4.161 7"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* data */}
      <div className="  mt-24 flex h-full w-full flex-col items-center justify-center gap-12 lg:mt-44 ">
        <p
          className={`text-2xl font-medium lg:text-6xl ${theme.shoorah_text_5} P22Mackinac mx-auto  w-full text-center capitalize tracking-wider`}
        >
          {user?.name}
        </p>
        <div className=" grid w-[90%] grid-cols-1 justify-center gap-5  pb-8 lg:grid-cols-2">
          <div className="flex h-auto w-full flex-col gap-4   lg:gap-8">
            <div className="relative flex h-auto w-full flex-col justify-center gap-y-4 rounded-[3rem] text-center  lg:gap-y-8">
              <p
                className={`${theme.shoorah_text_5} P22Mackinac flex items-center justify-start text-center  text-2xl lg:justify-center lg:text-3xl`}
              >
                Time Spent
                <div
                  onClick={() => setShowTimeSpent(!showTimeSpent)}
                  className={`cursor-pointer rounded-3xl border ${theme.shoorah_border_5} fade-in-image mx-3 border-2  px-2 py-2`}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <g clipPath="url(#clip0_296_8804)">
                      <path
                        d="M6.11133 0.964355V4.22902"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11.8799 0.964355V4.22902"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                      />
                      <path
                        d="M1.40371 13.5318C1.61115 15.3824 3.11535 16.8518 4.97542 16.9414C6.26107 17.0033 7.57442 17.0354 8.99981 17.0354C10.4252 17.0354 11.7385 17.0033 13.0242 16.9414C14.8842 16.8518 16.3885 15.3824 16.5959 13.5318C16.7357 12.2855 16.8502 11.0078 16.8502 9.70621C16.8502 8.40463 16.7357 7.12691 16.5959 5.88064C16.3885 4.03001 14.8842 2.56063 13.0242 2.47105C11.7386 2.40913 10.4252 2.37695 8.99981 2.37695C7.57442 2.37695 6.26107 2.40913 4.97542 2.47105C3.11535 2.56063 1.61115 4.03001 1.40371 5.88064C1.26402 7.12691 1.14941 8.40463 1.14941 9.70621C1.14941 11.0078 1.26402 12.2855 1.40371 13.5318Z"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                      />
                      <path
                        d="M5.14258 7.77783H5.78544"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.14258 11.6348H5.78544"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.67871 7.77783H9.32157"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.2139 7.77783H12.8567"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.67871 11.6348H9.32157"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_296_8804">
                        <rect
                          width="18"
                          height="18"
                          fill={theme.strokeColor2}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </p>
              <div className="flex w-full items-center gap-4 rounded-[3rem] border  px-3 py-3 shadow-lg ">
                <div
                  className={`flex h-[4rem] w-[4.2rem] items-center justify-center shadow-lg ${theme.shoorah_bg_2} rounded-full`}
                >
                  <svg
                    height={`30`}
                    width={`30`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke={theme.strokeColor2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.5.75h3"
                    ></path>
                    <path
                      stroke={theme.strokeColor2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 .75v2.5"
                    ></path>
                    <path
                      stroke={theme.strokeColor2}
                      d="M2 8.25a5 5 0 1 0 10 0 5 5 0 1 0-10 0"
                    ></path>
                    <path
                      stroke={theme.strokeColor2}
                      strokeLinecap="round"
                      d="M.773 3.583a7.827 7.827 0 0 1 1.595-1.586"
                    ></path>
                    <path
                      stroke={theme.strokeColor2}
                      strokeLinecap="round"
                      d="M13.228 3.583a7.828 7.828 0 0 0-1.596-1.586"
                    ></path>
                    <path
                      stroke={theme.strokeColor2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 6.26v2l1.2 1.2"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <p className="P22Mackinac text-base lg:text-xl">
                    Total Time Spent With Shuru
                  </p>
                  <p className="P22Mackinac text-base lg:text-xl">
                    <span className="P22Mackinac font-[600] tracking-wide">
                      Today :
                    </span>{" "}
                    {timeSpentResult ? timeSpentResult.chatTime : `0 hours`}
                  </p>
                </div>
                {showTimeSpent && (
                  <Transition
                    show={showTimeSpent}
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div
                      className="absolute left-0 top-[2rem] z-[2] mx-auto mt-2 w-fit rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:left-[2rem]"
                      ref={wrapperRef}
                    >
                      <DateRangePicker
                        ranges={[
                          {
                            startDate: timeSpentDate?.startDate
                              ? timeSpentDate?.startDate
                              : new Date(),
                            endDate: timeSpentDate?.endDate
                              ? timeSpentDate?.endDate
                              : new Date(),
                            key: "selection",
                          },
                        ]}
                        onChange={handleTimeSpentDateRange}
                        maxDate={new Date()}
                      />
                    </div>
                  </Transition>
                )}
              </div>
              <div
                className={`${theme.shoorah_bg_5} mx-auto h-[2px] w-[80%] rounded-full `}
              ></div>
            </div>

            <div className="flex w-full flex-col justify-evenly gap-4 rounded-[3rem] bg-white py-3 text-center lg:gap-6 ">
              <div className="relative lg:my-3">
                <p
                  className={`${theme.shoorah_text_5} scrollbar P22Mackinac flex items-center justify-start overflow-y-scroll text-center text-2xl lg:justify-center lg:text-3xl`}
                >
                  Chat History
                  <div
                    onClick={() => setShowChatHistory(!showChatHistory)}
                    className={`cursor-pointer rounded-3xl border ${theme.shoorah_border_5} fade-in-image   mx-3 border-2  px-2 py-2 `}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_296_8804)">
                        <path
                          d="M6.11133 0.964355V4.22902"
                          stroke={theme.strokeColor2}
                          strokeWidth="1.28571"
                          strokeLinecap="round"
                        />
                        <path
                          d="M11.8799 0.964355V4.22902"
                          stroke={theme.strokeColor2}
                          strokeWidth="1.28571"
                          strokeLinecap="round"
                        />
                        <path
                          d="M1.40371 13.5318C1.61115 15.3824 3.11535 16.8518 4.97542 16.9414C6.26107 17.0033 7.57442 17.0354 8.99981 17.0354C10.4252 17.0354 11.7385 17.0033 13.0242 16.9414C14.8842 16.8518 16.3885 15.3824 16.5959 13.5318C16.7357 12.2855 16.8502 11.0078 16.8502 9.70621C16.8502 8.40463 16.7357 7.12691 16.5959 5.88064C16.3885 4.03001 14.8842 2.56063 13.0242 2.47105C11.7386 2.40913 10.4252 2.37695 8.99981 2.37695C7.57442 2.37695 6.26107 2.40913 4.97542 2.47105C3.11535 2.56063 1.61115 4.03001 1.40371 5.88064C1.26402 7.12691 1.14941 8.40463 1.14941 9.70621C1.14941 11.0078 1.26402 12.2855 1.40371 13.5318Z"
                          stroke={theme.strokeColor2}
                          strokeWidth="1.28571"
                        />
                        <path
                          d="M5.14258 7.77783H5.78544"
                          stroke={theme.strokeColor2}
                          strokeWidth="1.28571"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.14258 11.6348H5.78544"
                          stroke={theme.strokeColor2}
                          strokeWidth="1.28571"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.67871 7.77783H9.32157"
                          stroke={theme.strokeColor2}
                          strokeWidth="1.28571"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.2139 7.77783H12.8567"
                          stroke={theme.strokeColor2}
                          strokeWidth="1.28571"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.67871 11.6348H9.32157"
                          stroke={theme.strokeColor2}
                          strokeWidth="1.28571"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_296_8804">
                          <rect
                            width="18"
                            height="18"
                            fill={theme.strokeColor2}
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  {showChatHistory && (
                    <Transition
                      show={showChatHistory}
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div
                        className="absolute left-0 top-[2rem] z-[2] mx-auto mt-2 w-fit rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:left-[2rem]"
                        ref={wrapperRef}
                      >
                        <DateRangePicker
                          ranges={[
                            {
                              startDate: chatHistoryDate?.startDate
                                ? chatHistoryDate?.startDate
                                : new Date(),
                              endDate: chatHistoryDate?.endDate
                                ? chatHistoryDate?.endDate
                                : new Date(),
                              key: "selection",
                            },
                          ]}
                          onChange={handleTimeChatHistoryDateRange}
                          maxDate={new Date()}
                        />
                      </div>
                    </Transition>
                  )}
                </p>
                <p className={`P22Mackinac mt-[0.5rem] text-center text-xl`}>
                  Recent Chats :
                </p>
              </div>
              {chatHistory.map((i) => (
                <div
                  key={i._id}
                  className="flex h-auto w-full items-center gap-4 rounded-[3rem] border px-3 py-2 shadow-lg "
                >
                  <div
                    className={`flex h-[4rem] w-[4.2rem] items-center justify-center shadow-lg ${theme.shoorah_bg_2} rounded-full`}
                  >
                    <img
                      src={theme.shuruContent}
                      className="h-[38px] w-[38px]"
                    />
                  </div>
                  <div className="flex flex-col py-2 text-left">
                    <p className="P22Mackinac text-base lg:text-lg">
                      '{i.message}'{" "}
                    </p>
                    <p className="P22Mackinac text-base">
                      Mood Logged : {i.mood}
                    </p>
                    <p className="P22Mackinac text-base">
                      Chat Started At :{" "}
                      {new Date(i.createdAt)
                        .toUTCString()
                        .split(",")[1]
                        ?.trim()
                        .slice(0, 11)}{" "}
                    </p>
                  </div>
                </div>
              ))}

              {chatHistory.length == 0 && (
                <div className="flex h-[6rem] w-full items-center justify-center gap-4 rounded-[3rem] border p-3 shadow-lg ">
                  <p className="P22Mackinac text-xl">No History</p>
                </div>
              )}
              <div
                className={`${theme.shoorah_bg_5} mx-auto h-[2px] w-[80%] rounded-full lg:hidden `}
              ></div>
            </div>

            <div className="relative flex w-full flex-col justify-center gap-y-4  text-center lg:hidden lg:gap-y-8">
              <p
                className={`${theme.shoorah_text_5} P22Mackinac flex items-center justify-start text-center  text-2xl lg:justify-center lg:text-3xl`}
              >
                Mood Record
                <div
                  onClick={() => setShowFilterModal((state) => !state)}
                  className={`cursor-pointer rounded-3xl border ${theme.shoorah_border_5} fade-in-image   mx-3 border-2  px-2 py-2 `}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_296_8804)">
                      <path
                        d="M6.11133 0.964355V4.22902"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11.8799 0.964355V4.22902"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                      />
                      <path
                        d="M1.40371 13.5318C1.61115 15.3824 3.11535 16.8518 4.97542 16.9414C6.26107 17.0033 7.57442 17.0354 8.99981 17.0354C10.4252 17.0354 11.7385 17.0033 13.0242 16.9414C14.8842 16.8518 16.3885 15.3824 16.5959 13.5318C16.7357 12.2855 16.8502 11.0078 16.8502 9.70621C16.8502 8.40463 16.7357 7.12691 16.5959 5.88064C16.3885 4.03001 14.8842 2.56063 13.0242 2.47105C11.7386 2.40913 10.4252 2.37695 8.99981 2.37695C7.57442 2.37695 6.26107 2.40913 4.97542 2.47105C3.11535 2.56063 1.61115 4.03001 1.40371 5.88064C1.26402 7.12691 1.14941 8.40463 1.14941 9.70621C1.14941 11.0078 1.26402 12.2855 1.40371 13.5318Z"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                      />
                      <path
                        d="M5.14258 7.77783H5.78544"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.14258 11.6348H5.78544"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.67871 7.77783H9.32157"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.2139 7.77783H12.8567"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.67871 11.6348H9.32157"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_296_8804">
                        <rect
                          width="18"
                          height="18"
                          fill={theme.strokeColor2}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </p>
              {showFilterModal && (
                <Transition
                  show={showFilterModal}
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div
                    className="absolute left-0 top-[2rem] z-[2] mx-auto mt-2 w-fit rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:left-[2rem]"
                    ref={wrapperRef}
                  >
                    <DateRangePicker
                      ranges={[
                        {
                          startDate: dateRange?.startDate
                            ? dateRange?.startDate
                            : new Date(),
                          endDate: dateRange?.endDate
                            ? dateRange?.endDate
                            : new Date(),
                          key: "selection",
                        },
                      ]}
                      onChange={handleMoodRecordDateChange}
                      maxDate={new Date()}
                    />
                  </div>
                </Transition>
              )}

              <div className="relative mb-8 flex h-auto w-full items-center justify-center rounded-2xl border px-3 shadow-lg lg:mb-0 lg:h-[30rem]  lg:rounded-[3rem] lg:pb-8 ">
                <div className="relative flex w-full items-center justify-center ">
                  {/* <ShuruCircle /> */}
                  <TextCircle userMoodRecords={userMoodRecords} />
                </div>
              </div>
            </div>
          </div>

          <div className=" hidden h-full w-full flex-col gap-2   lg:mt-0 lg:flex">
            <div className="relative flex h-full w-full flex-col justify-center gap-y-4 rounded-[3rem] text-center lg:gap-y-8">
              <p
                className={`${theme.shoorah_text_5} P22Mackinac flex items-center justify-start text-center  text-2xl lg:justify-center lg:text-3xl`}
              >
                Mood Record
                <div
                  onClick={() => setShowFilterModal((state) => !state)}
                  className={`cursor-pointer rounded-3xl border ${theme.shoorah_border_5} fade-in-image   mx-3 border-2  px-2 py-2 `}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_296_8804)">
                      <path
                        d="M6.11133 0.964355V4.22902"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11.8799 0.964355V4.22902"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                      />
                      <path
                        d="M1.40371 13.5318C1.61115 15.3824 3.11535 16.8518 4.97542 16.9414C6.26107 17.0033 7.57442 17.0354 8.99981 17.0354C10.4252 17.0354 11.7385 17.0033 13.0242 16.9414C14.8842 16.8518 16.3885 15.3824 16.5959 13.5318C16.7357 12.2855 16.8502 11.0078 16.8502 9.70621C16.8502 8.40463 16.7357 7.12691 16.5959 5.88064C16.3885 4.03001 14.8842 2.56063 13.0242 2.47105C11.7386 2.40913 10.4252 2.37695 8.99981 2.37695C7.57442 2.37695 6.26107 2.40913 4.97542 2.47105C3.11535 2.56063 1.61115 4.03001 1.40371 5.88064C1.26402 7.12691 1.14941 8.40463 1.14941 9.70621C1.14941 11.0078 1.26402 12.2855 1.40371 13.5318Z"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                      />
                      <path
                        d="M5.14258 7.77783H5.78544"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.14258 11.6348H5.78544"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.67871 7.77783H9.32157"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.2139 7.77783H12.8567"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.67871 11.6348H9.32157"
                        stroke={theme.strokeColor2}
                        strokeWidth="1.28571"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_296_8804">
                        <rect
                          width="18"
                          height="18"
                          fill={theme.strokeColor2}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </p>
              {showFilterModal && (
                <Transition
                  show={showFilterModal}
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div
                    className="absolute left-[2rem] top-[2rem] z-[2] mx-auto mt-2 w-fit rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    ref={wrapperRef}
                  >
                    <DateRangePicker
                      ranges={[
                        {
                          startDate: dateRange?.startDate
                            ? dateRange?.startDate
                            : new Date(),
                          endDate: dateRange?.endDate
                            ? dateRange?.endDate
                            : new Date(),
                          key: "selection",
                        },
                      ]}
                      onChange={handleMoodRecordDateChange}
                      maxDate={new Date()}
                    />
                  </div>
                </Transition>
              )}

              <div className="relative flex h-auto w-full flex-grow items-center justify-center rounded-[3rem] border px-3 pb-8  shadow-lg lg:h-[30rem] ">
                <div className="relative flex w-full items-center justify-center ">
                  <ShuruCircle />
                  <TextCircle userMoodRecords={userMoodRecords} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmPopup
        open={show}
        setOpen={setShow}
        message={"Are you sure you want to leave Shuru ?"}
        setAccepted={(e) => history.push("/home")}
        handleNo={() => {
          setShow(false);
        }}
      />

      <DownloadShuruReport open={downloadReport} setOpen={setReport} />
    </div>
  );
};

export default ShuruProfile;
