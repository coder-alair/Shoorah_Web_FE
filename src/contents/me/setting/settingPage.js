import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  errorToast,
  getLocalStorageItem,
  successToast,
} from "../../../utils/helper";
import { Api } from "../../../api";
import Loader from "../../../component/common/Loader";
import ConfirmPopup from "../../../component/common/modals/ConfirmPopup";
import { useTheme } from "../../context/themeContext";
import Header from "../header";
import notificationSvg from "../../../assets/svg/notification.svg";
import personalizeSvg from "../../../assets/svg/pallete.svg";
import accountSvg from "../../../assets/svg/account.svg";
import voucherSvg from "../../../assets/svg/voucher.svg";
import review from "../../../assets/svg/review.svg";
import deleteAccountSvg from "../../../assets/svg/delete.svg";
import termsSvg from "../../../assets/svg/title.svg";
import { useAuth } from "../../context/user";

const SettingPage = () => {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { theme } = useTheme();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    history.replace("/login");
  };

  const deleteAccount = () => {
    setLoader(true);
    Api.deleteLoggedInUser().then((res) => {
      if (res.data.meta.code == 1) {
        setLoader(false);
        successToast(res.data.meta.message);
        localStorage.clear();
        history.replace("/login");
      } else {
        setLoader(false);
        errorToast(res.data.meta.message);
      }
    });
  };

  useEffect(() => {
    if (!getLocalStorageItem("token") && !getLocalStorageItem("userData")) {
      history.push("/login");
    }
  }, []);

  const options = [
    {
      name: "Notifications",
      border: true,
      function: () => history.push("/notifications"),
      logo: notificationSvg,
    },
    {
      name: "Personalisations",
      border: true,
      function: () => history.push("/personalize"),
      logo: personalizeSvg,
    },
    {
      name: "Account",
      border: true,
      function: () => history.push("/account"),
      logo: accountSvg,
    },
    {
      name: "Subscription",
      border: true,
      function: () => history.push("/subscription"),
      logo: voucherSvg,
    },
    {
      name: "Leave us a Review",
      border: true,
      function: () =>
        window.open("https://uk.trustpilot.com/evaluate/shoorah.io", "_blank"),
      logo: review,
    },
    {
      name: "Delete Account",
      border: true,
      url: "/del-account",
      function: () => setConfirmDelete(true),
      logo: deleteAccountSvg,
    },
    {
      name: "Legals",
      border: false,
      function: () => history.push("/legals"),
      logo: termsSvg,
    },
  ];

  const starContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
    
    <svg
       version="1.1"
       id="svg2"
       viewBox="0 0 1440 1440"
       sodipodi:docname="Shoorah_Shape_6.ai"
       xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
       xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:svg="http://www.w3.org/2000/svg">
      <defs
         id="defs6">
        <clipPath
           clipPathUnits="userSpaceOnUse"
           id="clipPath16">
          <path
             d="M 0,1080 H 1080 V 0 H 0 Z"
             id="path14" />
        </clipPath>
      </defs>
      <sodipodi:namedview
         id="namedview4"
         pagecolor="#ffffff"
         bordercolor="#000000"
         borderopacity="0.25"
         inkscape:showpageshadow="2"
         inkscape:pageopacity="0.0"
         inkscape:pagecheckerboard="0"
         inkscape:deskcolor="#d1d1d1" />
      <g
         id="g8"
         inkscape:groupmode="layer"
         inkscape:label="Shoorah_Shape_6"
         transform="matrix(1.3333333,0,0,-1.3333333,0,1440)">
        <g
           id="g10">
          <g
             id="g12"
             clip-path="url(#clipPath16)">
            <g
               id="g18"
               transform="translate(521.5967,987.506)">
              <path
                 d="m 0,0 c 20.898,1.528 41.033,-5.669 58.768,-18.731 28.293,-20.881 55.696,-42.829 84.254,-63.408 6.291,-4.549 15.302,-7.499 23.245,-7.766 37.373,-1.279 74.817,-0.337 112.155,-1.955 46.169,-1.972 80.414,-32.859 86.669,-77.287 4.799,-33.96 7.909,-68.117 12.76,-102.042 1.049,-7.126 4.941,-15.035 10.147,-20.224 24.098,-24.026 49.636,-46.738 73.805,-70.747 37.551,-37.355 40.695,-79.384 8.086,-121.395 -21.165,-27.315 -44.57,-53.154 -66.341,-80.166 -4.335,-5.385 -7.321,-13.133 -7.499,-19.868 -0.87,-34.761 -0.249,-69.539 -0.942,-104.318 -0.888,-46.951 -37.035,-82.956 -86.83,-87.967 -36.947,-3.714 -73.893,-7.713 -110.768,-12.227 -5.598,-0.675 -11.623,-4.354 -15.87,-8.175 -26.141,-23.511 -51.288,-47.893 -77.838,-71.031 -39.772,-34.707 -87.15,-37.213 -130.476,-6.558 -28.736,20.331 -55.837,42.58 -84.236,63.319 -5.633,4.123 -13.915,6.86 -21.112,7.091 -38.173,1.173 -76.434,0.764 -114.571,2.221 -46.614,1.777 -82.725,35.774 -87.808,81.588 -3.732,33.588 -6.237,67.3 -10.343,100.834 -0.871,7.108 -5.064,14.928 -10.183,20.277 -22.676,23.476 -46.542,45.867 -69.236,69.272 -40.395,41.691 -41.745,83.863 -4.123,128.557 20.916,24.915 43.255,48.782 63.994,73.769 4.727,5.651 8.015,13.826 8.406,20.987 1.688,34.228 1.724,68.544 3.181,102.789 1.973,47.13 36.288,81.304 86.475,86.582 34.565,3.661 69.379,6.255 103.872,10.538 7.909,0.977 16.527,5.242 22.445,10.467 26.373,23.263 51.715,47.627 77.715,71.263 C -45.406,-9.028 -25.449,-0.373 0,0"
                 style="fill:${theme.shoorahShapeColor};fill-opacity:0.59;fill-rule:nonzero;stroke:none"
                 id="path20" />
            </g>
          </g>
        </g>
      </g>
    </svg>`;

  const pentagonContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
    
    <svg
       version="1.1"
       id="svg2"
       width="1440"
       height="1440"
       viewBox="0 0 1440 1440"
       sodipodi:docname="Shoorah_Shape_4.ai"
       xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
       xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:svg="http://www.w3.org/2000/svg">
      <defs
         id="defs6">
        <clipPath
           clipPathUnits="userSpaceOnUse"
           id="clipPath16">
          <path
             d="M 0,1080 H 1080 V 0 H 0 Z"
             id="path14" />
        </clipPath>
      </defs>
      <sodipodi:namedview
         id="namedview4"
         pagecolor="#ffffff"
         bordercolor="#000000"
         borderopacity="0.25"
         inkscape:showpageshadow="2"
         inkscape:pageopacity="0.0"
         inkscape:pagecheckerboard="0"
         inkscape:deskcolor="#d1d1d1" />
      <g
         id="g8"
         inkscape:groupmode="layer"
         inkscape:label="Shoorah_Shape_4"
         transform="matrix(1.3333333,0,0,-1.3333333,0,1440)">
        <g
           id="g10">
          <g
             id="g12"
             clip-path="url(#clipPath16)">
            <g
               id="g18"
               transform="translate(105.6093,714.7515)">
              <path
                 d="m 0,0 c 27.746,53.893 58,114.862 89.892,174.906 19.243,36.211 50.711,59.697 89.275,70.514 128.976,36.192 259.264,59.099 391.769,65.423 42.497,2.025 78.728,-13.459 108.499,-42.613 91.898,-89.931 171.647,-190.293 241.466,-299.081 25.337,-39.412 27.227,-83.433 14.365,-129.073 -33.877,-119.818 -79.421,-235.567 -137.324,-346.997 -23.755,-45.659 -59.909,-75.893 -110.081,-90.104 -125.294,-35.478 -253.094,-55.589 -382.476,-63.167 -48.416,-2.815 -89.66,12.36 -122.805,45.698 -90.181,90.74 -169.45,189.888 -234.97,299.177 -24.834,41.418 -27.996,86.113 -12.263,132.332 C -44.619,-124.214 -23.255,-65.886 0,0"
                 style="fill:${theme.shoorahShapeColor};fill-opacity:0.59;fill-rule:nonzero;stroke:none"
                 id="path20" />
            </g>
          </g>
        </g>
      </g>
    </svg>`;

  const svgContent = `
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
    
    <svg
      version="1.1"
      id="svg2"
      width="1440"
      height="1440"
      viewBox="0 0 1440 1440"
      xmlns="http://www.w3.org/2000/svg">
      <defs
        id="defs6">
        <clipPath
          clipPathUnits="userSpaceOnUse"
          id="clipPath16">
          <path
            d="M 0,1080 H 1080 V 0 H 0 Z"
            id="path14" />
        </clipPath>
      </defs>
      <g
        id="g8"
        transform="matrix(1.3333333,0,0,-1.3333333,0,1440)">
        <g
          id="g10">
          <g
            id="g12"
            clip-path="url(#clipPath16)">
            <g
              id="g18"
              transform="translate(873.2513,202.354)">
              <path
                d="m 0,0 c -129.901,-41.799 -260.349,-82.769 -391.324,-122.891 -126.585,-38.821 -262.742,27.307 -302.694,146.674 -41.535,123.569 -82.562,247.232 -123.004,370.989 -38.915,119.536 30.661,246.083 154.079,283.642 127.961,38.953 255.412,78.736 382.297,119.329 C -158.283,836.885 -26.045,773.489 16.056,655.196 59.532,532.607 103.536,410.131 148.086,287.75 191.223,169.684 125.604,40.404 0,0"
                style="fill:${theme.shoorahShapeColor};fill-opacity:0.59;fill-rule:nonzero;stroke:none"
                id="path20" />
            </g>
          </g>
        </g>
      </g>
    </svg>
    `;

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative  flex justify-center">
        <div className="relative z-30 flex w-full justify-center">
          <Header hide={true} goBack={true} title={`Settings`} />
        </div>
        <div
          style={{ rotate: "20deg", zIndex: "-3 !important" }}
          className="absolute right-[-15%] top-[-4rem] w-[14rem]  md:w-[20rem] lg:top-[-12rem] lg:w-[28rem]"
        >
          <svg
            // width={1440}
            // height={1440}
            viewBox="0 0 1440 1440"
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{ __html: starContent }}
          />
        </div>
      </div>

      <div
        style={{ rotate: "20deg", zIndex: "-3" }}
        className="absolute left-[-10%] top-[20rem] z-[-15]  w-[14rem] md:w-[20rem] lg:w-[28rem]"
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: pentagonContent }}
        />
      </div>

      {loader && <Loader />}
      <p className="P22Mackinac relative z-30 mb-[2rem] mt-[1.5rem] px-4 text-center text-xl md:mt-4 lg:mt-0 xl:px-0 xl:text-[1.4rem] 2xl:text-[1.6rem]">
        You can Manage your setting here, <br className="lg:hidden" />{" "}
        {user?.name}
      </p>

      <div className="z-20 mx-auto flex w-full flex-wrap items-center justify-center gap-x-[2rem] gap-y-4 rounded-3xl px-4 md:py-3 lg:w-[80%] xl:w-[80%] xl:w-[90%] xl:gap-y-[2rem] xl:px-0 2xl:w-[70%] ">
        {options.map((option, index) => (
          <div
            key={option?.name}
            onClick={option?.function}
            style={{
              boxShadow:
                "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
            }}
            className={`z-20 flex w-full cursor-pointer flex-row  items-center justify-start gap-x-4 rounded-[3rem] bg-white px-2 py-2 xl:h-[11rem] xl:w-[14rem] xl:flex-col xl:justify-center xl:gap-[2rem] xl:px-2 xl:py-0 2xl:h-[13rem] 2xl:w-[16rem] `}
          >
            <div
              className={`flex h-[3rem] w-[3rem] items-center justify-center rounded-full 2xl:h-[4rem] 2xl:w-[4rem] ${theme.shoorah_bg_5}`}
            >
              <img
                src={option?.logo}
                className={`fade-in-image mb-1 h-[1.5rem] w-[1.5rem] object-cover contrast-200 saturate-0 2xl:h-[2.5rem] 2xl:w-[2.5rem]`}
              />
            </div>
            <p className="P22Mackinac text-lg xl:text-xl">{option?.name}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto my-[3rem] flex items-center justify-center">
        <button
          onClick={handleLogout}
          className={`P22Mackinac  mx-auto border border-transparent ${theme.shoorah_bg_5} w-1/2 rounded-[3rem]  py-2 text-lg font-medium  text-white shadow-sm sm:py-3 xl:w-[20rem] xl:px-[5rem] xl:py-4 xl:text-2xl ${theme.shoorah_bg_hover_6} focus:outline-none focus:ring-2 ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
        >
          Logout
        </button>

        {/* <button onClick={handleLogout} className='P22Mackinac rounded-3xl px-12 py-4 text-white bg-[#6167e7] w-[80vw]'>Logout</button> */}
      </div>

      <ConfirmPopup
        open={confirmDelete}
        setOpen={setConfirmDelete}
        message={
          "We know at times things can get tough, and it feels easier to just quit.  Are you sure want to give up on your self work journey and delete your account ?"
        }
        setAccepted={(e) => deleteAccount(e)}
        handleNo={() => {
          setConfirmDelete(false);
        }}
      />
    </div>
  );
};

export default SettingPage;
