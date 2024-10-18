import React, { useEffect, useState } from "react";
import RangeSlider from "../reusable/rangeSlider";
import { Api } from "../../api";
import { errorToast, successToast } from "../../utils/helper";
import Loader from "../../component/common/Loader";
import { useTheme } from "../context/themeContext";
import calenderSvg from "../../assets/svg/calenderSvg.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import anxious from "../../assets/svg/moods/anxious.svg";
import calm from "../../assets/svg/moods/calm.svg";
import awesome from "../../assets/svg/moods/awesome.svg";
import needSpace from "../../assets/svg/moods/needSpace.svg";
import notGood from "../../assets/svg/moods/notGood.svg";
import angry from "../../assets/svg/moods/angry.svg";
import balanced from "../../assets/svg/moods/balanced.svg";
import content from "../../assets/svg/moods/content.svg";
import demotivated from "../../assets/svg/moods/demotivated.svg";
import motivated from "../../assets/svg/moods/motivated.svg";
import happy from "../../assets/svg/moods/happy.svg";
import helpless from "../../assets/svg/moods/helpless.svg";
import iCanManage from "../../assets/svg/moods/iCanManage.svg";
import inControl from "../../assets/svg/moods/inControl.svg";
import low from "../../assets/svg/moods/low.svg";
import needSupport from "../../assets/svg/moods/needSupport.svg";
import stressed from "../../assets/svg/moods/stressed.svg";
import relaxed from "../../assets/svg/moods/relaxed.svg";
import sad from "../../assets/svg/moods/sad.svg";
import tired from "../../assets/svg/moods/tired.svg";
import energised from "../../assets/svg/moods/energised.svg";

