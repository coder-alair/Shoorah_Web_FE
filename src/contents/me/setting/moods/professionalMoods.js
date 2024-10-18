import React, { Fragment, useEffect, useRef, useState } from "react";
import Header from "../../header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../../assets/css/calender.css";
import GraphContainer from "./graph";
import { Api } from "../../../../api";
import Loader from "../../../../component/common/Loader";
import DownloadMoodReport from "./downloadMoodReport";
import { useTheme } from "../../../context/themeContext";
import downloadBtn from "../../../../assets/svg/downloadSvg.svg";
import { useOutsideClick } from "../../../../utils/helper";
import { Dialog, Transition } from "@headlessui/react";

const weeklydata = [
  {
    name: "1",
    uv: 1,
    pv: 2,
    amt: 2,
  },
  {
    name: "2",
    uv: 2,
    pv: 0,
    amt: 4,
  },
  {
    name: "3",
    uv: 1,
    pv: 0,
    amt: 6,
  },
  {
    name: "4",
    uv: 0,
    pv: 0,
    amt: 8,
  },
  {
    name: "5",
    uv: 0,
    pv: 0,
    amt: 10,
  },
  {
    name: "6",
    uv: 1,
    pv: 0,
    amt: 12,
  },
  {
    name: "7",
    uv: 2,
    pv: 0,
    amt: 14,
  },
];

const monthlyData = [
  {
    name: "1",
    uv: 0,
    pv: 0,
    amt: 2,
  },
  {
    name: "2",
    uv: 0,
    pv: 0,
    amt: 4,
  },
  {
    name: "3",
    uv: 1,
    pv: 0,
    amt: 6,
  },
  {
    name: "4",
    uv: 0,
    pv: 1,
    amt: 8,
  },
  {
    name: "5",
    uv: 0,
    pv: 1,
    amt: 10,
  },
  {
    name: "6",
    uv: 1,
    pv: 0,
    amt: 12,
  },
  {
    name: "7",
    uv: 0,
    pv: 0,
    amt: 14,
  },
];

const yearlyData = [
  {
    name: "1",
    uv: 1,
    pv: 2,
    amt: 2,
  },
  {
    name: "2",
    uv: 2,
    pv: 0,
    amt: 4,
  },
  {
    name: "3",
    uv: 1,
    pv: 0,
    amt: 6,
  },
];

const tabs = [
  {
    id: 1,
    name: "daily",
    value: "Daily",
    data: null,
  },
  {
    id: 2,
    name: "weekly",
    value: "Weekly",
    data: weeklydata,
  },
  {
    id: 3,
    name: "monthly",
    value: "Monthly",
    data: monthlyData,
  },
  {
    id: 4,
    name: "yearly",
    value: "Yearly",
    data: yearlyData,
  },
];

const options = [
  {
    id: 1,
    heading: "job Satisfaction",
    positive: "Very Satisfied",
    negative: "Dissatisfaction",
    negativeDbName: "dissatisfaction",
    positiveDbName: "verySatisfied",
    negativeValues: "dissatisfaction",
    positiveValues: "very_satisfied",
  },
  {
    id: 2,
    heading: "Working Enviroment",
    positive: "Positive",
    negative: "Unpleasant",
    negativeDbName: "unpleasant",
    positiveDbName: "positive",
    negativeValues: "unpleasant",
    positiveValues: "positive",
  },
  {
    id: 3,
    heading: "Work Load",
    positive: "Comfortable",
    negative: "Overwhelming",
    negativeDbName: "overwhelming",
    positiveDbName: "comfortable",
    negativeValues: "overwhelming",
    positiveValues: "comfortable",
  },
  {
    id: 4,
    heading: "Line Manager Relationship",
    positive: "Supportive",
    negative: "Poor",
    negativeDbName: "poor",
    positiveDbName: "supportive",
    negativeValues: "poor",
    positiveValues: "supportive",
  },
  {
    id: 5,
    heading: "Working Hours",
    positive: "Manageable",
    negative: "Unmanageable",
    negativeDbName: "unmanageable",
    positiveDbName: "manageable",
    negativeValues: "unmanageable",
    positiveValues: "manageable",
  },
  {
    id: 6,
    heading: "Mental Health Support",
    positive: "Excellent",
    negative: "Lacking",
    negativeDbName: "lacking",
    positiveDbName: "excellent",
    negativeValues: "lacking",
    positiveValues: "excellent",
  },
  {
    id: 7,
    heading: "Company Culture",
    positive: "Inclusive",
    negative: "Negative",
    negativeDbName: "negative",
    positiveDbName: "inclusive",
    negativeValues: "negative",
    positiveValues: "inclusive",
  },
  {
    id: 8,
    heading: "Feeling Supported",
    positive: "Highly Supported",
    negative: "Unsupported",
    negativeDbName: "unsupported",
    positiveDbName: "highlySupported",
    negativeValues: "unsupported",
    positiveValues: "highly_supported",
  },
  {
    id: 9,
    heading: "Having Tools For Job",
    positive: "Well Equipped",
    negative: "Insufficient",
    negativeDbName: "insufficient",
    positiveDbName: "wellEquipped",
    negativeValues: "insufficient",
    positiveValues: "well_equipped",
  },
  {
    id: 10,
    heading: "Ongoing Training",
    positive: "Comprehensive",
    negative: "Inadequate",
    negativeDbName: "inadequate",
    positiveDbName: "comprehensive",
    negativeValues: "inadequate",
    positiveValues: "comprehensive",
  },
];

