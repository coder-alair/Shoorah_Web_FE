import React, { useEffect, useState } from "react";
import Navbar from "../layout/navbar";
import Hero from "../reusable/hero";
import SideMenu from "../layout/sideMenu";
import ShuruHome from "./shuruHome/shuruHome";
import ShuruSelection from "./shuruHome/shuruSelection";
import ChatScreen from "./shuruHome/chatScreen";
import { Api } from "../../api";
import { errorToast, getLocalStorageItem } from "../../utils/helper";
import { useAudio } from "../context/audiobar";
import DisclaimerPopUp from "../../component/common/modals/DisclaimerPopUp";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../context/user";

const Shuru = () => {
  const [show, setShow] = useState(false);
  const [tab, setTab] = useState(1);
  const [item, setItem] = useState("content");
  const [moods, setMoods] = useState([]);
  const [currentMood, setCurrentMood] = useState([]);
  const { audioNav } = useAudio();
  const history = useHistory();

  // Discalimer popup states
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const { user, disclaimerAgreed, setDisclaimerAgreed } = useAuth();

  useEffect(() => {
    if ((!user?.shuruUsage && user?.companyId)) {
      history.replace('/home')
    }
  }, [user]);

  useEffect(() => {
    Api.getCurrentPlan().then((res) => {
      if (res.data.meta.code == 1) {
        if (res?.data?.data?.accountType != "SUBSCRIBED") {
          history.replace("/subscription");
        } else {
          if (!disclaimerAgreed) {
            setIsDisclaimerOpen(true);
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    if (window.location.pathname.includes("selection")) {
      setTab(2);
    } else {
      setTab(1);
    }
  }, []);

  useEffect(() => {
    getMood();
  }, []);

  useEffect(() => {
    getCurrentMood();
  }, [item]);

  const getCurrentMood = () => {
    if (moods.length) {
      const current = moods.find((i) => {
        return i.name.toLowerCase() == item.toLowerCase();
      });
      setCurrentMood(current);
    }
  };

  const getMood = () => {
    Api.shuruGetMood()
      .then((res) => {
        setMoods(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!getLocalStorageItem("token") && !getLocalStorageItem("userData")) {
      history.push("/login");
    }
  }, []);

  return (
    <div
      className={`h-screen overflow-y-auto overflow-x-hidden pb-[13vh] lg:pb-0 ${audioNav && `mb-[5rem]`
        }`}
    >
      <Navbar />
      <Hero hideInfo={true} onlyNav={true} planeBg={true} />
      <SideMenu />
      <DisclaimerPopUp
        open={isDisclaimerOpen}
        setOpen={setIsDisclaimerOpen}
        message={"Disclaimer"}
        setAccepted={(e) => setIsDisclaimerOpen(false)}
      />

      {tab == 1 ? (
        <ShuruHome tab={tab} setTab={setTab} />
      ) : tab == 2 ? (
        <ShuruSelection
          item={item}
          setItem={setItem}
          tab={tab}
          setTab={setTab}
        />
      ) : (
        <ChatScreen
          currentMood={currentMood}
          tab={tab}
          item={item}
          setItem={setItem}
        />
      )}
    </div>
  );
};

export default Shuru;