const PersonalMood = ({ data,title }) => {
  const { theme } = useTheme();
  const history = useHistory();
  const [dateValue, setDateValue] = useState(null);
  const [Motivated, setMotivated] = useState(data?.motivated) || 0;
  const [Demotivated, setDemotivated] = useState(data?.demotivated || 0);
  const [Content, setContent] = useState(data?.content || 0);
  const [Low, setLow] = useState(data?.low || 0);
  const [Happy, setHappy] = useState(data?.happy || 0);
  const [Sad, setSad] = useState(data?.sad || 0);
  const [NeedSupport, setNeedSupport] = useState(data?.need_support || 0);
  const [CanManage, setCanManage] = useState(data?.i_can_manage || 0);
  const [Helpless, setHelpless] = useState(data?.helpless || 0);
  const [Control, setControl] = useState(data?.i_am_in_control || 0);
  const [Tired, setTired] = useState(data?.tired || 0);
  const [Energised, setEnergised] = useState(data?.energised || 0);
  const [Angry, setAngry] = useState(data?.angry || 0);
  const [Calm, setCalm] = useState(data?.calm || 0);
  const [Anxious, setAnxious] = useState(data?.anxious || 0);
  const [Relaxed, setRelaxed] = useState(data?.relaxed || 0);
  const [Stressed, setStressed] = useState(data?.stressed || 0);
  const [Balanced, setBalanced] = useState(data?.balanced || 0);
  const [great, setGreat] = useState(data?.great || 0);
  const [notGood, setNotGood] = useState(data?.notGood || 0);

  const [loader, setLoader] = useState(false);

  const handleMotivatedChange = (newValue) => {
    if (newValue < 0) {
      setDemotivated(Math.abs(newValue));
      setMotivated(0);
    } else {
      setMotivated(newValue);
      setDemotivated(0);
    }
  };

  const handleContentChange = (newValue) => {
    if (newValue < 0) {
      setLow(Math.abs(newValue));
      setContent(0);
    } else {
      setContent(newValue);
      setLow(0);
    }
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

  const handleManageChange = (newValue) => {
    if (newValue < 0) {
      setNeedSupport(Math.abs(newValue));
      setCanManage(0);
    } else {
      setCanManage(newValue);
      setNeedSupport(0);
    }
  };

  const handleHelplessChange = (newValue) => {
    if (newValue < 0) {
      setHelpless(Math.abs(newValue));
      setControl(0);
    } else {
      setControl(newValue);
      setHelpless(0);
    }
  };

  const handleTiredChange = (newValue) => {
    if (newValue < 0) {
      setTired(Math.abs(newValue));
      setEnergised(0);
    } else {
      setEnergised(newValue);
      setTired(0);
    }
  };

  const handleCalm = (newValue) => {
    if (newValue < 0) {
      setAngry(Math.abs(newValue));
      setCalm(0);
    } else {
      setCalm(newValue);
      setAngry(0);
    }
  };

  const handleRelaxed = (newValue) => {
    if (newValue < 0) {
      setAnxious(Math.abs(newValue));
      setRelaxed(0);
    } else {
      setRelaxed(newValue);
      setAnxious(0);
    }
  };

  const handleBalanced = (newValue) => {
    if (newValue < 0) {
      setStressed(Math.abs(newValue));
      setBalanced(0);
    } else {
      setBalanced(newValue);
      setStressed(0);
    }
  };

  const handleGreat = (newValue) => {
    if (newValue < 0) {
      setNotGood(Math.abs(newValue));
      setGreat(0);
    } else {
      setGreat(newValue);
      setNotGood(0);
    }
  };

  const handleSubmit = () => {
    const payload = {
      demotivated: Demotivated,
      motivated: Motivated,
      low: Low,
      content: Content,
      angry: Angry,
      happy: Happy,
      needSupport: NeedSupport,
      iCanManage: CanManage,
      helpless: Helpless,
      iAmInControl: Control,
      tired: Tired,
      energised: Energised,
      stressed: Stressed,
      balanced: Balanced,
      anxious: Anxious,
      calm: Calm,
      sad: Sad,
      relaxed: Relaxed,
      notGood: notGood,
      great: great,
    };
    setLoader(true);
    Api.addEditMood(payload)
      .then((res) => {
        if (res?.data?.meta?.code == 1) {
          setLoader(false);
          successToast(res.data.meta.message);
          window.location.reload();
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
    <div className="flex w-[100%] flex-col items-center overflow-hidden">
      {loader && <Loader />}
      <div
        className={`flex flex-col ${theme.moodBg} h-full w-[330%] items-center justify-center rounded-t-full text-white `}
      >
        <div className="mt-8 flex w-[25%] items-center justify-between py-3 sm:w-[20%] xl:mt-[7rem]">
          <div className=" P22Mackinac mx-auto flex items-center gap-10 text-xl xl:text-3xl">
            {title}
          </div>
          <div
            onClick={() => history.push("/moods")}
            className="fade-in-image cursor-pointer rounded-3xl border border-[#fff] px-2 py-2 hover:scale-110"
          >
            <img
              src={calenderSvg}
              className=" h-3 w-3 xl:h-[1.5rem] xl:w-[1.5rem]"
            />
          </div>
        </div>

        <div className="my-6 flex w-full flex-col items-center justify-center px-4  xl:my-[4rem]">
          <RangeSlider
            negativeImage={demotivated}
            positiveImage={motivated}
            defaultPositive={data.motivated}
            defaultNegative={data.demotivated}
            onValueChange={handleMotivatedChange}
            positive={`Motivated`}
            negative={`Demotivated`}
          />
          <RangeSlider
            negativeImage={low}
            positiveImage={content}
            defaultPositive={data.content}
            defaultNegative={data.low}
            onValueChange={handleContentChange}
            positive={`Content`}
            negative={`Low`}
          />
          <RangeSlider
            negativeImage={sad}
            positiveImage={happy}
            defaultPositive={data.happy}
            defaultNegative={data.sad}
            onValueChange={handleHappyChange}
            positive={`Happy`}
            negative={`Sad`}
          />
          <RangeSlider
            negativeImage={needSupport}
            positiveImage={iCanManage}
            defaultPositive={data.i_can_manage}
            defaultNegative={data.i_need_support}
            onValueChange={handleManageChange}
            positive={`I can manage`}
            negative={`I need support`}
          />
          <RangeSlider
            negativeImage={helpless}
            positiveImage={inControl}
            defaultPositive={data.i_am_in_control}
            defaultNegative={data.helpless}
            onValueChange={handleHelplessChange}
            positive={`I'm in control`}
            negative={`I feel helpless`}
          />
          <RangeSlider
            negativeImage={tired}
            positiveImage={energised}
            defaultPositive={data.energised}
            defaultNegative={data.tired}
            onValueChange={handleTiredChange}
            positive={`Energised`}
            negative={`Tired`}
          />
          <RangeSlider
            negativeImage={angry}
            positiveImage={calm}
            defaultPositive={data.calm}
            defaultNegative={data.angry}
            onValueChange={handleCalm}
            positive={`Calm`}
            negative={`Angry`}
          />
          <RangeSlider
            negativeImage={anxious}
            positiveImage={relaxed}
            defaultPositive={data.relaxed}
            defaultNegative={data.anxious}
            onValueChange={handleRelaxed}
            positive={`Relaxed`}
            negative={`Anxious`}
          />
          <RangeSlider
            negativeImage={stressed}
            positiveImage={balanced}
            defaultPositive={data.balanced}
            defaultNegative={data.stressed}
            onValueChange={handleBalanced}
            positive={`Balanced`}
            negative={`Stressed`}
          />
          <RangeSlider
            negativeImage={anxious}
            positiveImage={calm}
            defaultPositive={data.great}
            defaultNegative={data.notGood}
            onValueChange={handleGreat}
            positive={`Great`}
            negative={`Not Good`}
          />

          <button
            type="submit"
            onClick={handleSubmit}
            name="submit"
            className={`mt-4 w-[32vw] border border-transparent  lg:w-[65vw] xl:mt-[3rem] xl:w-[70vw] ${theme.shoorah_bg_5} P22Mackinac rounded-[3rem] py-2 text-xl font-medium text-white shadow-sm sm:py-5 xl:px-[5rem] xl:text-2xl ${theme.shoorah_bg_hover_6} focus:outline-none focus:ring-2 ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
          >
            Submit
          </button>
          {/* <button onClick={handleSubmit} className='border border-transparent hover:bg-[#252aa0] rounded-3xl w-[20rem] mt-10 p-3 bg-[#6167e8]'>Submit</button> */}
        </div>
      </div>
    </div>
  );
};

export default PersonalMood;
