import React, { useState } from "react";
import Header from "../../header";
import { useTheme } from "../../../context/themeContext";
import ProfessionalMoodsHome from "./professionalMoods";
import Moods from "./moods";
import downloadBtn from "../../../../assets/svg/downloadSvg.svg";
import DownloadMoodReport from "./downloadMoodReport";
import { Api } from "../../../../api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const MoodsHome = () => {
  const { theme } = useTheme();
  const [tab, setTab] = useState(0);
  const [showMoodDownload, setShowMoodDownload] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    Api.getCurrentPlan().then((res) => {
      if (res.data.meta.code == 1) {
        if (res?.data?.data?.accountType != "SUBSCRIBED") {
          history.replace("/subscription");
        } else {
          setShowMoodDownload(true);
        }
      }
    });
  };

  return (
    <div className="mx-auto w-screen overflow-x-hidden  px-4 xl:px-0">
      <div className="flex relative justify-center">
        <Header
          title={`Moods & Emotions`}
          backUrl={`/home`}
          downloadMood={true}
          goBack={true}
          hide={true}
          home={true}
        />
        <button
          onClick={handleClick}
          className=" ease z-10  absolute right-[-2px] top-1 md:right-4 md:top-4 my-[1rem] h-[1.5rem] w-[1.5rem] sm:h-[2rem] sm:w-[4rem] outline-none duration-500 hover:translate-x-1  hover:scale-110 xl:right-[4rem] xl:top-[1rem]"
        >
          <img src={downloadBtn} className="h-full w-full" />
        </button>
      </div>

      <div className="flex w-full mt-[1.5rem] md:mt-[2rem] justify-center">
        <div className=" flex w-full items-center justify-center gap-4 xl:gap-[5rem]">
          <div
            onClick={() => setTab(0)}
            className={
              tab == 0
                ? `rounded-[3rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-xl ${theme.shoorah_bg_1}  flex  items-center justify-center py-3  px-8 md:px-12 lg:px-16 ${theme.shoorah_text_5} P22Mackinac ease cursor-pointer duration-1000`
                : `rounded-[3rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-xl ${theme.inactiveToggleText} P22Mackinac ease flex  cursor-pointer  items-center justify-center py-3 duration-1000 py-3 px-8 md:px-12 lg:px-16`
            }
          >
            <span className="hidden xl:block">Personal Moods</span>
            <span className="block xl:hidden">Personal</span>
          </div>
          <div
            onClick={() => setTab(1)}
            className={
              tab == 1
                ? `rounded-[3rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-xl ${theme.shoorah_bg_1}  flex  items-center justify-center py-3  px-8 md:px-12 lg:px-16 ${theme.shoorah_text_5} P22Mackinac ease cursor-pointer duration-1000`
                : `rounded-[3rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-xl ${theme.inactiveToggleText} P22Mackinac ease flex  cursor-pointer  items-center justify-center py-3 duration-1000 py-3 px-8 md:px-12 lg:px-16`
            }
          >
            <span className="hidden xl:block">Professional Moods</span>
            <span className="block xl:hidden">Professional</span>
          </div>
        </div>
      </div>

      {tab == 0 ?
        <Moods />
        : <ProfessionalMoodsHome />}
      <DownloadMoodReport
        open={showMoodDownload}
        setOpen={setShowMoodDownload}
      />
    </div>
  );
};

export default MoodsHome;
