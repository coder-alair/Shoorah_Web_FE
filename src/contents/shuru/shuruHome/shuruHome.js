import React, { Fragment, useEffect, useState } from "react";
import ShuruMain from "../../../assets/shuru_characters/shoorah/shuru_shoorah_main.svg";
import { useTheme } from "../../context/themeContext";
import { Api } from "../../../api";
import { errorToast } from "../../../utils/helper";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Setting from "./setting";
import Lottie from "lottie-react";
import ConfirmPopup from "../../../component/common/modals/ConfirmPopup";
import messageLogo from "../../../assets/images/message.svg";

const ShuruHome = ({ tab, setTab }) => {
  const { theme } = useTheme();
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    setLoader(true);
    let userData = localStorage.getItem("userData");
    let data = JSON.parse(userData);
    if (userData) {
      Api.getUserProfile(data.id)
        .then((res) => {
          if (res.data.meta.code == 1) {
            setLoader(false);
            setUser(res.data.data);
          } else {
            setLoader(false);
            errorToast(res.data.meta.message);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
    }
    setLoader(false);
  };

  return (
    <div
      className={` relative flex min-h-[85vh] w-full flex-col items-center gap-y-12 overflow-hidden lg:h-[calc(100%-10rem)]  lg:min-h-0  lg:gap-y-8`}
    >
      <div className="mt-12 flex h-auto w-full flex-col items-center justify-center gap-y-2  text-center lg:mt-0 lg:h-[50%]">
        <img
          src={theme.shuruMain}
          className=" h-48 w-48 xl:h-[15rem] xl:w-[15rem]"
        />
      </div>

      <div className="  relative flex h-full w-screen flex-grow items-center justify-center lg:flex-grow-0 ">
        <div
          // style={{ borderRadius: "50% 50% 0 0/90% 90% 0 0" }}
          className={`absolute bottom-[-5px] left-0 z-20 flex h-full w-full scale-x-150 flex-col items-center justify-center rounded-t-[50%] text-white  ${theme.shoorah_bg_5}`}
        ></div>

        <div className="relative z-20 h-full  w-full ">
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative z-20 flex h-full w-full flex-col justify-evenly px-4 text-white   xl:mr-[2rem] xl:w-[50%] xl:px-0 2xl:mr-[3rem]">
              <div className="flex flex-col gap-[1rem] lg:gap-[2rem]">
                <p className="P22Mackinac  text-center text-4xl font-medium lg:text-[3rem]  2xl:text-[3.5rem]">
                  Hey, {user?.name?.split(" ")?.[0]}
                </p>
                <p className="mx-auto w-full px-9 text-center text-base lg:px-0 lg:text-xl">
                  I’m Shuru, Shoorah’s trusty guru,
                  <br className="hidden lg:flex" /> let’s see how I can help
                  you!
                </p>
              </div>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 lg:mt-0 xl:flex-row xl:gap-[5rem]">
                <button
                  onClick={() => {
                    setTab(2);
                  }}
                  className="flex items-center justify-center gap-4 outline-none xl:gap-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center  rounded-full  border-2 p-[0.4rem] xl:h-10 xl:w-10 xl:border-[3px]">
                    <p className="">
                      <img
                        className="h-full w-full"
                        id="chat"
                        src={messageLogo}
                        alt="message"
                      />
                    </p>
                  </div>
                  <p className="P22Mackinac text-center text-lg font-medium">
                    Start New Chat
                  </p>
                  <p className="rotate-180">
                    <svg
                      height="24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <g id="arrow-left-1--arrow-keyboard-left">
                        <path
                          id="Vector 2"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m1 7 12 0"
                        ></path>
                        <path
                          id="Vector"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.996 3C3 4 2 5 1 7c1 2 2 3 3.996 4"
                        ></path>
                      </g>
                    </svg>
                  </p>
                </button>

                <button
                  onClick={() => {
                    history.push("/shuru-profile");
                  }}
                  className="flex items-center justify-center gap-6 outline-none"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-[2px] p-[0.4rem] xl:h-10 xl:w-10 xl:border-[3px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-full w-full"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                      />
                    </svg>
                  </div>
                  <p className="P22Mackinac text-center text-lg font-medium">
                    Recently Chat
                  </p>
                  <p className="rotate-180">
                    <svg
                      height="24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <g id="arrow-left-1--arrow-keyboard-left">
                        <path
                          id="Vector 2"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m1 7 12 0"
                        ></path>
                        <path
                          id="Vector"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.996 3C3 4 2 5 1 7c1 2 2 3 3.996 4"
                        ></path>
                      </g>
                    </svg>
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-0 flex w-screen flex-row-reverse items-center justify-between px-4 py-2 lg:w-[95vw] lg:px-[3rem]">
        <button className="">
          <Link
            to="/shuru-profile"
            title="Shuru Profile"
            className={
              " flex w-full   items-center py-3 text-left text-sm text-gray-700"
            }
          >
            <div className=" h-[2rem] w-[2rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke={theme.shoorah_4}
                  stroklinecap="round"
                  strokeLinejoin="round"
                  d="M7 13.25c-2.404 0-2.904-3.27-2.904-6.25 2.268-.523 3.54-.535 5.808 0 0 2.98-.5 6.25-2.904 6.25Z"
                ></path>
                <path
                  stroke={theme.shoorah_4}
                  stroklinecap="round"
                  strokeLinejoin="round"
                  d="M7 4.596c1.23 0 1.923-.692 1.923-1.923C8.923 1.443 8.231.75 7 .75c-1.23 0-1.923.692-1.923 1.923 0 1.23.692 1.923 1.923 1.923Z"
                ></path>
              </svg>
            </div>
          </Link>
        </button>

        <button
          type="button"
          onClick={() => setShow(!show)}
          title="Leave Shuru"
          className={" flex items-center py-3 text-left text-sm text-gray-700"}
        >
          <div className=" h-[2rem] w-[2rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke={theme.shoorah_4}
                stroklinecap="round"
                strokeLinejoin="round"
                d="M7 4.129C5.74 5.16 5.11 5.79 4.129 7 5.11 8.21 5.74 8.84 7 9.871"
              ></path>
              <path
                stroke={theme.shoorah_4}
                stroklinecap="round"
                d="M10.482 4.135a86.718 86.718 0 0 0-.063-1.54C10.374 1.678 9.6.923 8.587.85a39.976 39.976 0 0 0-5.67 0c-1.012.072-1.787.827-1.833 1.746A88.811 88.811 0 0 0 .977 7c0 1.511.037 2.985.107 4.404.046.92.82 1.674 1.833 1.746a39.962 39.962 0 0 0 5.67 0c1.012-.072 1.787-.827 1.832-1.746.026-.506.046-1.02.063-1.539"
              ></path>
              <path
                stroke={theme.shoorah_4}
                stroklinecap="round"
                strokeLinejoin="round"
                d="M13.023 7 4.161 7"
              ></path>
            </svg>
          </div>
        </button>
      </div>

      <ConfirmPopup
        open={show}
        setOpen={setShow}
        message={"Are you sure you want to leave Shuru ?"}
        setAccepted={(e) => history.push("/home")}
        handleNo={() => {
          setShow(false);
        }}
      />
    </div>
  );
};

export default ShuruHome;
