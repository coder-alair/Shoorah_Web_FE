import React, { useEffect, useState } from "react";
import { ArrowPathIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useHistory, useLocation } from "react-router-dom";
import { errorToast, getLocalStorageItem, successToast } from "../utils/helper";
import { Api } from "../api";
import Loader from "../component/common/Loader";
import resetPasswordValidation from "../validation/resetPasswordValidation";
import LeftImage from "../assets/images/left-image.svg";
import CommonInput from "../component/common/Input/CommonInput";
import Timer from "../component/common/Timer";
import validator from "validator";
import { useTheme } from "../contents/context/themeContext";

function ResetPassword() {
  const history = useHistory();
  const location = useLocation();
  const { theme } = useTheme();

  const query = new URLSearchParams(location.search);
  const email = query.get("email");

  const [form, setForm] = useState({
    otp: "",
    new_password: "",
    confirm_password: "",
  });
  const [loader, setLoader] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const [error, setError] = useState({});

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
    if (getLocalStorageItem("token") && getLocalStorageItem("userData")) {
      history.push("/");
    }
  }, [history]);

  const handleResendOtp = () => {
    setLoader(true);
    const payload = {
      email: email,
    };
    Api.forgotPassword(payload).then((response) => {
      if (response?.data?.meta?.code === 3) {
        setLoader(false);
        successToast(response?.data?.meta?.message);
        setTimeUp(false);
      } else if (response?.data?.meta?.code === 0) {
        setLoader(false);
        errorToast(response?.data?.meta?.message);
      } else {
        setLoader(false);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = resetPasswordValidation(form);
    if (isValid) {
      setLoader(true);
      const payload = {
        email: email,
        otp: form.otp,
        newPassword: form.new_password,
        confirmPassword: form.confirm_password,
      };
      Api.resetPassword(payload).then((response) => {
        if (response?.data?.meta?.code === 1) {
          setLoader(false);
          successToast(response?.data?.meta?.message);
          history.push("/login");
        } else if (response?.data?.meta?.code === 0) {
          setLoader(false);
          errorToast(response?.data?.meta?.message);
        } else {
          setLoader(false);
        }
      });
    } else {
      setLoader(false);
      setError(errors);
    }
  };

  useEffect(() => {
    if (form.new_password?.length > 5 && form.confirm_password?.length > 5) {
      if (!validator.equals(form.new_password, form.confirm_password)) {
        setError({
          confirm_password: "New password and confirm password do not match.",
          new_password: "New password and confirm password do not match.",
          otp: error.otp,
        });
      } else {
        setError({
          confirm_password: "",
          new_password: "",
          otp: error.otp,
        });
      }
    } else {
      setError({
        confirm_password: "",
        new_password: "",
        otp: error.otp,
      });
    }
  }, [form.new_password, form.confirm_password]);

  return (
    <>
      {loader && <Loader />}
      <div className="flex h-screen">
        <div className="relative hidden xl:block xl:w-[50%]">
          <img
            className="absolute inset-0 h-screen w-full object-cover"
            src={LeftImage}
            alt="login left image"
          />
        </div>
        <div className="flex w-full flex-col justify-center bg-white xl:w-[50%]">
          <div className="mx-auto w-full px-4 sm:px-[100px] xl:px-[100px] xl:px-[30px] 2xl:px-[230px]">
            <div>
              <h2 className="text-3xl font-semibold xl:text-4xl">
                Reset{" "}
                <span className={`${theme.shoorah_text_5}`}>Password</span>
              </h2>
              <p className="mb-3 mt-2 text-[#0B0F18]">
                Enter the OTP which has been sent to your registered email
                address.
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="relative">
                      <CommonInput
                        id="otp"
                        name="otp"
                        type="text"
                        value={form.otp}
                        onChange={handleChange}
                        error={error.otp}
                        label="Enter OTP"
                        classNames="px-4 py-2 sm:px-5 sm:py-3"
                        placeholder="Enter OTP"
                        isRequired
                      />
                      <div
                        className={`flex justify-between ${
                          error.otp ? "" : "mt-2"
                        }`}
                      >
                        {timeUp ? (
                          <div className={`flex`}>
                            <span
                              className={`${theme.shoorah_text_5} ml-1 text-sm`}
                            >
                              Didn&lsquo;t receive code?
                            </span>
                          </div>
                        ) : (
                          <div className={`flex`}>
                            <Timer setTimeUp={setTimeUp} />
                          </div>
                        )}
                        <div
                          className={`flex ${
                            timeUp
                              ? `${theme.shoorah_text_5} cursor-pointer`
                              : "text-gray-300"
                          }`}
                          onClick={() => {
                            timeUp && handleResendOtp();
                          }}
                        >
                          <ArrowPathIcon className="w-[20px]" />
                          <span className="ml-1 text-sm">Resend OTP</span>
                        </div>
                      </div>
                    </div>
                    <CommonInput
                      id="new_password"
                      name="new_password"
                      type="password"
                      value={form.new_password}
                      onChange={handleChange}
                      label="Enter new password"
                      error={error.new_password}
                      classNames="px-4 py-2 sm:px-5 sm:py-3"
                      placeholder="Enter new password"
                      isRequired
                      isIcon
                    />

                    <CommonInput
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      value={form.confirm_password}
                      onChange={handleChange}
                      label="Confirm New Password"
                      error={error.confirm_password}
                      classNames="px-4 py-2 sm:px-5 sm:py-3"
                      placeholder="Enter your password"
                      isRequired
                      isIcon
                    />
                  </div>

                  <div className="mt-10 text-center">
                    <button
                      type="submit"
                      className={`w-full rounded-3xl border border-transparent ${theme.shoorah_bg_5} px-10 py-2 text-sm font-medium text-white shadow-sm sm:py-3 ${theme.shoorah_bg_hover_6} focus:outline-none focus:ring-2 ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="mx-auto mt-10 flex w-auto items-center justify-center">
                <div onClick={() => history.push("/login")}>
                  <ChevronLeftIcon
                    className={`ml-auto w-[25px] cursor-pointer self-center ${theme.shoorah_text_5} border ${theme.shoorah_border_5} rounded-full`}
                  />
                </div>
                <span
                  onClick={() => history.push("/login")}
                  className={`ml-2 cursor-pointer self-center text-base ${theme.shoorah_text_5}`}
                >
                  Back to login
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
