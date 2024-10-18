import React, { useEffect, useState } from "react";

import { Api } from "../../api";
import { errorToast, successToast } from "../../utils/helper";
import Loader from "../../component/common/Loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";
import Carousel from "react-elastic-carousel";

const GoalsCarsouel = () => {
  const [goals, setGoals] = useState([]);
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const { theme } = useTheme();
  const [refresh, setRefresh] = useState(0);
  const settings = {
    infinite: false,
    speed: 500,
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 810,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
  ];

  useEffect(() => {
    getGoals();
  }, [refresh]);

  const getGoals = () => {
    Api.getGoals(1, 50, false)
      .then((res) => {
        if (res?.data?.meta?.code === 9) {
          setLoader(false);
          errorToast(res.data.meta.message);
        } else {
          let sorting = res.data.data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
          );
          setGoals(sorting);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
      });
  };

  const handleChange = (i) => {
    setLoader(true);
    const payload = {
      goalId: i.goalId,
      title: i.title,
      description: i.description,
      isSaved: true,
      isCompleted: true,
      isImageDeleted: false,
    };

    Api.addGoal(payload).then((res) => {
      if (res.status == 200) {
        if (res?.data?.meta?.code == 1) {
          setLoader(false);
          successToast(res?.data?.meta?.message);
          setRefresh(refresh + 1);
        } else {
          setLoader(false);
          errorToast(res?.data?.meta?.message);
        }
      }
    });
  };

  return (
    <div className={`${goals.length <= 0 && `hidden`} mt-[2rem] md:my-[3rem] w-[100%]`}>
      <div className="mx-auto mb-4 flex w-[90%] justify-between px-5">
        <p className="P22Mackinac text-2xl">Your Goals</p>
        <button
          onClick={() => history.push("/journal/goals")}
          className={` ${theme.shoorah_text_5} P22Mackinac text-lg`}
        >
          View More...
        </button>
      </div>
      {loader && <Loader />}
      {goals.length && (
        <div className="mx-auto h-auto w-[100%] xl:h-[15rem] xl:w-[100%] 2xl:w-[100%]">
          {/* <Carousel breakPoints={breakPoints} pagination={false}> */}
          <div className="scrollbar mx-auto my-3 mt-[2rem]  flex w-[90%] gap-8 overflow-x-scroll px-4">
            {goals.map((i) => (
              <div className="w-full py-3 outline-none" key={i.goalId}>
                <div className=" mx-auto flex h-auto w-full flex-col rounded-2xl border p-5 shadow-lg outline-none xl:w-[28rem] xl:rounded-[3rem]">
                  <div className="flex h-[7rem] w-[15rem] gap-3 xl:ml-[2rem]">
                    {i.imageUrl && (
                      <img
                        src={i.imageUrl}
                        className="h-[100%] w-[100%] cursor-pointer rounded-3xl object-cover object-center"
                      />
                    )}
                    {!i.imageUrl && (
                      <img
                        src={theme.shoorah_hard_gradient}
                        className="h-[100%] w-[100%] cursor-pointer overflow-hidden  rounded-3xl bg-[#6167e7] object-cover object-center"
                      />
                    )}
                    <div className="w-[15rem] self-center">
                      <p className="P22Mackinac cursor-pointer text-lg font-[600] xl:text-xl">
                        {i.title}
                      </p>
                    </div>
                  </div>
                  <div className="relative mt-5 w-full xl:w-[75%]">
                    <div className="flex items-center xl:ml-[2rem]">
                      {i.daysRemaining != 0 && (
                        <p className=" P22Mackinac text-base font-bold xl:text-lg">
                          Time Remaining :{" "}
                          <span className="font-[500]">
                            {i.daysRemaining < 0
                              ? `Expired`
                              : i.daysRemaining + ` Days`}
                          </span>
                        </p>
                      )}
                      {i.daysRemaining == 0 && <p className="mt-5">{null}</p>}
                    </div>
                  </div>
                  <div className="relative mt-5 w-[75%]">
                    <div className="flex items-center xl:ml-[2rem] ">
                      <input
                        id="checked-checkbox"
                        onChange={() => handleChange(i)}
                        type="checkbox"
                        value=""
                        className={`h-4 w-4 cursor-pointer ${theme.shoorah_text_5} rounded border-gray-300 bg-gray-100 ${theme.shoorah_border_ring_focus_5} focus:ring-2 `}
                      />
                      <label
                        htmlFor="checked-checkbox"
                        className="ml-2 cursor-pointer text-sm font-medium text-black"
                      >
                        Completed
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* </Carousel> */}
        </div>
      )}
    </div>
  );
};

export default GoalsCarsouel;
