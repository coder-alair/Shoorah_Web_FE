import React, { Fragment, useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/themeContext";
import ShuruMain from "../../../assets/shuru_characters/shoorah/shuru_shoorah_main.svg";
import Setting from "./setting";
import Lottie from "lottie-react";
import { Api } from "../../../api";
import Loader from "../../../component/common/Loader";
import { useAudio } from "../../context/audiobar";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ConfirmPopup from "../../../component/common/modals/ConfirmPopup";
import { TypeAnimation } from "react-type-animation";

const ChatScreen = ({ tab, item, currentMood, setItem }) => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const [mood, setMood] = useState(theme.shuruContent);
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const history = useHistory();
  const [askCount, setAsk] = useState(0);
  const [loader, setLoader] = useState(false);
  const chatContainerRef = useRef(null);
  const { audioNav } = useAudio();
  const [time, setTime] = useState();
  const [waitMessage, setWaitMessage] = useState(false);

  function getTimeBaseDay() {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 7 && currentHour < 12) {
      return "morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "afternoon";
    } else if (currentHour >= 17 && currentHour < 20) {
      return "evening";
    } else {
      return "latenight";
    }
  }

  const getMood = () => {
    switch (currentMood?.name) {
      case "angry":
        setMood(theme.shuruStrokeAngry);
        break;
      case "content":
        setMood(theme.shuruStrokeContent);
        break;
      case "anxious":
        setMood(theme.shuruStrokeAnxious);
        break;
      case "surprised":
        setMood(theme.shuruStrokeSurprised);
        break;
      case "stress":
        setMood(theme.shuruStress);
        break;
      case "sad":
        setMood(theme.shuruStrokeSad);
        break;
      case "happy":
        setMood(theme.shuruStrokeHappy);
        break;
      case "tired":
        setMood(theme.shuruStrokeTired);
        break;
      case "excited":
        setMood(theme.shuruStrokeExcited);
        break;
      default:
        setMood(theme.shuruStrokeContent);
        break;
    }
  };

  useEffect(() => {
    getMood();
    setChatMood();
  }, [item]);

  const setChatMood = () => {
    const payload = {
      moodid: currentMood?.id,
      time: getTimeBaseDay(),
    };
    Api.shuruSetMood(payload).then((res) => {
      setChat([{ message: res.data.data, id: 1, user: "Bot" }]);
    });
  };

  const handleAsk = () => {
    if (!text.replace(/\s/g, "").length) {
      setText("");
      return;
    }
    const chats = [...chat];
    chats.push({ message: text, id: 2, user: "User" });
    setChat(chats);
    setText("");

    setTimeout(() => {
      setWaitMessage(true);
      const chats = [...chat];
      chats.push({ message: text, id: 2, user: "User" });
      chats.push({ message: "", id: 1, user: "Bot", isLoading: true });
      setChat(chats);
    }, 1000);

    setTimeout(() => {
      const payload = {
        isSessionStart: true,
        message: text,
        to: "bot",
      };
      Api.shuruAsk(payload).then((res) => {
        // setChat([{ message: res.data.data, id: 1,user:'Bot' }])
        const chats = [...chat];
        if (chats[chats.length - 1].isLoading) {
          chats.pop();
        }

        chats.push({ message: text, id: 2, user: "User" });
        chats.push({ message: res.data.data, id: 1, user: "Bot" });
        setChat(chats);
        setText("");
        setWaitMessage(false);
      });
    }, 2000);
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chat]);

  return (
    <div
      className={`relative flex min-h-[80vh] w-full  flex-grow flex-col  overflow-hidden   overflow-y-auto 2xl:min-h-[84vh]`}
    >
      {/* header div */}
      <div className="relative h-36 w-screen lg:mb-8 lg:h-[13rem] xl:mb-20">
        <div
          // style={{ borderRadius: "0 0 50% 50% /0 0 90% 90%" }}
          className={` absolute inset-0 h-20 w-screen scale-110 rounded-b-[50%] text-white lg:h-32  ${theme.shoorah_bg_5} z-10`}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative h-full w-screen ">
              <div className=" absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2 translate-y-1/2 self-end lg:h-[12rem] lg:w-[12rem]">
                <img src={mood} alt="mood" className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`relative z-20 flex h-[13rem] w-screen flex-col items-center justify-center text-white `}
        >
          <div className=" h-full w-full">
            <button
              type="button"
              title="Leave Shuru"
              onClick={() => setShow(!show)}
              className={
                "absolute left-4 top-2 flex items-center justify-center py-3 text-gray-700 xl:left-8 xl:top-[2rem]"
              }
            >
              <div className="mr-2 h-[2rem] w-[2rem]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke={`#fff`}
                    stroklinecap="round"
                    strokeLinejoin="round"
                    d="M7 4.129C5.74 5.16 5.11 5.79 4.129 7 5.11 8.21 5.74 8.84 7 9.871"
                  ></path>
                  <path
                    stroke={`#fff`}
                    stroklinecap="round"
                    d="M10.482 4.135a86.718 86.718 0 0 0-.063-1.54C10.374 1.678 9.6.923 8.587.85a39.976 39.976 0 0 0-5.67 0c-1.012.072-1.787.827-1.833 1.746A88.811 88.811 0 0 0 .977 7c0 1.511.037 2.985.107 4.404.046.92.82 1.674 1.833 1.746a39.962 39.962 0 0 0 5.67 0c1.012-.072 1.787-.827 1.832-1.746.026-.506.046-1.02.063-1.539"
                  ></path>
                  <path
                    stroke={`#fff`}
                    stroklinecap="round"
                    strokeLinejoin="round"
                    d="M13.023 7 4.161 7"
                  ></path>
                </svg>
              </div>
            </button>

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
        </div>
        <button className="absolute right-4 top-4 z-20 xl:right-16 xl:top-[2rem] 2xl:right-8">
          <Link
            to="/shuru-profile"
            title="Shuru Profile"
            className={
              "flex  w-full   items-center text-left  text-sm text-gray-700"
            }
          >
            <div className="mr-2 h-[2rem] w-[2rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke={"#fff"}
                  stroklinecap="round"
                  strokeLinejoin="round"
                  d="M7 13.25c-2.404 0-2.904-3.27-2.904-6.25 2.268-.523 3.54-.535 5.808 0 0 2.98-.5 6.25-2.904 6.25Z"
                ></path>
                <path
                  stroke={"#fff"}
                  stroklinecap="round"
                  strokeLinejoin="round"
                  d="M7 4.596c1.23 0 1.923-.692 1.923-1.923C8.923 1.443 8.231.75 7 .75c-1.23 0-1.923.692-1.923 1.923 0 1.23.692 1.923 1.923 1.923Z"
                ></path>
              </svg>
            </div>
          </Link>
        </button>
      </div>

      <div className=" flex w-[100%] flex-grow justify-center px-4  lg:px-0 ">
        <div
          className={`relative flex w-full flex-col items-center justify-around rounded-t-[3rem] border px-4 py-2 xl:w-[90%] xl:px-0 ${theme.shoorah_bg_2}`}
        >
          <div
            ref={chatContainerRef}
            className={`scrollbar relative flex h-full w-[100%] flex-col gap-[1rem] overflow-y-scroll py-2 lg:max-h-[25vh] xl:max-h-[20vh] xl:px-[3rem] 2xl:max-h-[30vh]`}
          >
            {chat.map((i) => (
              <Fragment key={i.id} className="relative text-sm">
                {i.id == 1 ? (
                  <div
                    style={{ borderRadius: "1.5rem 3rem 3rem 4rem" }}
                    className="w-full bg-white  p-3 px-8 text-gray-500 xl:w-[60%]"
                  >
                    <p className="">
                      {i.isLoading ? (
                        <p className="flex animate-pulse gap-3">
                          <div
                            className={`h-3 w-3 ${theme.shoorah_bg_5} rounded-full`}
                          ></div>
                          <div
                            className={`h-3 w-3 ${theme.shoorah_bg_4} rounded-full`}
                          ></div>
                          <div
                            className={`h-3 w-3 ${theme.shoorah_bg_5} rounded-full`}
                          ></div>
                        </p>
                      ) : (
                        <TypeAnimation
                          style={{ whiteSpace: "pre-line", display: "block" }}
                          sequence={[
                            i.message, // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
                            1000,
                          ]}
                          repeat={0}
                          speed={80}
                        />
                      )}
                    </p>
                  </div>
                ) : (
                  <p
                    style={{ borderRadius: "3rem 4rem 1.5rem 3rem" }}
                    className={` max-w-full self-end p-3 px-8 text-white xl:w-[60%] ${theme.shoorah_bg_4}`}
                  >
                    {i.message}
                  </p>
                )}
              </Fragment>
            ))}
          </div>

          <div
            className={`w-[100%]  ${
              audioNav && `mb-[8rem]`
            } flex items-center justify-around gap-[1rem] self-center xl:px-[3rem]`}
          >
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter" && text.trim() !== "") {
                  handleAsk();
                }
              }}
              disabled={waitMessage}
              placeholder="Type a message..."
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="w-[90%] rounded-[3rem] p-3 py-4 pl-8 outline-none"
            />

            <button
              onClick={handleAsk}
              disabled={waitMessage}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white hover:bg-gray-300 "
            >
              <svg
                className="h-7 w-7"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 122.88 103.44"
                fill={theme.shoorah_7}
              >
                <g>
                  <path d="M69.49,102.77L49.8,84.04l-20.23,18.27c-0.45,0.49-1.09,0.79-1.8,0.79c-1.35,0-2.44-1.09-2.44-2.44V60.77L0.76,37.41 c-0.98-0.93-1.01-2.47-0.09-3.45c0.31-0.33,0.7-0.55,1.11-0.67l0,0l118-33.2c1.3-0.36,2.64,0.39,3.01,1.69 c0.19,0.66,0.08,1.34-0.24,1.89l-49.2,98.42c-0.6,1.2-2.06,1.69-3.26,1.09C69.86,103.07,69.66,102.93,69.49,102.77L69.49,102.77 L69.49,102.77z M46.26,80.68L30.21,65.42v29.76L46.26,80.68L46.26,80.68z M28.15,56.73l76.32-47.26L7.22,36.83L28.15,56.73 L28.15,56.73z M114.43,9.03L31.79,60.19l38.67,36.78L114.43,9.03L114.43,9.03z" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
