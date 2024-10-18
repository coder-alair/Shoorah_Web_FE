import React, { useState } from "react";
import RangeSlider from "../reusable/rangeSlider";
import { useTheme } from "../context/themeContext";
import calenderSvg from "../../assets/svg/calenderSvg.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import company_culture_bad from "../../assets/profess_moods/company_culture_bad.svg";
import company_culture_good from "../../assets/profess_moods/company_culture_good.svg";
import job_satisfy_bad from "../../assets/profess_moods/job_satisfy_bad.svg";
import job_satisfy_good from "../../assets/profess_moods/job_satisfy_good.svg";
import job_tools_bad from "../../assets/profess_moods/job_tools_bad.svg";
import job_tools_good from "../../assets/profess_moods/job_tools_good.svg";
import line_manage_bad from "../../assets/profess_moods/line_manage_bad.svg";
import line_manage_good from "../../assets/profess_moods/line_manage_good.svg";
import mental_support_bad from "../../assets/profess_moods/mental_support_bad.svg";
import mental_support_good from "../../assets/profess_moods/mental_support_good.svg";
import on_go_train_bad from "../../assets/profess_moods/on_go_train_bad.svg";
import on_go_train_good from "../../assets/profess_moods/on_go_train_good.svg";
import working_env_bad from "../../assets/profess_moods/working_env_bad.svg";
import working_env_good from "../../assets/profess_moods/working_env_good.svg";
import work_load_bad from "../../assets/profess_moods/work_load_good.svg";
import work_load_good from "../../assets/profess_moods/work_load_bad.svg";
import workload_bad from "../../assets/profess_moods/worload_bad.svg";
import workload_good from "../../assets/profess_moods/workload_good.svg";
import support_bad from "../../assets/profess_moods/support_bad.svg";
import support_good from "../../assets/profess_moods/support_good.svg";

import { errorToast, successToast } from "../../utils/helper";
import { Api } from "../../api";

