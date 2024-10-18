import React, { useEffect, useState } from "react";
import PersonalMood from "./PersonalMood";
import Text from "../reusable/text";
import ContainerData from "../reusable/ContainerData";
import GoalsCarsouel from "./goalsCarsouel";
import MyBadges from "./myBadges";
import SOSButton from "./sos";
import Setting from "./setting";
import ProfessionalMood from "./ProfessionalMood";
import Header from "./header";
import FocusModal from "./focusModals";
import AffirFocusModal from "./affirmationFocus";
import { errorToast, getLocalStorageItem } from "../../utils/helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";
import { Api } from "../../api";
import { useAudio } from "../context/audiobar";

const Me = () => {
  const [tab, setTab] = useState(0);
  const { theme } = useTheme();
  const [focusModal, setFocusModal] = useState(false);
  const [affirFocusModal, setAffirFocusModal] = useState(false);
  const history = useHistory();
  const [personalMood, setPersonalMood] = useState({});
  const [professionalMood, setProfessionalMood] = useState({});
  const [focusData, setFocusData] = useState([]);
  const [affirmationfocusData, setAffirmationFocusData] = useState([]);
  const [myFocus, setMyFocus] = useState([]);
  const [myAffirmationFocus, setMyAffirmationFocus] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const { audioNav } = useAudio();

  const getTodayMood = () => {
    Api.getTodayMood()
      .then((res) => {
        if (res.data.meta.code == 1) {
          setPersonalMood(res.data.data);
        } else {
          errorToast(res.data.meta.message);
        }
      })
      .catch((err) => console.log(err));

    Api.getTodayProfessionalMood()
      .then((res) => {
        if (res.data.meta.code == 1) {
          setProfessionalMood(res.data.data);
        } else {
          errorToast(res.data.meta.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const getFocuses = () => {
    Api.getMyFocuses(1).then((res) => {
      if (res.data.meta.code == 1) {
        setFocusData(res.data.data);
      } else {
        errorToast(res.data.meta.message);
      }
    });
  };
  const getAffirmationFocuses = () => {
    Api.getMyFocuses(2).then((res) => {
      if (res.data.meta.code == 1) {
        setAffirmationFocusData(res.data.data);
      } else {
        errorToast(res.data.meta.message);
      }
    });
  };

  useEffect(() => {
    getTodayMood();
    getFocuses();
    getAffirmationFocuses();
  }, [refresh]);

  useEffect(() => {
    let myfocus = [];
    focusData.forEach((e) => {
      if (e.isSaved) {
        myfocus.push(e);
      }
    });
    setMyFocus(myfocus);
  }, [focusData]);

  useEffect(() => {
    let myaffirmationfocus = [];
    affirmationfocusData.forEach((e) => {
      if (e.isSaved) {
        myaffirmationfocus.push(e);
      }
    });
    setMyAffirmationFocus(myaffirmationfocus);
  }, [affirmationfocusData]);

  useEffect(() => {
    if (!getLocalStorageItem("token") && !getLocalStorageItem("userData")) {
      history.push("/login");
    }
  }, []);

  return (
    <div className={`${audioNav && `mb-[5rem]`}`}>
      <div className="mx-auto w-full">
        <div className="flex justify-center">
          <Header
            title={`Me`}
            goBack={true}
            backUrl={`/home`}
            logout={false}
            hide={false}
            home={true}
          />
        </div>
        <div className="relative flex  w-full flex-col items-center justify-center">
          <div className=" mb-8 mt-8 md:my-10 w-[80vw] text-center">
            <p className=" P22Mackinac text-sm xl:text-2xl">
              ME is all about you, your feelings and your emotions, slide the
              bars below to how you are feeling. You can do this as many times
              as you need to and any time throughout the day.
            </p>
          </div>

          <div className=" mb-4 md:mt-4 flex w-full items-center gap-[1rem] justify-center md:px-4 xl:my-[2.5rem] xl:w-auto xl:gap-[5rem] xl:px-0">
            <div
              onClick={() => setTab(0)}
              className={
                tab == 0
                  ? `rounded-[3rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-xl ${theme.shoorah_bg_1}  flex  items-center justify-center py-3  px-8 md:px-12 lg:px-16 ${theme.shoorah_text_5} P22Mackinac ease cursor-pointer duration-1000`
                  : `rounded-[3rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-xl ${theme.inactiveToggleText} P22Mackinac ease flex  cursor-pointer  items-center justify-center py-3 duration-1000 py-3 px-8 md:px-12 lg:px-16`
              }
            >
              Personal
            </div>
            <div
              onClick={() => setTab(1)}
              className={
                tab == 1
                  ? `rounded-[3rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-xl ${theme.shoorah_bg_1}  flex items-center justify-center py-3  py-3 px-4 md:px-12 lg:px-16 ${theme.shoorah_text_5} P22Mackinac ease cursor-pointer duration-1000`
                  : `rounded-[3rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-xl ${theme.inactiveToggleText} P22Mackinac ease flex  cursor-pointer  items-center justify-center py-3 duration-1000 py-3 px-4 md:px-12 lg:px-16`
              }
            >
              Professional
            </div>
          </div>
          <div className="lg:mt-[2rem]"></div>

          {tab == 0 ? (
            <PersonalMood data={personalMood} title={`Moods & Emotions`}/>
          ) : (
            <ProfessionalMood data={professionalMood} />
          )}
          <div className="mt-8 lg:hidden"></div>

          <FocusModal
            open={focusModal}
            refresh={refresh}
            setRefresh={setRefresh}
            setOpen={setFocusModal}
            myFocus={myFocus}
            setMyfocus={setMyFocus}
            focusData={focusData}
          />
          <AffirFocusModal
            open={affirFocusModal}
            refresh={refresh}
            setRefresh={setRefresh}
            setOpen={setAffirFocusModal}
            myAffirmationFocus={myAffirmationFocus}
            setMyAffirmationFocus={setMyAffirmationFocus}
            focusData={affirmationfocusData}
          />

          <ContainerData
            title={`Your Focuses`}
            buttonClick={() => setFocusModal(true)}
            data={myFocus}
            type={"focusName"}
          />
          <ContainerData
            title={`Your Affirmation Focuses`}
            buttonClick={() => setAffirFocusModal(true)}
            data={myAffirmationFocus}
            type={"focusName"}
          />
          <GoalsCarsouel />
          <MyBadges />
          <SOSButton />
          <Setting />
        </div>
      </div>
    </div>
  );
};

export default Me;
