import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { Api } from "../api";
import { Link, useHistory } from "react-router-dom";
import {
  captchaTextGenerator,
  errorToast,
  generateRandomSoftColor,
  getLocalStorageItem,
  setLocalStorageItem,
  successToast,
  useOutsideClick,
} from "../utils/helper";
import Loader from "../component/common/Loader";
import CommonInput from "../component/common/Input/CommonInput";
// import LeftImage from "../assets/images/left-image.svg";
import LeftImage from "../assets/images/left-image.png";
import googleIcon from "../assets/images/google.svg";
import fbIcon from "../assets/images/facebook.svg";
import appleIcon from "../assets/images/apple.svg";
import loginMobImg from "../assets/images/login-mob.png";
import {
  handleAppleSignIn,
  handleFacebookSignIn,
  handleGoogleSignIn,
} from "../contents/socialLogin/handleGoogle";
import { useTheme } from "../contents/context/themeContext";
import shoorahLogo from "../assets/images/Shoorah_logo.png";
import { Dialog, Switch } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { Calendar } from "react-date-range";
import moment from "moment";
import { JOB_ROLES } from "../utils/constants";
import { Country, State, City } from "country-state-city";

function Login() {
  const history = useHistory();
  const { theme } = useTheme();

  const [form, setForm] = useState({
    email_phone: "",
    password: "",
    countryCode: "44",
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({});
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  let [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isEmailOpted, setIsEmailOpted] = useState(true);
  const [captchaValue, setCaptchaValue] = useState("");
  

  const [isMobileChoosen, setIsMobileChoosen] = useState(false);

  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => {
    if (showFilterModal) setShowFilterModal(!showFilterModal);
  });

  const handleSelectRange = (e) => {
    setShowFilterModal(false);
    const formattedDate = moment(e).format("YYYY-MM-DD");
    setForm({ ...form, dob: formattedDate });
    // setUserData({ ...userData, dob: formattedDate });
  };

  const handleChange = (e) => {
    setError((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));

    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!getLocalStorageItem("token") && !getLocalStorageItem("userData")) {
      history.push("/login");
    }
    if (getLocalStorageItem("token") && getLocalStorageItem("userData")) {
      history.push("/home");
    }
  }, []);

  const getAppConsistency = () => {
    Api.getUserConsistency().then((res) => {
      if (res.data.meta.code == 1) {
        console.log("Consistency checked");
      } else {
        console.log("Consistency check unsuccessfull");
      }
    });
  };

  const userPutOnboardStep = () => {
    let payload = {
      onBoardStep: null,
    };
    Api.putOnboardStatus(payload).then((res) => {
      if (res.data.meta.code == 1) {
        console.log(res?.data?.meta.message);
      } else {
        console.log("onboard check unsuccessfull");
      }
    });
  };

  const handleSubmit = (e, option) => {
    e.preventDefault();
    setLoader(true);

    if (form?.captcha !== captchaValue) {
      errorToast("Catcha doesn't matched.");
      setForm({ ...form, captcha: "" });
      setLoader(false);
      return;
    }
    let email = form.email_phone;
    let phone = form.phone;
    let countryCode = form.countryCode;

    if (isMobileChoosen) {
      email = null;
    } else {
      phone = null;
      countryCode = null;
    }

    if ((!email && phone == "") || (email == "" && !phone)) {
      setError({ ...error, email_phone: "Fields not be blanked" });
      errorToast("Fields not be blanked");
      setLoader(false);
      return;
    }

    if (
      option &&
      (!form?.name || !form?.password || !form?.dob || !form?.gender)
    ) {
      errorToast("Fields not be blanked");
      setLoader(false);
      return;
    }

    if (option) {
      let payload = {
        name: form?.name,
        email: form.email_phone,
        password: form.password,
        dob: form.dob,
        profile: "",
        gender: [form.gender],
        jobRole: form.jobRole
      };

      Object.keys(payload).forEach(
        (key) => payload[key] === null && delete payload[key],
      );

      Api.userEmailPhoneSignUp(payload).then((response) => {
        if (response?.data?.meta?.code == 2) {
          // console.log("RES", response);
          setIsOtpOpen(true);
          successToast(
            `Otp sent successfully to your registered ${isEmailOpted ? "email" : "phone number"
            }, if not found please check your junk or spam folder.`,
          );

          setLoader(false);
        } else if (response?.data?.meta?.code === 0) {
          setLoader(false);
          errorToast(response?.data?.meta?.message);
        } else {
          setLoader(false);
        }
      });

      return;
    }

    const payload = {
      email: email,
      mobile: phone,
      password: form.password,
      countryCode: countryCode,
    };

    Api.userEmailPhoneLogIn(payload).then((response) => {
      if (response?.data?.meta?.code === 1) {
        setLocalStorageItem("token", response?.data?.meta?.token);
        setLocalStorageItem("userData", JSON.stringify(response?.data?.data));
        setLocalStorageItem("refreshToken", response?.data?.meta?.refreshToken);
        setLoader(false);
        getAppConsistency();
        userPutOnboardStep();

        history.push("/home");
      } else if (response?.data?.meta?.code === 0) {
        setLoader(false);
        errorToast(response?.data?.meta?.message);
      } else {
        setLoader(false);
      }
    });
  };

  let randomColor = [];

  const handleOtp = (e) => {
    e.preventDefault();
    setLoader(true);
    let email = null;
    let phone = null;
    if (form.email_phone.includes("@") || form.email_phone.includes(".com")) {
      email = form.email_phone;
    } else {
      phone = form.email_phone;
    }

    let payload = {
      email: email,
      phone: phone,
      otp: otpValue,
    };

    Object.keys(payload).forEach(
      (key) => payload[key] === null && delete payload[key],
    );

    Api.userEmailPhoneSignUpOtp(payload).then((response) => {
      if (response?.data?.meta?.code === 1) {
        setLocalStorageItem("token", response?.data?.meta?.token);
        setLocalStorageItem("userData", JSON.stringify(response?.data?.data));
        setLocalStorageItem("refreshToken", response?.data?.meta?.refreshToken);
        setLoader(false);
        getAppConsistency();
        userPutOnboardStep();

        history.push("/home");
      } else if (response?.data?.meta?.code === 0) {
        setLoader(false);
        errorToast(response?.data?.meta?.message);
      } else {
        setLoader(false);
      }
    });
  };

  const listOfCountries = Country.getAllCountries();

  const generateCaptchaData = async () => {
    let data = captchaTextGenerator();

    setCaptchaValue(data);
  };

  useEffect(() => {
    generateCaptchaData();
  }, []);

  return (
    <>
      {loader && <Loader />}

      <div className="flex h-[90vh] justify-between overflow-y-hidden bg-white lg:h-screen lg:overflow-y-auto">
        <div className="relative hidden xl:block xl:w-[50%]">
          <img
            className="absolute inset-0 z-10 h-screen w-full object-cover object-right"
            src={LeftImage}
            alt="login left icon"
          />
        </div>

        <div className="relative flex h-full w-full flex-col items-center justify-center xl:w-[45%]">
          <div className="relative mb-0 flex h-[90vh] w-full justify-center gap-x-4 pt-6 lg:mt-6 lg:h-auto lg:items-center lg:pt-0 xl:mb-8">
            <span className="relative z-50 text-xl font-semibold text-shoorah-offWhite lg:text-shoorah-commonBlack">
              Login
            </span>
            <Switch
              checked={isLoginOpen}
              onChange={setIsLoginOpen}
              className={` ${theme.shoorah_bg_5} relative z-50 inline-flex h-6 w-11 rotate-180 items-center rounded-full`}
            >
              <span className="sr-only text-red-500">Enable notifications</span>
              <span
                className={`${isLoginOpen ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <span className="z-50 text-xl font-semibold text-shoorah-offWhite lg:text-shoorah-commonBlack">
              Sign up
            </span>

            <div className="absolute right-0 top-0 block h-full w-full object-cover object-bottom lg:hidden">
              <div className="absolute inset-0 z-30 h-full w-full bg-gradient-to-b from-black/60 from-10% via-transparent to-transparent"></div>
              <img
                className=" relative z-20 block h-full w-full object-cover object-bottom lg:hidden "
                src={loginMobImg}
              />
            </div>
          </div>
          <div className="mx-auto h-full w-full overflow-y-auto px-4 xl:px-8">
            {isLoginOpen ? (
              <>
                <div className="mb-[3rem] hidden justify-center lg:mt-[5rem] lg:flex xl:hidden">
                  <img
                    src={shoorahLogo}
                    className="inset-x-0 top-0 h-[3rem] w-[10rem] object-contain xl:hidden "
                  />
                </div>

                <div className="mt-4 lg:mt-0">
                  <h2 className="text-3xl font-semibold xl:text-4xl">
                    Welcome{" "}
                    <span className={`${theme.shoorah_text_5}`}>back!</span>
                  </h2>

                  <p className="mb-3 mt-2 text-[#0B0F18]">
                    Please login to your account
                  </p>
                </div>

                <div className="mt-8">
                  <div className="mt-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className=" flex items-center gap-x-8">
                        <div className="flex items-center  gap-x-2">
                          <input
                            type="radio"
                            id="email"
                            name="email"
                            value="email"
                            onClick={() => setIsMobileChoosen(false)}
                            checked={!isMobileChoosen}
                          />
                          <label
                            htmlFor={"email"}
                            className="text-md block font-medium text-gray-700"
                          >
                            Email
                          </label>
                        </div>

                        <div className="flex items-center  gap-x-2">
                          <input
                            type="radio"
                            id="phone"
                            name="phone"
                            value="phone"
                            onClick={() => setIsMobileChoosen(true)}
                            checked={isMobileChoosen}
                          />
                          <label
                            htmlFor={"phone"}
                            className="text-md block font-medium text-gray-700"
                          >
                            Phone
                          </label>
                        </div>
                      </div>

                      {isMobileChoosen ? (
                        <div>
                          <label
                            htmlFor={"phone"}
                            className="text-md block font-medium text-gray-700"
                          >
                            Phone
                          </label>
                          <div
                            className={`mt-1  flex w-full cursor-pointer appearance-none rounded-3xl border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none  ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5}`}
                          >
                            <select
                              name="countryCode"
                              onChange={handleChange}
                              defaultValue={44}
                              className="w-16 appearance-none bg-inherit focus:outline-none"
                            >
                              {listOfCountries?.map(
                                ({ name, flag, isoCode, phonecode }) => (
                                  <option
                                    className="text-black"
                                    key={isoCode}
                                    value={phonecode}
                                  >
                                    {flag + " +" + phonecode}
                                  </option>
                                ),
                              )}
                            </select>

                            <input
                              name="phone"
                              onChange={handleChange}
                              className="w-full appearance-none focus:outline-none"
                              placeholder="Enter your mobile number"
                            />
                          </div>
                        </div>
                      ) : (
                        <CommonInput
                          id="email_phone"
                          name="email_phone"
                          type="text"
                          value={form.email_phone}
                          onChange={handleChange}
                          label="Email"
                          error={error.email_phone}
                          classNames="px-4 py-2 sm:px-5 sm:py-3"
                          placeholder="Enter your email"
                        />
                      )}
                      <div className="space-y-1">
                        <CommonInput
                          id="password"
                          name="password"
                          type="password"
                          value={form.password}
                          onChange={handleChange}
                          label="Password"
                          error={error.password}
                          classNames="px-4 py-2 sm:px-5 sm:py-3"
                          placeholder="Enter your password"
                          isRequired
                          isIcon
                        />
                        <div className="flex items-center justify-end">
                          {/*<div className='flex items-center'>*/}
                          {/*  <input*/}
                          {/*    id='remember-me'*/}
                          {/*    name='remember-me'*/}
                          {/*    type='checkbox'*/}
                          {/*    className='h-4 w-4 rounded accent-shoorah-primary border-gray-300 text-shoorah-primary focus:ring-shoorah-primary'*/}
                          {/*  />*/}
                          {/*  <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>*/}
                          {/*    Remember me*/}
                          {/*  </label>*/}
                          {/*</div>*/}

                          <div className="text-sm">
                            <Link
                              to={"/forgot-password"}
                              className={`font-medium ${theme.shoorah_text_5} ${theme.shoorah_text_hover_6}`}
                            >
                              Forgot your password?
                            </Link>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor={"captcha"}
                            className="text-md block font-medium text-gray-700"
                          >
                            Verify Captcha
                            <span className={` text-red-400`}>&#42;</span>
                          </label>
                          <div
                            className={` relative mt-1 flex w-full appearance-none items-center justify-center gap-4 overflow-hidden rounded-3xl border border-gray-300 px-4  py-2 text-center text-2xl font-semibold placeholder-gray-400 outline-none sm:px-5 sm:py-3  ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5} sm:text-md`}
                          >
                            {captchaValue?.split("").map((val, index) => (
                              <span
                                style={{
                                  color: generateRandomSoftColor(),
                                  rotate:
                                    Math.floor(Math.random() * 91) - 45 + "deg",
                                }}
                                key={index}
                                className={``}
                              >
                                {val}
                              </span>
                            ))}

                            <div
                              style={{
                                backgroundColor: generateRandomSoftColor(),
                                rotate:
                                  Math.floor(Math.random() * 91) - 45 + "deg",
                              }}
                              className="absolute left-0 top-0 h-[1px] w-full"
                            ></div>

                            <div
                              style={{
                                backgroundColor: generateRandomSoftColor(),
                                rotate:
                                  Math.floor(Math.random() * 91) - 45 + "deg",
                              }}
                              className="absolute bottom-2 left-0 h-[1px] w-full"
                            ></div>

                            <div
                              onClick={generateCaptchaData}
                              className=" absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class={`h-6 w-6 ${theme.shoorah_text_5}`}
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className=" mt-2">
                            <input
                              type="text"
                              name="captcha"
                              value={form?.captcha}
                              onChange={handleChange}
                              placeholder="####"
                              className={`block w-full appearance-none rounded-3xl border border-gray-300 px-4 py-2 text-center text-xl font-semibold placeholder-gray-400 outline-none sm:px-5 sm:py-3  ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5} sm:text-md`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          disabled={
                            form?.captcha?.length < 4 ||
                            (isMobileChoosen
                              ? !form.phone
                              : !form.email_phone) ||
                            !form.password
                          }
                          type="submit"
                          className={`rounded-3xl border border-transparent disabled:bg-gray-400 ${theme.shoorah_bg_5}  w-full px-10 py-2 text-sm font-medium text-white shadow-sm sm:py-3 ${theme.shoorah_bg_hover_6} focus:outline-none focus:ring-2 ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="relative mt-5 inline-flex w-full items-center justify-center">
                      <hr className="my-8 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
                      <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900">
                        or
                      </span>
                    </div>
                    {/* Social Login */}
                    <div className="flex w-full items-center justify-center sm:items-center sm:justify-center">
                      <button
                        onClick={() => handleGoogleSignIn()}
                        type="button"
                        className="mt-3 inline-flex w-fit cursor-auto items-center justify-center rounded-3xl border border-transparent bg-transparent px-10 py-2 text-sm text-sm font-medium font-medium text-white text-white  shadow-sm focus:outline-none sm:py-3 "
                      >
                        <img
                          src={googleIcon}
                          className="h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] cursor-pointer hover:scale-110"
                        />
                        <div></div>
                      </button>

                      <button
                        onClick={() => handleFacebookSignIn()}
                        type="button"
                        className="mt-3 inline-flex w-fit cursor-auto items-center justify-center gap-2 rounded-3xl border border-transparent bg-transparent px-10 py-2 text-sm text-sm font-medium font-medium text-white  text-white shadow-sm focus:outline-none sm:py-3 "
                      >
                        <img
                          src={fbIcon}
                          className="h-[2rem] min-h-[2rem]  w-[2rem] min-w-[2rem] cursor-pointer hover:scale-110"
                        />

                        <div></div>
                      </button>

                      <button
                        onClick={handleAppleSignIn}
                        type="button"
                        className="mt-3 inline-flex w-fit cursor-auto items-center justify-center gap-2 rounded-3xl border border-transparent bg-transparent px-10 py-2 text-sm text-sm font-medium font-medium text-white  text-white shadow-sm focus:outline-none sm:py-3 "
                      >
                        <img
                          src={appleIcon}
                          className="h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] cursor-pointer hover:scale-110"
                        />

                        <div></div>
                      </button>
                      {/* </LoginSocialApple> */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-[3rem] mt-[5rem] hidden justify-center lg:flex xl:hidden">
                  <img
                    src={shoorahLogo}
                    className="inset-x-0 top-0 h-[3rem] w-[10rem] object-contain xl:hidden "
                  />
                </div>

                <div>
                  <h2 className="mt-4 text-3xl font-semibold lg:mt-0 xl:text-4xl">
                    Welcome{" "}
                    {/* <span className={`${theme.shoorah_text_5}`}>back!</span> */}
                  </h2>

                  <p className="mb-3 mt-2 text-[#0B0F18]">
                    Please signup to create your account
                  </p>
                </div>

                <div className="mt-8">
                  <div className="mt-6">
                    <form
                      className="space-y-6"
                      onSubmit={(e) => {
                        handleSubmit(e, "signUp");
                      }}
                    >
                      <CommonInput
                        isRequired
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        label="Name"
                        error={error.name}
                        classNames="px-4 py-2 sm:px-5 sm:py-3"
                        placeholder="Enter your name"
                      />

                      <CommonInput
                        isRequired
                        id="email_phone"
                        name="email_phone"
                        type="text"
                        value={form.email_phone}
                        onChange={handleChange}
                        label="Email"
                        error={error.email_phone}
                        classNames="px-4 py-2 sm:px-5 sm:py-3"
                        placeholder="Enter your email address"
                      />

                      {/* <CommonInput
                        id="job_role"
                        name="job_role"
                        type="text"
                        value={form.job_role}
                        onChange={handleChange}
                        label="Job role"
                        error={error.job_role}
                        classNames="px-4 py-2 sm:px-5 sm:py-3"
                        placeholder="Enter your Job role"
                      /> */}

                      <label htmlFor='job_role' className="text-md block font-medium text-gray-700">
                        Job Role <span className={` text-red-400`}>&#42;</span>
                      </label>
                      <div

                        className="w-full overflow-hidden rounded-[3rem] border px-3"
                      >
                        {/* <p className="P22Mackinac w-auto whitespace-nowrap  text-xs font-normal text-gray-400">
                          Job Role<span className="text-red-500">*</span>


                        </p> */}

                        <select
                          className="bg-white px-3 py-2 P22Mackinac placeholder-gray-400 text-base sm:text-md  w-full outline-none rounded-md h-10  capitalize"
                          onChange={handleChange}
                          value={form?.job_role}
                          id="job_role"
                          name="jobRole"
                        >
                          <option value={""} disabled>
                            Job Role
                          </option>
                          {JOB_ROLES.map((e) => (
                            <option value={e.name.toLowerCase()}>{e.name}</option>
                          ))}
                        </select>
                      </div>

                      <CommonInput
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        label="Password"
                        error={error.password}
                        classNames="px-4 py-2 sm:px-5 sm:py-3"
                        placeholder="Enter your password"
                        isRequired
                        isIcon
                      />
                      <div className="relative w-full">
                        <label
                          htmlFor={"dob"}
                          className="text-md block font-medium text-gray-700"
                        >
                          Date of Birth{" "}
                          <span className={` text-red-400`}>&#42;</span>
                        </label>
                        <div
                          onClick={() => setShowFilterModal((state) => !state)}
                          className={`mt-1 block w-full cursor-pointer appearance-none rounded-3xl border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none  ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5}`}
                        >
                          {" "}
                          {/* {userData?.dob} */}
                          {form.dob ? (
                            form.dob
                          ) : (
                            <div className="text-gray-400">
                              {" "}
                              Enter your date of birth
                            </div>
                          )}
                        </div>
                        {showFilterModal && (
                          <Transition
                            show={showFilterModal}
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <div
                              className="absolute left-0 scale-y-[70%] scale-x-[80%] md:scale-x-[100%] md:scale-y-[90%]  top-0 z-50 mx-auto mt-2  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              ref={wrapperRef}
                            >
                              <Calendar
                                defaultValue={new Date()}
                                onChange={handleSelectRange}
                                maxDate={new Date()}
                              />
                            </div>
                          </Transition>
                        )}
                      </div>

                      <div className="">
                        <label
                          htmlFor={"gender"}
                          className="text-md block font-medium text-gray-700"
                        >
                          Gender <span className={` text-red-400`}>&#42;</span>
                        </label>
                        <select
                          type="text"
                          placeholder="Gender"
                          name="gender"
                          value={form?.gender}
                          onChange={handleChange}
                          className={`block w-full cursor-pointer ${!form?.gender && "text-gray-400"
                            } mt-1 appearance-none rounded-3xl border border-gray-300 bg-white px-4 py-3 placeholder-gray-400 outline-none   ${theme.shoorah_border_focus_5
                            } focus:outline-none ${theme.shoorah_border_ring_focus_5
                            } sm:text-md`}
                        >
                          <option value={null} disabled selected hidden>
                            Select gender
                          </option>
                          <option className="text-black" value={0}>
                            Not Preferred
                          </option>
                          <option className="text-black" value={1}>
                            Male
                          </option>
                          <option className="text-black" value={2}>
                            Female
                          </option>
                          <option className="text-black" value={3}>
                            Non Binary
                          </option>
                          <option className="text-black" value={4}>
                            Intersex
                          </option>
                          <option className="text-black" value={5}>
                            Transgenders
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor={"captcha"}
                          className="text-md block font-medium text-gray-700"
                        >
                          Verify Captcha
                          <span className={` text-red-400`}>&#42;</span>
                        </label>
                        <div
                          className={` relative mt-1 flex w-full appearance-none items-center justify-center gap-3 overflow-hidden rounded-3xl border  border-gray-300 px-4 py-2 text-center text-2xl font-semibold placeholder-gray-400 outline-none sm:px-5 sm:py-3  ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5} sm:text-md`}
                        >
                          {captchaValue?.split("").map((val, index) => (
                            <span
                              style={{
                                color: generateRandomSoftColor(),
                                rotate:
                                  Math.floor(Math.random() * 91) - 45 + "deg",
                              }}
                              key={index}
                              className={``}
                            >
                              {val}
                            </span>
                          ))}

                          <div
                            style={{
                              backgroundColor: generateRandomSoftColor(),
                              rotate:
                                Math.floor(Math.random() * 91) - 45 + "deg",
                            }}
                            className="absolute left-0 top-0 h-[1px] w-full"
                          ></div>

                          <div
                            style={{
                              backgroundColor: generateRandomSoftColor(),
                              rotate:
                                Math.floor(Math.random() * 91) - 45 + "deg",
                            }}
                            className="absolute bottom-2 left-0 h-[1px] w-full"
                          ></div>

                          <div
                            onClick={generateCaptchaData}
                            className=" absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class={`h-6 w-6 ${theme.shoorah_text_5}`}
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className=" mt-2">
                          <input
                            type="text"
                            name="captcha"
                            value={form?.captcha}
                            onChange={handleChange}
                            placeholder="####"
                            className={`block w-full appearance-none rounded-3xl border border-gray-300 px-4 py-2 text-center text-xl font-semibold placeholder-gray-400 outline-none sm:px-5 sm:py-3  ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5} sm:text-md`}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          disabled={
                            form?.captcha?.length < 4 ||
                            !form.name ||
                            !form.email_phone ||
                            !form.password ||
                            !form.dob ||
                            !form.gender
                          }
                          type="submit"
                          className={`rounded-3xl border border-transparent disabled:bg-gray-400 ${theme.shoorah_bg_5}  w-full px-10 py-2 text-sm font-medium text-white shadow-sm sm:py-3 ${theme.shoorah_bg_hover_6} focus:outline-none focus:ring-2 ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                    <div className="relative mt-5 inline-flex w-full items-center justify-center">
                      <hr className="my-8 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
                      <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900">
                        or
                      </span>
                    </div>
                    {/* Social Login */}
                    <div className="flex w-full items-center justify-center sm:items-center sm:justify-center">
                      <button
                        onClick={() => handleGoogleSignIn()}
                        type="button"
                        className="mt-3 inline-flex w-fit cursor-auto items-center justify-center rounded-3xl border border-transparent bg-transparent px-10 py-2 text-sm text-sm font-medium font-medium text-white text-white  shadow-sm focus:outline-none sm:py-3 "
                      >
                        <img
                          src={googleIcon}
                          className="h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] cursor-pointer hover:scale-110"
                        />
                        <div></div>
                      </button>

                      <button
                        onClick={() => handleFacebookSignIn()}
                        type="button"
                        className="mt-3 inline-flex w-fit cursor-auto items-center justify-center gap-2 rounded-3xl border border-transparent bg-transparent px-10 py-2 text-sm text-sm font-medium font-medium text-white  text-white shadow-sm focus:outline-none sm:py-3 "
                      >
                        <img
                          src={fbIcon}
                          className="h-[2rem] min-h-[2rem]  w-[2rem] min-w-[2rem] cursor-pointer hover:scale-110"
                        />

                        <div></div>
                      </button>

                      {/* <LoginSocialApple
                        client_id={
                          process.env.REACT_APP_APPLE_ID || "com.shoorah"
                        }
                        redirect_uri="https://shoorah-e87b6.firebaseapp.com/__/auth/handler"
                        // onLoginStart={onLoginStart}
                        onResolve={({ provider, data }) => {
                          console.log(provider, data);
                        }}
                        // setProvider(provider);
                        // setProfile(data);
                        // }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                      > */}
                      <button
                        onClick={() => handleAppleSignIn()}
                        type="button"
                        className="mt-3 inline-flex w-fit cursor-auto items-center justify-center gap-2 rounded-3xl border border-transparent bg-transparent px-10 py-2 text-sm text-sm font-medium font-medium text-white  text-white shadow-sm focus:outline-none sm:py-3 "
                      >
                        <img
                          src={appleIcon}
                          className="h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] cursor-pointer hover:scale-110"
                        />

                        <div></div>
                      </button>
                      {/* </LoginSocialApple> */}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/30 px-4"
          aria-hidden="true"
        >
          <form
            onSubmit={handleOtp}
            className=" relative flex h-auto w-full flex-col items-center justify-center gap-y-4 rounded-2xl bg-white p-4 xl:w-[40vw]"
          >
            <svg
              onClick={() => setIsOtpOpen(false)}
              className="absolute right-4 top-2 h-6 w-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>

            <h4 className="text-2xl font-semibold">
              Please Enter the{" "}
              <span className={` text-3xl ${theme.shoorah_text_5}`}>OTP</span>
            </h4>
            <div>
              <p className="mb-1 text-center text-base">
                Please enter the OTP sent to your{" "}
                <span className={`${theme.shoorah_text_5} font-semibold`}>
                  {" "}
                  {isEmailOpted ? "Email" : "Phone"}{" "}
                </span>
              </p>
              <input
                type="text"
                value={otpValue}
                onChange={(e) => {
                  setOtpValue(e.target.value);
                }}
                placeholder="######"
                className={`block w-full appearance-none rounded-3xl border border-gray-300 px-4 py-2 text-center text-2xl font-semibold placeholder-gray-400 outline-none sm:px-5 sm:py-3  ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5} sm:text-md`}
              />
              <p className="mt-2 flex items-center justify-center gap-x-2 text-sm text-gray-400">
                Didn't received OTP?{" "}
                <span
                  onClick={(e) => {
                    // successToast(
                    //   `Otp sent successfully to your registered ${
                    //     isEmailOpted ? "email" : "phone number"
                    //   }, if no found please check your junk folder`
                    // );
                    handleSubmit(e, "signup");
                  }}
                  className={` ${theme.shoorah_text_5} cursor-pointer font-semibold`}
                >
                  Resend
                </span>
              </p>
            </div>
            <div className="w-full text-center">
              <button
                disabled={otpValue.length < 4}
                type="submit"
                className={`rounded-3xl border border-transparent disabled:bg-gray-500 ${theme.shoorah_bg_5}  w-full px-10 py-2 text-sm font-medium text-white shadow-sm sm:py-3 ${theme.shoorah_bg_hover_6} focus:outline-none focus:ring-2 ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}

export default Login;
