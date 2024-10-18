import React from "react";
import chatbotgirl from "../../assets/images/chatbotgirl.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";

const ChatbotSection = () => {
  const history = useHistory();
  const { theme } = useTheme();
  return (
    <div className="flex w-full items-center justify-center px-4">
      <div
        className={`relative mb-[1.5rem] mt-[4rem] flex flex-col   justify-center py-2 lg:h-[6rem] xl:h-[8rem] lg:py-4  ${theme.shoorah_bg_5} mx-auto  w-full overflow-hidden xl:rounded-[3rem] rounded-2xl xl:w-[50%]  `}
      >
        <div
          className={` absolute -right-8 aspect-square w-1/2 -translate-y-1/3 scale-[1.4] rounded-full lg:-right-4   ${theme.shoorah_bg_2}`}
        ></div>

        <div className="flex items-center justify-evenly gap-4 lg:px-4">
          <div
            className={`relative flex h-full w-full items-center justify-between px-4  outline-none  xl:px-0 `}
          >
            <div className="flex w-1/2 items-center justify-start xl:justify-center gap-x-6 text-center text-[#fff]  xl:text-4xl">
              <img
                src={theme.shuruContent}
                className="h-12 w-12 xl:h-[70px] xl:w-[90px] "
              />
              <p className="z-10  text-2xl xl:text-3xl ">SHURU</p>
            </div>
            <div className="relative z-40  flex w-1/2 items-center justify-end  xl:mr-[4rem] p-8 outline-none ">
              <div
                onClick={() => history.push("/shuru")}
                className={`absolute right-0 w-auto bg-[#fff] text-center text-sm ${theme.shoorah_text_5} xl:text-md flex cursor-pointer items-center justify-center rounded-[2rem] px-2 py-1 lg:px-4 lg:py-2`}
                style={{ zIndex: 10 }}
              >
                <p className=" P22Mackinac text-sm xl:text-xl">Chat Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSection;
