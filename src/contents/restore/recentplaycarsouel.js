import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Api } from "../../api";
import { errorToast } from "../../utils/helper";
import "react-multi-carousel/lib/styles.css";
import SoundCard from "../reusable/soundCard";
import Loader from "../../component/common/Loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReusableCarsouel from "../reusable/carsouel";
import { useTheme } from "../context/themeContext";
import NewCarousel from "../reusable/newCarsouel";

const RecentPlayCarsouel = ({ type, data, heading, viewMore, url }) => {
  const history = useHistory();
  const { theme } = useTheme();
  if (!data?.length) {
    return "";
  }
  return (
    <div className="mb-16 h-[100%] w-[100%] xl:mb-[2rem] ">
      {data.length ? (
        <Fragment>
          <div className=" mx-auto flex w-full justify-between px-2 xl:w-[85%] ">
            <p className="P22Mackinac text-xl xl:text-3xl">{heading}</p>

            {viewMore && (
              <p
                onClick={() => history.push(`/${url}`)}
                className={`P22Mackinac cursor-pointer text-base lg:text-lg ${theme.shoorah_text_5}`}
              >
                View More
              </p>
            )}
          </div>

          <div className=" mx-auto  flex h-auto w-full items-center justify-center xl:mt-[2rem]  xl:h-[20rem] xl:w-[95%]">
            {data.length > 0 && (
              <NewCarousel type={type} data={data} left={true} />
            )}
            {data.length == 0 && (
              <p className="text-2xl">No {heading} This Month</p>
            )}
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

export default RecentPlayCarsouel;
