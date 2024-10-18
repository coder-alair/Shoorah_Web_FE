import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";
import ConfirmPopup from "../../component/common/modals/ConfirmPopup";

const Header = ({ title, hide, goBack, backUrl, logout, home }) => {
  const history = useHistory();
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="mt-[1rem] flex w-full justify-between  px-5 md:mt-[2.5rem] lg:mb-[1rem] xl:w-[90vw]">
      {goBack && (
        <button className="flex items-center" onClick={() => history.goBack()}>
          <svg
            className="h-[16px] w-[18px] sm:h-[20px] sm:w-[24px]"
            viewBox="0 0 17 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25 7.27429L16.25 7.27429"
              stroke={`${theme.strokeColor2}`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.30078 13.2988C7.30078 13.2988 1.25078 10.0378 1.25078 7.27576C1.25078 4.51176 7.30078 1.24976 7.30078 1.24976"
              stroke={`${theme.strokeColor2}`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      {!goBack && (
        <button
          className="flex items-center"
          onClick={() => {
            history.replace(backUrl);
          }}
        >
          <svg
            className="h-[16px] w-[18px] sm:h-[20px] sm:w-[24px]"
            viewBox="0 0 17 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25 7.27429L16.25 7.27429"
              stroke={`${theme.strokeColor2}`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.30078 13.2988C7.30078 13.2988 1.25078 10.0378 1.25078 7.27576C1.25078 4.51176 7.30078 1.24976 7.30078 1.24976"
              stroke={`${theme.strokeColor2}`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <p className="P22Mackinac text-lg xl:text-[2.2rem] 2xl:text-[2.5rem]">
        {title}
      </p>
      {!hide && (
        <button
          onClick={() => history.push("/me/setting")}
          className="ease duration-500 hover:rotate-90 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-gear h-[22px] w-[22px] sm:h-[28px] sm:w-[28px]"
            viewBox="0 0 16 16"
          >
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
          </svg>
        </button>
      )}
      {hide == true && logout == true ? null : hide == true &&
        logout == false ? null : hide == false ? null : (
          <button>{null}</button>
        )}
      {!logout && null}
      {logout && (
        <button
          onClick={() => setShow(true)}
          className="ease duration-500 hover:translate-x-1 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-box-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
        </button>
      )}

      {!home && (
        <a className={`absolute h-[4rem] w-[4rem] items-center justify-center rounded-full ${theme.shoorah_bg_5} lg:flex hidden right-16 top-5  cursor-pointer`} href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#fff"
            data-slot="icon"
            className="absolute  h-8 w-8 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </a>
      )}

      <ConfirmPopup
        open={show}
        setOpen={setShow}
        message={"Are you sure you want to logout ?"}
        setAccepted={handleLogout}
        handleNo={() => {
          setShow(false);
        }}
      />
    </div>
  );
};

export default Header;
