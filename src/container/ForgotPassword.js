import React, { useEffect, useState } from "react";
import { errorToast, getLocalStorageItem, successToast } from "../utils/helper";
import { useHistory } from "react-router-dom";
import { Api } from "../api";
import Loader from "../component/common/Loader";
import LeftImage from "../assets/images/left-image.svg";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import CommonInput from "../component/common/Input/CommonInput";
import { useTheme } from "../contents/context/themeContext";

function ForgotPassword() {
  const history = useHistory();
  const { theme } = useTheme();
  const [form, setForm] = useState({
    email_phone: "",
  });

  const [loader, setLoader] = useState(false);
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
      history.push("/home");
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoader(true);
    let email = null;
    let mobile = null;
    if (form.email_phone.includes("@") || form.email_phone.includes(".com")) {
      email = form.email_phone;
    } else {
      mobile = form.email_phone;
    }

    if ((!email && mobile == "") || (email == "" && !mobile)) {
      setError({ ...error, email_phone: "Fields not be blanked" });
      errorToast("Fields not be blanked");
      setLoader(false);
      return;
    }
    const payload = {
      email: email,
      mobile: mobile,
    };
    console.log({ payload });

    Api.forgotPassword(payload).then((response) => {
      if (response?.data?.meta?.code === 3) {
        setLoader(false);
        successToast(response?.data?.meta?.message);
        history.push(`/reset-password?email=${form.email_phone}`);
      } else if (response?.data?.meta?.code === 0) {
        setLoader(false);
        errorToast(response?.data?.meta?.message);
      } else {
        setLoader(false);
      }
    });
  };

  return (
    <>
      {loader && <Loader />}
      <div className="flex h-screen ">
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
                Forgot{" "}
                <span className={`${theme.shoorah_text_5}`}>Password</span>
              </h2>
              <p className="mb-3 mt-2 text-[#0B0F18]">
                Enter registered email address to get the OTP for reset password
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <CommonInput
                    id="email_phone"
                    name="email_phone"
                    type="email_phone"
                    value={form.email_phone}
                    onChange={handleChange}
                    label="Email Address / Phone"
                    error={error.email_phone}
                    classNames="px-4 py-2 sm:px-5 sm:py-3"
                    placeholder="Enter your Email or Phone number"
                    isRequired
                  />

                  <div className="text-center">
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

export default ForgotPassword;
