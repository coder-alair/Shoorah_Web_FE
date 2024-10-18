import React, { Fragment, useEffect, useRef, useState } from "react";
import Loader from "../../../component/common/Loader";
import EditAccount from "./editAccount";
import ChangePasswordModal from "./changePasswordModal";
import { Api } from "../../../api";
import {
  cleanLocalStorage,
  errorToast,
  getDeviceToken,
  getFileType,
  getLocalStorageItem,
  successToast,
  useOutsideClick,
} from "../../../utils/helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../../context/themeContext";
import Header from "../header";
import { GENDER, JOB_ROLES } from "../../../utils/constants";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Country, State, City } from "country-state-city";
import { Transition } from "@headlessui/react";
import { Calendar, DateRangePicker } from "react-date-range";

import { CalendarIcon } from "@heroicons/react/24/outline";
import moment from "moment/moment";

const Account = () => {
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const { theme } = useTheme();
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState();
  const [notifyCheck, setNotifyCheck] = useState(false);
  const [tabs, setTabs] = useState([
    {
      id: 1,
      data: [
        "Access to all features",
        "Mindful meditations",
        "Goal setting & affirmations",
      ],
      time: "Monthly",
      price: 9.99,
      currentPack: "9.99 / Month",
      text: "Montly Plan",
      text1: "1 Month at £9.99/Month",
      text2: "",
      duration: "/Month",
      productId: "com.shoorah.monthly",
    },
    {
      id: 2,
      data: [
        "Saving 50%",
        "Works out at $4.99/month",
        "Access to all features",
      ],
      time: "Annual",
      text: "Annual Plan",
      currentPack: "59.9 / Year",
      price: 59.9,
      text1: "12 Months at £4.99/month",
      text2: "You are saving 50%",
      duration: "/Year",
      productId: "com.shoorah.annually",
    },
    {
      id: 3,
      data: [
        "Saving 30%",
        "Works out at $6.99/month",
        "Access to all features",
      ],
      time: "Half Yearly",
      currentPack: "41.95 / 6 Months",
      price: 41.95,
      text1: "6 Months at £6.99/month",
      text2: "You are saving 70%",
      text: "Half Year Plan",
      duration: "/6 Months",
      productId: "com.shoorah.sixmonths",
    },
    {
      id: 4,
      data: [
        "Saving 30%",
        "Works out at $6.99/month",
        "Access to all features",
      ],
      time: "Lifetime",
      currentPack: "169.99 Lifetime Plan",
      price: 169.99,
      text1: "Full Premium Access",
      text2: "",
      text: "Lifetime Plan",
      duration: "lifetime",
      productId: "com.shoorah.lifetime",
    },
  ]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [filterPlan, setFilterPlan] = useState([]);
  const [filterSubPlan, setFilterSubPlan] = useState(tabs);
  const [isImageDeleted, setImageDeleted] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showEyeIcon, setShowEyeIcon] = useState(false);
  const [showEyeIcon2, setShowEyeIcon2] = useState(false);
  const [showEyeIcon3, setShowEyeIcon3] = useState(false);
  const [showEyeIcon4, setShowEyeIcon4] = useState(false);
  const [pwdData, setPwdData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getTime() - 24 * 3600000),
    endDate: new Date(),
  });

  const handlePwdChange = (e) => {
    setPwdData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [userData, setUserData] = useState({
    firstName: user?.first_name,
    lastName: user?.last_name,
    dob: user?.dob,
    gender: user?.gender,
    profile: user?.profile,
    country: user?.country,
    password: "",
    email: user?.email,
    jobRole: user?.job_role,
  });

  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => {
    if (showFilterModal) setShowFilterModal(!showFilterModal);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "gender") {
      setUserData({ ...userData, [name]: [value] });
    }     else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const getPlan = () => {
    setLoader(true);
    Api.getCurrentPlan().then((res) => {
      if (res.data.meta.code == 1) {
        setLoader(false);
        setCurrentPlan(res.data.data);
        setFilterSubPlan(
          tabs.filter((i) => i.productId != res.data?.data?.productId),
        );
        setFilterPlan(
          tabs.filter((i) => i.productId == res.data?.data?.productId),
        );
      } else {
        setLoader(false);
        errorToast(res.data.meta.message);
      }
    });
  };

  useEffect(() => {
    getUser();
    getPlan();
  }, [refresh]);

  const listOfCountries = Country.getAllCountries();

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
            if (res.data.data.user_profile) {
              setPreview(res.data.data.profile);
            }
            setUserData({
              firstName: res.data.data?.first_name,
              lastName: res.data.data?.last_name,
              dob: res.data.data?.dob,
              gender: res.data.data?.gender,
              profile: res.data.data?.profile,
              country: res.data.data?.country,
              password: "",
              email: res.data.data?.email,
              jobRole: res.data.data?.jobRole,
            });
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

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleClick = () => {
    setLoader(true);
    let payload = {
      ...userData,
      profile: image ? getFileType(image) : null,
      isImageDeleted,
    };

    Api.updateUserWebProfile(payload)
      .then((res) => {
        if (res?.data?.meta?.uploadURL) {
          axios
            .put(res?.data?.meta?.uploadURL, image, {
              headers: {
                "content-type": `${image?.type?.split("/")[0]}/${image?.name?.split(".")[1]
                  }`,
              },
            })
            .then((res) => {
              if (res.status == 200) {
                setLoader(false);
                successToast("Profile Updated Successfully");
                window.location.reload();
                setUserData({ ...userData, password: "" });
              }
            })
            .catch((err) => {
              setLoader(false);
              console.log(err);
              setUserData({ ...userData, password: "" });
              errorToast("Something went wrong with image upload !");
            });
        } else {
          if (res?.data?.meta?.code == 1) {
            successToast(res.data.meta.message);
            getUser();
            window.location.reload();
            setLoader(false);
            setUserData({ ...userData, password: "" });
          } else if (res?.data?.meta?.code == 0) {
            errorToast(res.data.meta.message);
            getUser();
            setLoader(false);
            setUserData({ ...userData, password: "" });

            // window.location.reload();
            window.location.href = "/account";
          } else {
            setLoader(false);
            errorToast(res.data.message);
            setUserData({ ...userData, password: "" });
            window.location.href = "/account";
          }
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (!getLocalStorageItem("token") && !getLocalStorageItem("userData")) {
      history.push("/login");
    }

  }, []);

  const handleImageChange = (event) => {
    if (!event?.target?.files[0].name.match(/\.(jpg|jpeg|png)$/i)) {
      errorToast(
        `The specified file ${event?.target?.files[0].name} could not be uploaded. Please upload JPG, JPEG, PNG image.`,
      );
    } else if (event?.target?.files[0]?.size > 25500000) {
      errorToast(`File size should be less than 1MB`);
    } else {
      const file = event.target.files[0];
      if (file) {
        setImage(file);
        const objectUrl = URL.createObjectURL(event.target.files[0]);
        setPreview(objectUrl);
        setImageDeleted(true);
      }
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    // const { isValid, errors } = changePassValidations(form);
    setLoader(true);
    const payload = {
      oldPassword: pwdData.password,
      newPassword: pwdData.newPassword,
      confirmPassword: pwdData.confirmPassword,
    };
    const response = await Api.changePassword(payload);
    if (response?.data?.meta?.code === 1) {
      setPwdData({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
      setLoader(false);
      window.location.reload();
      successToast(response?.data?.meta?.message);
    } else if (response?.data?.meta?.code === 0) {
      setLoader(false);
      errorToast(response?.data?.meta?.message);
    } else {
      setLoader(false);
    }
  };

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

  const handleSelectRange = (e) => {
    setShowFilterModal(false);
    const formattedDate = moment(e).format("YYYY-MM-DD");

    setUserData({ ...userData, dob: formattedDate });
  };



  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex justify-center">
        <Header
          title={`My Account`}
          backUrl={`/home`}
          goBack={true}
          hide={true}
        />
      </div>
      {loader && <Loader />}

      {/* Star shape */}
      <div
        style={{ rotate: "30deg" }}
        className="absolute right-[-10%] top-[-1rem] z-[-3] w-[14rem] md:w-[20rem]   lg:right-[-4%] lg:top-[2rem] lg:w-[28rem]"
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: starContent }}
        />
      </div>

      {/* Box Shape */}

      <div
        style={{ rotate: "-270deg" }}
        className="absolute left-[-15%] top-[30%] z-[-3] w-[14rem] md:w-[20rem] lg:w-[28rem]"
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>

      {/* Pentagon Shape */}

      <div
        style={{ rotate: "30deg" }}
        className="absolute bottom-[-8rem] left-[40%] z-[-3]  w-[14rem] md:w-[20rem] lg:w-[28rem]"
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: pentagonContent }}
        />
      </div>

      {/* Main Box */}

      {/* className="flex my-[3rem]  flex-wrap gap-5 w-full justify-center  mx-auto" */}
      <div className="mx-auto mt-[6rem] flex w-full grow flex-col justify-start sm:my-[6rem] lg:my-[5rem] lg:flex-row    xl:gap-6  xl:px-24">
        {/* Personal Details box */}

        {/* w-[40rem] 2xl:w-[45rem] rounded-3xl relative py-1 */}
        <div className=" relative w-full rounded-3xl py-1 xl:w-[80%]">
          {/* Image  */}
          <div className="absolute left-4 top-[-4rem] flex h-36 w-full gap-8 xl:left-[3rem]  ">
            <div
              style={{
                boxShadow:
                  "0 1px 10px 0 rgba(0, 0, 0, 0.4), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
              }}
              className="aspect-square h-full  rounded-3xl bg-white"
            >
              {!preview && (
                <div
                  onClick={() => {
                    document.getElementById("file").click();
                  }}
                  className="flex h-[100%] w-[100%] items-center justify-center"
                >
                  <label className="cursor-pointer">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className={`bi bi-plus-lg mx-auto ${theme.shoorah_text_5}`}
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                      />
                    </svg>
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    name="image"
                    accept="image/jpeg,image/jpg,image/png"
                    multiple={false}
                    data-original-title="upload photos"
                    onChange={handleImageChange}
                  />
                </div>
              )}
              {preview && (
                <div className="relative h-full w-full">
                  {preview && (
                    <div
                      onClick={() => {
                        setImage(null);
                        setPreview(null);
                        setImageDeleted(true);
                      }}
                      className={`absolute -left-2 -top-2 z-10 cursor-pointer ${theme.textMsg}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className={`bi ${theme.shoorah_fill_5}`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg>
                    </div>
                  )}
                  <img
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                      setImageDeleted(true);
                    }}
                    src={preview}
                    className="h-[100%] w-[100%] cursor-pointer rounded-3xl object-cover"
                  />
                </div>
              )}
            </div>
            <div className=" mt-[1rem] hidden flex-col justify-center gap-10 xl:flex">
              <p className="P22Mackinac text-left text-2xl font-semibold tracking-wide">
                Personal Details
              </p>
              <p className="text-left text-xl font-normal">
                Change Details:
                <br />
                <span className="P22Mackinac text-[10px]">*Required</span>
              </p>
            </div>
          </div>

          {/* Personal Section */}
          <div
            style={{
              boxShadow:
                "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
            }}
            className="flex w-full flex-col items-center  border bg-white px-2 xl:rounded-[3rem] "
          >
            <div className="mt-[7rem] flex w-full flex-col items-center gap-6 px-2 xl:px-[3rem]">
              <div
                style={{
                  boxShadow:
                    "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                }}
                className="flex w-full items-center justify-around gap-4 overflow-hidden rounded-[3rem] border  pl-6"
              >
                <p className="P22Mackinac w-auto whitespace-nowrap text-xs font-normal text-gray-400">
                  First Name
                  <span className="text-red-500">
                    <span className="text-red-500">*</span>
                  </span>
                </p>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter first name"
                  name="firstName"
                  defaultValue={user?.first_name}
                  className=" P22Mackinac w-full grow  py-2 text-base font-medium capitalize outline-none placeholder:text-gray-400 xl:text-xl"
                />
              </div>

              <div
                style={{
                  boxShadow:
                    "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                }}
                className="flex w-full items-center justify-around gap-4 overflow-hidden rounded-[3rem] border  pl-6"
              >
                <p className="P22Mackinac w-auto whitespace-nowrap text-xs font-normal text-gray-400">
                  Last Name<span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter last name"
                  name="lastName"
                  defaultValue={user?.last_name}
                  className=" P22Mackinac w-full grow py-2 text-base font-medium capitalize outline-none placeholder:text-gray-400 xl:text-xl"
                />
              </div>

              <div
                style={{
                  boxShadow:
                    "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                }}
                className="flex w-full items-center justify-around  gap-3 overflow-hidden rounded-[3rem] border  pl-6"
              >
                <p className="P22Mackinac w-auto whitespace-nowrap  text-xs font-normal text-gray-400">
                  Email Address<span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  placeholder="Enter Email Address"
                  onChange={handleChange}
                  name="email"
                  defaultValue={user?.email}
                  className=" P22Mackinac w-full grow py-2 text-base font-medium capitalize outline-none placeholder:text-gray-400 xl:text-xl"
                />
              </div>

              <div
                style={{
                  boxShadow:
                    "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                }}
                className="flex w-full items-center justify-around  gap-3 overflow-hidden rounded-[3rem] border pr-3 pl-6"
              >
                <p className="P22Mackinac w-auto whitespace-nowrap  text-xs font-normal text-gray-400">
                  Job Role<span className="text-red-500">*</span>
                </p>
                <select
                  className="bg-white P22Mackinac text-base font-medium  w-full outline-none rounded-md h-10 px-2 pr-4 capitalize"
                  onChange={handleChange}
                  value={userData?.jobRole}
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

              <div className="relative w-full">
                <div
                  style={{
                    boxShadow:
                      "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                  }}
                  className="flex w-full items-center justify-around gap-4 overflow-hidden rounded-[3rem] border  pl-6"
                >
                  <p className="P22Mackinac text-base font-medium w-auto whitespace-nowrap text-xs text-gray-400">
                    Date of Birth<span className="text-red-500">*</span>
                  </p>
                  <div
                    onClick={() => setShowFilterModal((state) => !state)}
                    className={`mt-1 text-base font-medium P22Mackinac w-full cursor-pointer appearance-none rounded-3xl px-4 py-3 placeholder-gray-400 outline-none  ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5}`}
                  >
                    {" "}
                    {userData?.dob}
                  </div>
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

              <div className="grid w-full grid-cols-1 gap-5 gap-y-4 xl:grid-cols-2">
                <div
                  style={{
                    boxShadow:
                      "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                  }}
                  className="flex w-full items-center justify-around gap-4 overflow-hidden rounded-[3rem] border  pl-6"
                >
                  <p className="P22Mackinac mr-1 w-auto whitespace-nowrap text-xs font-normal text-gray-400">
                    Gender<span className="text-red-500">*</span>
                  </p>
                  {/* <div className='' onClick={()=>setShow(!show)}>Male</div> */}
                  <select
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    onChange={handleChange}
                    value={userData?.gender}
                    defaultValue={userData?.gender?.[0]}
                    className={` ${!userData?.gender && "text-gray-400"
                      } P22Mackinac w-full grow appearance-none bg-white py-2 text-base font-medium outline-none placeholder:text-gray-400 xl:text-xl`}
                  >
                    <option value={null} disabled selected hidden>
                      Please Select
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
                <div
                  style={{
                    boxShadow:
                      "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                  }}
                  className="flex w-full  items-center justify-around gap-4 overflow-hidden rounded-[3rem] border  pl-6"
                >
                  <p className="P22Mackinac mr-1 w-auto whitespace-nowrap text-xs font-normal text-gray-400">
                    Country<span className="text-red-500">*</span>
                  </p>
                  <select
                    type="text"
                    placeholder="Country"
                    onChange={handleChange}
                    name="country"
                    defaultValue={userData?.country}
                    value={userData?.country}
                    className={` ${!userData?.country && "text-gray-400"
                      } P22Mackinac w-full grow appearance-none bg-white py-2 text-base font-medium outline-none placeholder:text-gray-400 xl:text-xl`}
                  >
                    <option value={null} disabled selected hidden>
                      Please Select
                    </option>
                    {listOfCountries?.map(({ name, flag, isoCode }) => (
                      <option className="text-black" key={isoCode} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                style={{
                  boxShadow:
                    "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                }}
                className="relative flex w-full items-center justify-around gap-4 overflow-hidden rounded-[3rem] border  pl-6"
              >
                <p className="P22Mackinac w-auto whitespace-nowrap text-xs font-normal text-gray-400">
                  Current Password<span className="text-red-500">*</span>
                </p>
                <input
                  type={showEyeIcon ? "text" : "password"}
                  onChange={handleChange}
                  defaultValue={userData.password}
                  placeholder="Password"
                  name="password"
                  className=" P22Mackinac w-full grow py-2 pr-[40px] text-base font-medium outline-none placeholder:text-gray-400 xl:text-xl"
                />

                {showEyeIcon ? (
                  <EyeSlashIcon
                    onClick={() => setShowEyeIcon(false)}
                    className={`absolute w-[20px] cursor-pointer ${theme.shoorah_text_5} top-1/2 -translate-y-1/2 transform ${"right-[10px]"}`}
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowEyeIcon(true)}
                    className={`absolute w-[20px] cursor-pointer ${theme.shoorah_text_5} top-1/2 -translate-y-1/2 transform ${"right-[10px]"}`}
                  />
                )}
              </div>

              <div className="ml-10 mt-6 flex w-full items-center gap-2">
                <div
                  onClick={() => setNotifyCheck(!notifyCheck)}
                  className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border ${notifyCheck ? theme.shoorah_bg_5 : `bg-white`
                    }`}
                >
                  {notifyCheck && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.795365 11.3882L6.38386 17.4533C6.38386 17.4533 9.96556 6.85147 17.0165 1.5438"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <p className="P22Mackinac pt-1 text-xs font-normal">
                  Send me exclusive offers and app news by email
                </p>
              </div>

              <div className="mt-6 flex  w-full items-center gap-2">
                <button
                  onClick={handleClick}
                  className={`${theme.shoorah_bg_5}  P22Mackinac w-[15rem] rounded-[3rem] py-2 text-base font-medium text-white xl:text-xl`}
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-8 flex w-full flex-col items-center gap-3 px-4 xl:mt-16 xl:px-[3.5rem]">
              <p className="P22Mackinac mb-6 mt-[1rem] w-full text-left text-xl font-medium">
                Change Password
              </p>

              <div
                style={{
                  boxShadow:
                    "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                }}
                className="relative flex w-full items-center justify-around gap-4 overflow-hidden rounded-[3rem] border  pl-6"
              >
                <p className="P22Mackinac w-auto whitespace-nowrap text-xs font-normal text-gray-400">
                  Current Password<span className="text-red-500">*</span>
                </p>
                <input
                  type={showEyeIcon2 ? "text" : "password"}
                  onChange={handlePwdChange}
                  name="password"
                  placeholder="Current password"
                  className=" P22Mackinac w-full grow py-2 pr-[40px] text-base font-medium outline-none placeholder:text-gray-400 xl:text-xl"
                />

                {showEyeIcon2 ? (
                  <EyeSlashIcon
                    onClick={() => setShowEyeIcon2(false)}
                    className={`absolute w-[20px] cursor-pointer ${theme.shoorah_text_5} top-1/2 -translate-y-1/2 transform ${"right-[10px]"}`}
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowEyeIcon2(true)}
                    className={`absolute w-[20px] cursor-pointer ${theme.shoorah_text_5} top-1/2 -translate-y-1/2 transform ${"right-[10px]"}`}
                  />
                )}
              </div>

              <div
                style={{
                  boxShadow:
                    "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                }}
                className="relative flex w-full items-center justify-around gap-4 overflow-hidden rounded-[3rem] border  pl-6"
              >
                <p className="P22Mackinac w-auto whitespace-nowrap text-xs font-normal text-gray-400">
                  New Password<span className="text-red-500">*</span>
                </p>
                <input
                  type={showEyeIcon3 ? "text" : "password"}
                  onChange={handlePwdChange}
                  name="newPassword"
                  placeholder="New password"
                  className=" P22Mackinac w-full grow py-2 pr-[40px] text-base font-medium outline-none placeholder:text-gray-400 xl:text-xl"
                />
                {showEyeIcon3 ? (
                  <EyeSlashIcon
                    onClick={() => setShowEyeIcon3(false)}
                    className={`absolute w-[20px] cursor-pointer ${theme.shoorah_text_5} top-1/2 -translate-y-1/2 transform ${"right-[10px]"}`}
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowEyeIcon3(true)}
                    className={`absolute w-[20px] cursor-pointer ${theme.shoorah_text_5} top-1/2 -translate-y-1/2 transform ${"right-[10px]"}`}
                  />
                )}
              </div>

              <p className="ml-8 w-full text-left text-[0.5rem] font-normal">
                Minimum 8 characters containing letters and numbers and at least
                one special character
              </p>

              <div
                style={{
                  boxShadow:
                    "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                }}
                className="relative flex w-full items-center justify-around gap-4 overflow-hidden rounded-[3rem] border  pl-6"
              >
                <p className="P22Mackinac w-auto whitespace-nowrap text-xs font-normal text-gray-400">
                  Confirm Password<span className="text-red-500">*</span>
                </p>
                <input
                  type={showEyeIcon4 ? "text" : "password"}
                  onChange={handlePwdChange}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className=" P22Mackinac w-full grow py-2 pr-[40px] text-base font-medium outline-none placeholder:text-gray-400 xl:text-xl"
                />
                {showEyeIcon4 ? (
                  <EyeSlashIcon
                    onClick={() => setShowEyeIcon4(false)}
                    className={`absolute w-[20px] cursor-pointer ${theme.shoorah_text_5} top-1/2 -translate-y-1/2 transform ${"right-[10px]"}`}
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowEyeIcon4(true)}
                    className={`absolute w-[20px] cursor-pointer ${theme.shoorah_text_5} top-1/2 -translate-y-1/2 transform ${"right-[10px]"}`}
                  />
                )}
              </div>

              <div className="mb-6 mt-6 flex  w-full items-center gap-2">
                <button
                  onClick={handlePassword}
                  className={`${theme.shoorah_bg_5}  P22Mackinac w-[15rem] rounded-[3rem] py-2  text-base font-medium text-white xl:text-xl`}
                  disabled={
                    !(
                      pwdData.password.length > 0 &&
                      pwdData.newPassword.length > 0 &&
                      pwdData.confirmPassword.length > 0
                    )
                  }
                  style={{
                    cursor:
                      pwdData.password.length > 0 &&
                        pwdData.newPassword.length > 0 &&
                        pwdData.confirmPassword.length > 0
                        ? "pointer"
                        : "not-allowed",
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Second Box */}
        {/* w-[35rem] 2xl:w-[40rem] py-1 */}
        <div className="  py-1">
          <div className=" flex h-full w-full flex-col items-center gap-5 rounded-[3rem] lg:h-fit xl:flex">
            {/* Subscription box */}

            <div
              style={{
                boxShadow:
                  "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
              }}
              className="flex h-auto w-full flex-col items-center gap-6  border  bg-white px-6 py-4 md:pb-6 lg:rounded-[3rem] lg:px-0  lg:pl-10  lg:pr-[2rem]"
            >
              <p className="P22Mackinac w-full text-left text-xl font-medium">
                Current Subscription
              </p>
              <p className="P22Mackinac w-full text-left  text-sm font-normal lg:text-xl">
                You are currently subscribed to:{" "}
              </p>

              <div
                className={`relative flex h-[9rem] md:h-[8rem] min-h-28 w-full flex-col justify-evenly pl-4 ${theme.shoorah_bg_7} overflow-hidden rounded-3xl`}
              >
                <div className={`absolute z-40 bottom-[1rem] right-[2rem]`}>
                  <p
                    onClick={() => {
                      history.push("/subscription");
                    }}
                    className="P22Mackinac cursor-pointer text-[0.7rem] font-normal text-white underline decoration-gray-300 underline-offset-1"
                  >
                    Change your subscription
                  </p>
                </div>
                <div
                  className={`absolute right-[-8rem] top-[-2rem] h-[350px] w-[350px] rounded-full ${theme.shoorah_bg_5}`}
                ></div>



                <div className="relative py-5 z-20 flex flex-col gap-2">
                  {(filterPlan.length && currentPlan?.accountType == 'SUBSCRIBED') ? (
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5  items-center justify-center rounded-md ${theme.shoorah_bg_5}`}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.795365 11.3882L6.38386 17.4533C6.38386 17.4533 9.96556 6.85147 17.0165 1.5438"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>

                      {user.company_id ?
                        <>
                          <p className="P22Mackinac text-base font-medium text-white lg:text-xl ">
                            {user?.companyName}
                          </p>
                        </> :
                        <p className="P22Mackinac text-base font-medium text-white lg:text-xl ">
                          £ {filterPlan[0]?.currentPack}
                        </p>
                      }
                    </div>
                  ) : (
                    <p className="P22Mackinac text-base font-medium text-white lg:text-xl ">
                      You are not Subscribed
                    </p>
                  )}

                  {user.company_id ?
                    <>
                      <div className="flex  flex-col justify-center">

                        <p className="P22Mackinac  text-md font-medium text-white">
                          You are a part of Business Pro Plan
                        </p>
                        <p className="P22Mackinac  w-[50%]  text-sm font-medium text-white">
                          For more info. please reach out to abc@yopmail.com
                        </p>
                      </div>

                    </>

                    :
                    <>
                      {(filterPlan.length && currentPlan?.accountType == 'SUBSCRIBED') ? (
                        <div className="flex flex-col justify-center">
                          <p className="P22Mackinac w-[50%]  text-base font-medium text-white">
                            {filterPlan[0]?.text1}
                          </p>
                          <p className="P22Mackinac  w-[50%]  text-base font-medium text-white">
                            {filterPlan[0]?.text2}
                          </p>
                        </div>
                      ) : null}
                    </>
                  }



                </div>
              </div>
            </div>

            {/* Customer support box */}

            <div
              style={{
                boxShadow:
                  "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
              }}
              className="flex h-auto w-full flex-col   items-center gap-6  border bg-white px-6 py-4  lg:rounded-[3rem]  lg:px-10"
            >
              <p className="P22Mackinac w-full text-left text-xl font-medium">
                Customer Care
              </p>
              <div className="flex w-full flex-col gap-4">
                <p
                  onClick={() => history.push("/faqs")}
                  className="P22Mackinac w-full cursor-pointer text-left text-base font-normal text-shoorah-black underline  decoration-gray-300 underline-offset-2 lg:text-xl "
                >
                  FAQs
                </p>
                <p
                  onClick={() => window.open("mailto:info@shoorah.io")}
                  className="P22Mackinac w-full cursor-pointer text-left text-base font-normal text-shoorah-black underline  decoration-gray-300 underline-offset-2 lg:text-xl"
                >
                  Contact Customer Care
                </p>
              </div>
            </div>

            {/* Shoorah Insider box */}

            <div
              style={{
                boxShadow:
                  "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
              }}
              className="flex h-auto w-full flex-col items-center justify-evenly gap-6  border bg-white  px-6 py-4 pb-6 lg:rounded-[3rem] lg:px-0  lg:pl-10"
            >
              <div className="flex flex-col gap-2">
                <p className="P22Mackinac w-full text-left text-xl font-medium">
                  Become a Shoorah Insider
                </p>
                <p className="P22Mackinac w-full pr-[8rem] text-left text-sm font-normal lg:text-base">
                  Sign up to access unmissable offers, app news and
                  one-of-a-kind exclusives.
                </p>
              </div>
              <div className="flex w-full items-center gap-2  rounded-[3rem]">
                <p className="P22Mackinac  text-xs font-normal text-gray-400">
                  Email Address*
                </p>
                <p className="P22Mackinac rounded-3xl py-1 text-base font-medium capitalize outline-none  lg:text-xl">
                  {user?.email}
                </p>
              </div>

              <div className="flex w-full items-center gap-2">
                <div
                  onClick={() => setNotifyCheck(!notifyCheck)}
                  className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border ${notifyCheck ? theme.shoorah_bg_5 : `bg-white`
                    }`}
                >
                  {notifyCheck && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.795365 11.3882L6.38386 17.4533C6.38386 17.4533 9.96556 6.85147 17.0165 1.5438"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <p className="P22Mackinac pt-1 text-xs font-normal">
                  Send me exclusive offers and app news by email
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