const ProfessionalMood = () => {
  const { theme } = useTheme();
  const history = useHistory();
  const [dissatisfied, setDissatisfied] = useState(0);
  const [verySatisfied, setverySatisfied] = useState(0);
  const [unpleasant, setunpleasant] = useState(0);
  const [positive, setpositive] = useState(0);
  const [inadequate, setInadequate] = useState(0);
  const [comprehensive, setComprehensive] = useState(0);
  const [insufficient, setInsufficient] = useState(0);
  const [wellEquipped, setwellEquipped] = useState(0);
  const [unsupported, setunsupported] = useState(0);
  const [highlySupported, sethighlySupported] = useState(0);
  const [negative, setnegative] = useState(0);
  const [inclusive, setinclusive] = useState(0);
  const [lacking, setlacking] = useState(0);
  const [excellent, setexcellent] = useState(0);
  const [unmanageable, setUnmanageable] = useState(0);
  const [manageable, setmanageable] = useState(0);
  const [poor, setpoor] = useState(0);
  const [supportive, setsupportive] = useState(0);
  const [overwhelming, setOverwhelming] = useState(0);
  const [comfortable, setComfortable] = useState(0);

  const [loader, setLoader] = useState(false);

  const handleJobSatisfyChange = (newValue) => {
    if (newValue < 0) {
      setDissatisfied(Math.abs(newValue));
      setverySatisfied(0);
    } else {
      setverySatisfied(newValue);
      setDissatisfied(0);
    }
  };

  const handleWorkingEnvChange = (newValue) => {
    if (newValue < 0) {
      setunpleasant(Math.abs(newValue));
      setpositive(0);
    } else {
      setpositive(newValue);
      setunpleasant(0);
    }
  };

  const handleWorkingLoadChange = (newValue) => {
    if (newValue < 0) {
      setOverwhelming(Math.abs(newValue));
      setComfortable(0);
    } else {
      setComfortable(newValue);
      setOverwhelming(0);
    }
  };

  const handleLineMangerChange = (newValue) => {
    if (newValue < 0) {
      setpoor(Math.abs(newValue));
      setsupportive(0);
    } else {
      setsupportive(newValue);
      setpoor(0);
    }
  };

  const handleWorkingHrs = (newValue) => {
    if (newValue < 0) {
      setUnmanageable(Math.abs(newValue));
      setmanageable(0);
    } else {
      setmanageable(newValue);
      setUnmanageable(0);
    }
  };

  const handleMentalHealth = (newValue) => {
    if (newValue < 0) {
      setlacking(Math.abs(newValue));
      setexcellent(0);
    } else {
      setexcellent(newValue);
      setlacking(0);
    }
  };

  const handleCompanyCulture = (newValue) => {
    if (newValue < 0) {
      setnegative(Math.abs(newValue));
      setinclusive(0);
    } else {
      setinclusive(newValue);
      setnegative(0);
    }
  };
  const handleFeelingSupported = (newValue) => {
    if (newValue < 0) {
      setunsupported(Math.abs(newValue));
      sethighlySupported(0);
    } else {
      sethighlySupported(newValue);
      setunsupported(0);
    }
  };
  const handleSetHaveTools = (newValue) => {
    if (newValue < 0) {
      setInsufficient(Math.abs(newValue));
      setwellEquipped(0);
    } else {
      setwellEquipped(newValue);
      setInsufficient(0);
    }
  };

  const handleOntraining = (newValue) => {
    if (newValue < 0) {
      setInadequate(Math.abs(newValue));
      setComprehensive(0);
    } else {
      setComprehensive(newValue);
      setInadequate(0);
    }
  };

  const handleSubmit = () => {
    const payload = {
      dissatisfied: dissatisfied,
      verySatisfied: verySatisfied,
      unpleasant: unpleasant,
      positive: positive,
      overwhelming: overwhelming,
      comfortable: comfortable,
      poor: poor,
      supportive: supportive,
      unmanageable: unmanageable,
      manageable: manageable,
      lacking: lacking,
      excellent: excellent,
      negative: negative,
      inclusive: inclusive,
      unsupported: unsupported,
      highlySupported: highlySupported,
      insufficient: insufficient,
      wellEquipped: wellEquipped,
      inadequate: inadequate,
      comprehensive: comprehensive,
    };
    setLoader(true);
    Api.addEditProfessionalMood(payload)
      .then((res) => {
        if (res?.data?.meta?.code == 1) {
          setLoader(false);
          successToast(res.data.meta.message);
        } else {
          setLoader(false);
          errorToast(res?.data?.meta?.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <div className="flex w-[100%] flex-col items-center overflow-hidden">
      <div
        className={`flex flex-col ${theme.moodBg} h-full w-[330%] items-center justify-center rounded-t-full text-white`}
      >
        <div className="mt-8 flex w-[25%] items-center justify-between py-3 sm:w-[20%] xl:mt-[7rem]">
          <div className="P22Mackinac mx-auto flex items-center gap-10 text-xl xl:text-3xl">
            Professional Mood
          </div>
          <div
            onClick={() => history.push("/moods")}
            className="fade-in-image cursor-pointer rounded-3xl border border-[#fff] px-2 py-2 hover:scale-110"
          >
            <img
              src={calenderSvg}
              className="h-3 w-3 xl:h-[1.5rem] xl:w-[1.5rem]"
            />
          </div>
        </div>

        <div className="my-6 flex flex-col items-center justify-center xl:my-[4rem]">
          <div className=" P22Mackinac mx-auto flex items-center  text-lg xl:text-2xl">
            Job Satisfaction
          </div>
          <RangeSlider
            negativeImage={job_satisfy_bad}
            positiveImage={job_satisfy_good}
            onValueChange={handleJobSatisfyChange}
            // prof={`Job Satisfaction`}
            positive={"Satisfied"}
            negative={"Dissatisfied"}
          />
          <div className=" P22Mackinac mx-auto mt-6 flex items-center  text-lg xl:text-2xl">
            Working Environment
          </div>
          <RangeSlider
            negativeImage={working_env_bad}
            positiveImage={working_env_good}
            onValueChange={handleWorkingEnvChange}
            // prof={`Working Environment`}
            positive={"Pleasant"}
            negative={"unpleasant"}
          />
          <div className=" P22Mackinac mx-auto mt-6 flex items-center  text-lg xl:text-2xl">
            Workload
          </div>
          <RangeSlider
            negativeImage={work_load_bad}
            positiveImage={work_load_good}
            onValueChange={handleWorkingLoadChange}
            // prof={`Workload`}
            positive={"Comfortable"}
            negative={"Overwhelming"}
          />
          <div className=" P22Mackinac mx-auto mt-6 flex items-center  text-lg xl:text-2xl">
            Line Manager Relationship
          </div>
          <RangeSlider
            negativeImage={line_manage_bad}
            positiveImage={line_manage_good}
            onValueChange={handleLineMangerChange}
            // prof={`Line Manager Relationship`}
            positive={"Supportive"}
            negative={"Poor"}
          />
          <div className=" P22Mackinac mx-auto mt-6 flex items-center  text-lg xl:text-2xl">
            Working Hours
          </div>
          <RangeSlider
            negativeImage={workload_bad}
            positiveImage={workload_good}
            onValueChange={handleWorkingHrs}
            // prof={`Working Hours`}
            positive={"Comfortable"}
            negative={"Unmanageable"}
          />
          <div className=" P22Mackinac mx-auto mt-6 flex items-center  text-lg xl:text-2xl">
            Mental Health Support
          </div>
          <RangeSlider
            negativeImage={mental_support_bad}
            positiveImage={mental_support_good}
            onValueChange={handleMentalHealth}
            // prof={`Mental Health Support`}
            positive={"Excellent"}
            negative={"Lacking"}
          />
          <div className=" P22Mackinac mx-auto mt-6 flex items-center  text-lg xl:text-2xl">
            Company Culture
          </div>
          <RangeSlider
            negativeImage={company_culture_bad}
            positiveImage={company_culture_good}
            onValueChange={handleCompanyCulture}
            // prof={`Company Culture`}
            positive={"Inclusive"}
            negative={"Negative"}
          />
          <div className=" P22Mackinac mx-auto mt-6 flex items-center  text-lg xl:text-2xl">
            Feeling Supported
          </div>
          <RangeSlider
            negativeImage={support_bad}
            positiveImage={support_good}
            onValueChange={handleFeelingSupported}
            // prof={`Feeling Supported`}
            positive={"Highly Supported"}
            negative={"Unsupported"}
          />
          <div className=" P22Mackinac mx-auto mt-6 flex items-center  text-lg xl:text-2xl">
            Having the Tools to do your Job
          </div>
          <RangeSlider
            negativeImage={job_tools_bad}
            positiveImage={job_tools_good}
            onValueChange={handleSetHaveTools}
            // prof={`Having the Tools to do your Job`}
            positive={"Well-Equipped"}
            negative={"Insufficient"}
          />
          <div className=" P22Mackinac mx-auto mt-6 flex items-center  text-lg xl:text-2xl">
            On-going Training
          </div>
          <RangeSlider
            negativeImage={on_go_train_bad}
            positiveImage={on_go_train_good}
            onValueChange={handleOntraining}
            // prof={`On-going Training`}
            positive={"Comprehensive"}
            negative={"Inadequate"}
          />
          <button
            onClick={handleSubmit}
            type="submit"
            name="submit"
            className={`mt-4 w-[32%] border border-transparent sm:w-[35%] lg:w-[65%] xl:mt-[3rem] xl:w-[50%] xl:w-[70%] ${theme.shoorah_bg_5} P22Mackinac rounded-[3rem] py-2 text-xl font-medium text-white shadow-sm sm:py-5 xl:px-[5rem] xl:text-2xl ${theme.shoorah_bg_hover_6} focus:outline-none focus:ring-2 ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
          >
            Submit
          </button>
          {/* <button className='border border-transparent hover:bg-[#252aa0] rounded-3xl w-[20rem] mt-10 p-3 bg-[#6167e8]'>Submit</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalMood;
