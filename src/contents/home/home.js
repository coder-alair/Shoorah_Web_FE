import React, { useEffect, useState } from "react";
import Navbar from "../layout/navbar";
import Hero from "../layout/hero";
import SideMenu from "../layout/sideMenu";
import Trending from "./trending";
import Gratitude from "./gratitude";
import ChatbotSection from "./chatbotSection";
import DailyRituals from "./dailyRituals";
import Bookmarks from "./bookmarks";
import {
  errorToast,
  getLocalStorageItem,
  successToast,
} from "../../utils/helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Api } from "../../api";
import SoundBar from "../reusable/soundBar";
import { useAudio } from "../context/audiobar";
import { useTheme } from "../context/themeContext";
import BadgesHomeSection from "./badges";
import anxious from "../../assets/svg/moods/anxious.svg";
import calm from "../../assets/svg/moods/calm.svg";
import RangeSlider from "../reusable/rangeSlider";
import ScrollToTop from "../../component/common/ScrollToTop";
import { useAuth } from "../context/user";

const Home = () => {
  const history = useHistory();
  const [refresh, setRefresh] = useState(false);
  const { user } = useAuth();
  const { audioNav } = useAudio();
  const { theme } = useTheme();
  const [Sad, setSad] = useState(0);
  const [Happy, setHappy] = useState(0);
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    if (!getLocalStorageItem("token") && !getLocalStorageItem("userData")) {
      history.push("/login");
    }
    if (getLocalStorageItem("token") && getLocalStorageItem("userData")) {
      history.push("/home");
    }
  }, []);

  useEffect(() => {
    getTodayMood();
  }, []);

  const getTodayMood = () => {
    Api.getTodayMood()
      .then((res) => {
        if (res.data.meta.code == 1) {
          // console.log(res.data.data);
          setHappy(res?.data?.data?.great);
          setSad(res?.data?.data?.notGood);
        } else {
          errorToast(res.data.meta.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleHappyChange = (newValue) => {
    if (newValue < 0) {
      setSad(Math.abs(newValue));
      setHappy(0);
    } else {
      setHappy(newValue);
      setSad(0);
    }
  };

  const handleHappySubmit = () => {
    const payload = {
      great: Happy,
      notGood: Sad,
      demotivated: 0,
      motivated: 0,
      low: 0,
      content: 0,
      angry: 0,
      happy: 0,
      needSupport: 0,
      iCanManage: 0,
      helpless: 0,
      iAmInControl: 0,
      tired: 0,
      energised: 0,
      stressed: 0,
      balanced: 0,
      anxious: 0,
      calm: 0,
      sad: 0,
      relaxed: 0,
    };
    setLoader(true);
    Api.addEditMood(payload)
      .then((res) => {
        if (res?.data?.meta?.code == 1) {
          setLoader(false);
          successToast(res.data.meta.message);
        } else if (res.data.code == 400) {
          setLoader(false);
          errorToast(`Mood Values Required`);
        } else {
          setLoader(false);
          errorToast(res?.data?.meta?.message);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  return (
    <div
      id="topbar"
      className={`${audioNav ? `mb-[3.5rem]` : ``
        }  relative flex w-[100%] flex-col overflow-hidden pb-[13vh] lg:mb-8 lg:pb-0 xl:mb-0`}
    >
      <Navbar refresh={refresh} setRefresh={setRefresh} />
      <Hero refresh={refresh} setRefresh={setRefresh} />
      <SideMenu refresh={refresh} setRefresh={setRefresh} />
      <Trending refresh={refresh} setRefresh={setRefresh} />
      <Gratitude refresh={refresh} setRefresh={setRefresh} />

      {(user?.shuruUsage == true|| !user?.companyId) ?
        <ChatbotSection refresh={refresh} shuruUsage={user?.shuruUsage || true} setRefresh={setRefresh} />
        : 
        null}
      <div className=" mb-[2rem] mt-[3.5rem] flex flex-col items-center justify-center xl:mb-0">
        <h1 className=" P22Mackinac my-2 w-full px-4 text-left text-2xl font-medium xl:px-0 xl:text-center xl:text-4xl">
          How do you feel right now?
        </h1>
        <RangeSlider
          negativeImage={anxious}
          positiveImage={calm}
          defaultPositive={Happy}
          defaultNegative={Sad}
          onValueChange={handleHappyChange}
          positive={`Great`}
          negative={`Not Good`}
          isCustomStyling
        />
        <div className="flex w-full items-center justify-center gap-4 px-4 xl:w-auto xl:px-0">
          <button
            onClick={() => {
              window?.scrollTo(0, 0);
              history.push("/me");
            }}
            name="submit"
            className={`w-1/2   whitespace-nowrap border border-transparent ${theme.shoorah_bg_5} P22Mackinac rounded-[3rem] py-2 text-base font-medium text-white shadow-sm sm:py-5 lg:text-lg xl:px-[5rem] xl:text-2xl ${theme.shoorah_bg_hover_6} focus:outline-none focus:ring-2 ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
          >
            Track More
          </button>
          <button
            type="submit"
            onClick={handleHappySubmit}
            name="submit"
            className={`w-1/2   border border-transparent ${theme.shoorah_bg_5} P22Mackinac rounded-[3rem] py-2 text-base font-medium text-white shadow-sm sm:py-5 lg:text-lg xl:px-[5rem] xl:text-2xl ${theme.shoorah_bg_hover_6} focus:outline-none focus:ring-2 ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
          >
            Submit
          </button>
        </div>
      </div>
      <DailyRituals refresh={refresh} setRefresh={setRefresh} />
      <BadgesHomeSection />
      <Bookmarks refresh={refresh} setRefresh={setRefresh} />

      <ScrollToTop />
    </div>
  );
};

export default Home;
