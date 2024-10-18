import React, { useEffect, useState } from "react";
import { Api } from "../api";
import Loader from "../component/common/Loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../contents/me/header";
import PersonaliseSound from "./personaliseSound";
import PersonaliseTheme from "./personaliseTheme";
import { useTheme } from "../contents/context/themeContext";
import macShoorah from "../assets/themeMac/Shoorah_Macbook_ShoorahTone_v1.1.png";
import { useWebSound } from "../contents/context/webSound";

export default function Personalize() {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [tab, setTab] = useState(0);
  const { theme } = useTheme();
  const {
    setAudio,
    SoundBar,
    audio,
    isPlaying,
    setIsPlaying,
    audioRef,
    onLoadedMetadata,
    currentTrack,
    progressBarRef,
  } = useWebSound();

  return (
    <div
      className={`relative flex h-screen w-screen flex-col overflow-hidden `}
    >
      {loader && <Loader />}

      <img
        src={theme.shoorah_feather_gradient}
        style={{ zIndex: "-2" }}
        className="absolute h-screen w-screen"
      />

      <div className="flex justify-center">
        <Header
          title={`Personalisation`}
          hide={true}
          goBack={true}
          backUrl={"/home"}
          home={true}
        />
      </div>

      <div className="mx-16 mt-4 flex items-center justify-center xl:gap-[5rem]">
        <div
          style={{
            boxShadow: `0 1px 10px 0 rgba(0,0,0,0.2), 0 1px 10px 0 rgba(0,0,0,0.2)`,
          }}
          onClick={() => setTab(0)}
          className={
            tab == 0
              ? `flex  w-1/2 items-center justify-center rounded-3xl bg-[#fff] py-2 shadow-lg lg:w-auto lg:px-16 lg:py-3 ${theme.toggletext} P22Mackinac ease cursor-pointer duration-1000`
              : `P22Mackinac ease flex w-1/2 cursor-pointer items-center justify-center rounded-3xl py-2 text-base text-black !shadow-none duration-1000 lg:w-auto lg:px-16 lg:py-3 lg:text-2xl`
          }
        >
          Sounds
        </div>
        <div
          style={{
            boxShadow: `0 1px 10px 0 rgba(0,0,0,0.2), 0 1px 10px 0 rgba(0,0,0,0.2)`,
          }}
          onClick={() => setTab(1)}
          className={
            tab == 1
              ? `flex   w-1/2 items-center justify-center rounded-3xl bg-[#fff] py-2 lg:w-auto lg:px-16 lg:py-3 ${theme.toggletext} P22Mackinac ease cursor-pointer duration-1000`
              : `P22Mackinac ease flex w-1/2 cursor-pointer items-center justify-center rounded-3xl py-2 text-base text-black !shadow-none duration-1000 lg:w-auto lg:px-16 lg:py-3 lg:text-2xl`
          }
        >
          Theme
        </div>
      </div>

      {tab == 0 ? <PersonaliseSound tab={tab} /> : <PersonaliseTheme />}

      <SoundBar />
    </div>
  );
}