const ProfessionalMoodsHome = () => {
  const [tab, setTab] = useState(tabs[0]);
  const [show, setShow] = useState(false);
  const [showMoodDownload, setShowMoodDownload] = useState(false);
  const [loader, setLoader] = useState(false);
  const { theme } = useTheme();
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectOption, setSelectOption] = useState(options[0]);
  const [moodData, setMoodData] = useState({});
  const [avgMood, setAvgMood] = useState({});
  const [chartData, setChartData] = useState([]);

  const ref = useRef();

  const handleClick = (i) => {
    setShow(!show);
    setSelectOption(i);
  };

  const getMoodData = () => {
    if (startDate && tab.id == 1) {
      setLoader(true);
      Api.getProfessionalMoodData(tab.id, startDate)
        .then((res) => {
          if (res.data.meta.code == 1) {
            if (tab.id == 1) {
              setMoodData(res.data.data.moodCount);
              setAvgMood(res.data.data.averageMoodPercentage);
              setLoader(false);
            } else {
              setLoader(false);

              console.log(res.data.data);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
    if (tab.id != 1) {
      setLoader(true);

      Api.getProfessionalMoodData(tab.id)
        .then((res) => {
          if (res?.data?.meta?.code == 1) {
            setChartData(res.data.data.moodData);
            setLoader(false);
            setMoodData(res.data.data.moodCount);
            setAvgMood(res.data.data.averageMoodPercentage);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  };

  const handleChange = (e) => {
    const date = new Date(e); // Convert the input to a Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    setStartDate(formattedDate);
  };

  useEffect(() => {
    getMoodData();
  }, [startDate, tab.id]);

  useOutsideClick(ref, () => {
    setShow(!show);
  });

  return (
    <div className="mx-auto w-full">
      {loader && <Loader />}
      <div className="mt-[2rem] flex flex-wrap items-center justify-center lg:mt-[3rem] xl:gap-10">
        <div className="flex w-full flex-col justify-center gap-6 xl:w-[35rem] xl:gap-12">
          <div className="flex w-full justify-around ">
            {tabs.map((i) => (
              <button
                key={i.id}
                onClick={() => setTab(i)}
                className={`${
                  tab.id == i.id &&
                  `border ${theme.shoorah_text_5} ${theme.shoorah_bg_1}`
                } ease w-1/4 rounded-[3rem] py-2 outline-none duration-300 xl:w-auto xl:px-10`}
              >
                {i.value}
              </button>
            ))}
          </div>
          {tab.id == 1 && (
            <div
              className={`mx-auto overflow-hidden  rounded-[3rem] ${theme.name} h-full w-full xl:w-[35rem]`}
            >
              <Calendar
                maxDate={new Date()}
                onChange={handleChange}
                className={`calendar text-sm sm:text-xl`}
                nextLabel={
                  <button className="custom-next-button">
                    <svg
                      width="16"
                      className=""
                      height="16"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.375 0.75C1.375 0.75 6.625 3.858 6.625 6C6.625 8.14125 1.375 11.25 1.375 11.25"
                        stroke={theme.strokeColor}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                }
                demotivated
                prevLabel={
                  <button className="custom-prev-button">
                    <svg
                      width="16"
                      className="rotate-180"
                      height="16"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.375 0.75C1.375 0.75 6.625 3.858 6.625 6C6.625 8.14125 1.375 11.25 1.375 11.25"
                        stroke={theme.strokeColor}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                }
                defaultValue={new Date()}
                navigationLabel={({ date }) => (
                  <button
                    onClick={() => console.log("hello")}
                    style={{
                      cursor: "default !important",
                      pointerEvents: "none !important",
                    }}
                  >
                    {date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </button>
                )}
              />
            </div>
          )}
          {tab.id != 1 && (
            <div className="mx-auto h-full w-full overflow-hidden rounded-[3rem]">
              <GraphContainer
                data={chartData}
                twoKey={`${selectOption.negativeDbName}`}
                oneKey={`${selectOption.positiveDbName}`}
              />
            </div>
          )}
        </div>
        <div className="mt-[3rem] flex w-full flex-col items-center justify-evenly gap-3 py-4 xl:w-[35rem]">
          {/* <button
            onClick={() => setShowMoodDownload(true)}
            className=" ease  absolute right-4 top-4 my-[1rem] h-[2rem] w-[4rem] outline-none duration-500 hover:translate-x-1  hover:scale-110 xl:right-[4rem] xl:top-[1rem]"
          >
            <img src={downloadBtn} className="h-full w-full" />
          </button> */}

          <div
            onClick={() => setShow(!show)}
            className="relative flex w-full cursor-pointer justify-between rounded-3xl border px-4 py-3 xl:w-[35rem]"
          >
            <div className=" flex items-center justify-center gap-3 pl-[1rem]">
              {selectOption && (
                <Fragment>
                  <div className="h-3 w-3 rounded-full bg-[red]"></div>
                  <p>{selectOption.negative}</p>
                  <p>-</p>
                  <div className="h-3 w-3 rounded-full bg-[green]"></div>
                  <p>{selectOption.positive}</p>
                </Fragment>
              )}
            </div>
            <p className="flex items-center justify-center">
              <svg
                width="16"
                className="rotate-90"
                height="16"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.375 0.75C1.375 0.75 6.625 3.858 6.625 6C6.625 8.14125 1.375 11.25 1.375 11.25"
                  stroke={`#000`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            <Transition.Root appear show={show} as={Fragment}>
              <div className="absolute left-0 top-0 z-20">
                <div className="flex min-h-full  justify-center  text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-100"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-100"
                  >
                    <div
                      ref={ref}
                      className="relative transform rounded-3xl transition-all  "
                    >
                      <div
                        className={`absolute left-0 top-0 z-10 h-fit w-[95vw] rounded-3xl bg-[black] py-2 xl:w-[35rem]`}
                      >
                        <div className="relative flex w-full flex-col rounded-3xl px-4 text-sm lg:text-base">
                          {options.map((i) => (
                            <div
                              key={i.id}
                              onClick={() => handleClick(i)}
                              className="flex items-center rounded-3xl p-[1.2rem] text-white"
                            >
                              <div
                                className={`border-gray flex h-5 w-5 items-center justify-center rounded-full border bg-transparent xl:mr-[3rem]`}
                              >
                                {selectOption.id == i.id && (
                                  <div
                                    className={`h-4 w-4 rounded-full border bg-white`}
                                  ></div>
                                )}
                              </div>

                              <p className="flex items-center justify-center gap-3 px-3">
                                <div className="h-3 w-3 rounded-full bg-[red]"></div>
                                <span className="lg:xl:w-[8rem]">
                                  {i.negative}
                                </span>
                              </p>
                              <p className="lg:w-[3rem]">-</p>
                              <p className="flex items-center justify-center gap-3 px-3">
                                <div className="h-3 w-3 rounded-full bg-[green]"></div>
                                <span className="xl:w-[8rem]">
                                  {i.positive}
                                </span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </div>
            </Transition.Root>
          </div>
          <DownloadMoodReport
            open={showMoodDownload}
            setOpen={setShowMoodDownload}
          />

          <div className="flex h-auto w-full flex-col gap-4 rounded-3xl border py-2 xl:h-[20rem] xl:w-[35rem]">
            <p className="P22Mackinac mt-3 px-6 text-lg xl:text-2xl">
              Moods Frequency &nbsp;-{" "}
              <span className="P22Mackinac text-base xl:text-xl">
                {selectOption.heading}
              </span>{" "}
            </p>
            <div className="flex flex-row gap-3 sm:gap-0 flex-wrap px-6">
              <div className="flex flex-col gap-3">
                <p className="P22Mackinac w-[15rem] text-left">
                  {selectOption.negative}
                </p>
                <p className="P22Mackinac text-left text-2xl text-[red]">
                  {moodData?.[`${selectOption.negativeDbName}`] || 0}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="P22Mackinac text-left">{selectOption.positive}</p>
                <p className="P22Mackinac text-left text-2xl text-[green]">
                  {moodData?.[`${selectOption.positiveDbName}`] || 0}
                </p>
              </div>
            </div>
            <hr className="mx-auto w-[32rem]" />
            <p className="P22Mackinac px-6 text-lg xl:text-2xl">
              Moods Average
            </p>
            <div className="flex flex-row gap-3 sm:gap-0 flex-wrap px-6">
              <div className="flex flex-col gap-3">
                <p className="P22Mackinac w-[15rem] text-left">
                  {selectOption.negative}
                </p>
                <p className="P22Mackinac text-left text-2xl text-[red]">
                  {avgMood?.[`${selectOption.negativeDbName}`] || 0} %
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="P22Mackinac text-left">{selectOption.positive}</p>
                <p className="P22Mackinac text-left text-2xl text-[green]">
                  {avgMood?.[`${selectOption.positiveDbName}`] || 0} %
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalMoodsHome;
