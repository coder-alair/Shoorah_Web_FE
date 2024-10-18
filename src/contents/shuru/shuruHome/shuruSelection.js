import React, { Fragment, useEffect, useState } from "react";
import ShuruMain from "../../../assets/shuru_characters/shoorah/shuru_shoorah_main.svg";
import { useTheme } from "../../context/themeContext";
import { Api } from "../../../api";
import { errorToast } from "../../../utils/helper";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Setting from "./setting";
import ShuruAnimateCircle from "./shuruAnimateCircle";
import ConfirmPopup from "../../../component/common/modals/ConfirmPopup";

import messageLogo from "../../../assets/images/message.svg";
const ShuruSelection = ({ tab, setTab, setItem }) => {
  const { theme } = useTheme();
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const [show, setShow] = useState(false);

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
      className={`relative flex h-auto min-h-[85vh] w-full  grow flex-col items-center gap-y-4  overflow-hidden`}
    >
      <div className="mt-6 flex h-auto w-full scale-90 flex-col  items-center justify-center xl:mt-0">
        <ShuruAnimateCircle setItem={setItem} />
      </div>

      <div
        // style={{ borderRadius: "50% 50% 0 0/90% 90% 0 0" }}
        className={` flex  h-full w-[130%] grow flex-col items-center justify-start rounded-t-[50%]  py-8 text-white ${theme.shoorah_bg_5}`}
      >
        <div className="flex w-screen flex-col gap-6 px-4 xl:w-[50%] xl:px-0">
          <p className="P22Mackinac text-center text-3xl font-medium xl:text-5xl">
            Before We Start...
          </p>
          <p className="mx-auto w-full text-center text-base  lg:text-xl ">
            {user?.name}, if you're open to sharing please <br /> state your
            current mood.
          </p>
          {/* <p className="text-center text-lg">
            If not you can start chat below:
          </p> */}
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={() => {
                setTab(3);
              }}
              className="flex items-center justify-center gap-3 outline-none"
            >
              <div className="flex h-10 w-10 items-center justify-center  rounded-full  border-2 p-[0.4rem] xl:h-10 xl:w-10 xl:border-[3px]">
                <img
                  className="h-full w-full"
                  id="chat"
                  src={messageLogo}
                  alt="message"
                />
              </div>
              <p className="P22Mackinac text-center text-lg font-medium">
                Start Chat
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

      {/* <img src={theme.shuruStrokeContent} className='absolute inset-y-0 top-[2.5rem] w-[15rem] h-[15rem]' /> */}

      <div className="absolute left-0 top-0 flex w-screen flex-row-reverse items-center justify-between px-4 py-2 lg:w-[95vw] lg:px-[3rem]">
        <button className="">
          <Link
            to="/shuru-profile"
            title="Shuru Profile"
            className={
              "flex  w-full   items-center py-3 text-left text-sm text-gray-700"
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
          className={
            "flex    items-center py-3 text-left text-sm text-gray-700"
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

export default ShuruSelection;
