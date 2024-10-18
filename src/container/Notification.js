import React, { Fragment, useEffect, useState } from "react";
import { Api } from "../api";
import { errorToast, successToast } from "../utils/helper";
import Loader from "../component/common/Loader";
import Pagination from "../component/common/Pagination/Pagination";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/24/outline";
import DeletePopup from "../component/common/modals/DeletePopup";
import LazyLoadImageProp from "../component/common/LazyLoadImage";
import { ReactComponent as NoDataFoundImg } from "../assets/images/no-data-found.svg";
import Header from "../contents/me/header";
import { useTheme } from "../contents/context/themeContext";
import { useAudio } from "../contents/context/audiobar";

import bellIcon from "../assets/images/bell-notification.svg";
import recycleBinIcon from "../assets/images/recycle-bin-1.svg";
import SearchInput from "../component/common/Input/SearchInput";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

const pages = [
  { name: "Notifications", href: "/notifications", current: true },
];
const PAGE_SIZE = 10;

function Notification() {
  const [loader, setLoader] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalRecommend, setTotalRecommend] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [idToDelete, setIdToDelete] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const [selectedNotification, setselectedNotification] = useState(null);
  const { theme } = useTheme();
  const { audioNav } = useAudio();

  // Bg Patterns
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

  const location = useLocation();
  const { state } = location;

  const handlePagination = (pageNumber, pageSize, searchKey) => {
    setLoader(true);
    let search = searchKey.toLowerCase();
    if (
      search.startsWith("#") ||
      search.startsWith("(") ||
      search.startsWith(")") ||
      search.startsWith("$")
    ) {
      errorToast(`Special Character not allowed`);
      setLoader(false);
      return;
    }
    Api.getAllNotifications(pageNumber, pageSize, searchKey).then(
      (response) => {
        if (response?.data?.meta?.code === 1) {
          setCurrentPage(pageNumber);
          setNotificationList(response?.data?.data);
          setTotalCount(response?.data?.meta?.totalNotifications);
          setLoader(false);
        } else if (response?.data?.meta?.code === 0) {
          setCurrentPage(1);
          setNotificationList([]);
          setTotalCount(0);
          setLoader(false);
          errorToast(response?.data?.meta?.message);
        } else {
          setLoader(false);
        }
      },
    );
  };

  const deleteHandler = (id, type) => {
    setIdToDelete(id);
    setDeletePopup(true);
  };

  const handleDeletePopup = () => {
    setLoader(true);
    Api.deleteNotification(idToDelete)
      .then((response) => {
        if (response?.data?.meta?.code === 1) {
          successToast(response?.data?.meta?.message);
          handlePagination(1, PAGE_SIZE, "");
        } else {
          errorToast(response?.data?.meta?.message || "Something went wrong");
        }
      })
      .finally(() => {
        setLoader(false);
        setDeletePopup(false);
      });
    setIdToDelete("");
  };

  useEffect(() => {
    handlePagination(1, PAGE_SIZE, searchValue);
  }, [searchValue]);

  const today = new Date();

  // handlers
  const handleSearchChange = (e) => {
    e.target.value = e.target.value.replace(/^\s+/g, "");
    setSearchValue(e.target.value);
  };

  const unreadNotifications = () => {
    Api.unreadNotifications()
      .then((res) => {
        if (res.data.meta.code == 1) {
          setTotalRecommend(res.data.data);
        } else {
          console.log("error getting notification");
        }
      })
      .catch((err) => {
        console.log("error getting notification");
      });
  };

  const userActivity = () => {
    let payload = {
      featureType: 11
    }
    Api.userActivityStatus(payload).then((res) => {
      if (res.data.meta.code == 1) {
        console.log("success")
      } else {
        console.log("error");
      }
    }).catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    unreadNotifications();
    userActivity();
  }, []);

  return (
    <>
      <div
        className={`${
          audioNav && `mb-[3rem] lg:mb-[6rem]`
        } relative flex w-screen flex-col items-center overflow-hidden lg:mb-[3rem] `}
      >
        {loader && <Loader />}

        <div className="flex w-full justify-center">
          <Header hide={true} home={true} goBack={true} title={`Notifications`} />
        </div>
        {/* greetings */}
        <div className=" flex w-full flex-col items-center justify-between gap-4 px-4  pt-6 xl:w-[90vw] xl:flex-row xl:gap-0 xl:px-8">
          <div>
            <h3 className=" w-full text-center text-3xl font-medium sm:text-4xl md:text-left">
              Welcome
            </h3>
            <p className="mt-2 text-[11px] md:text-base text-gray-400 lg:mt-0">
              {" "}
              {moment(today).format("dddd-Do-MMM-yy")}{" "}
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="w-full">
              <SearchInput
                id={"search-notification"}
                type="text"
                placeholder={"Search"}
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            <div
              className={`h-12 w-12 ${theme.shoorah_bg_5}  flex-shrink-0 rounded-full  p-3`}
            >
              <img src={bellIcon} alt="notification-icon" />
            </div>
          </div>
        </div>
        {/* notification message */}
        <div className="mb-1 flex w-full items-center justify-between px-4 py-3 text-center sm:py-6 md:mb-4 xl:w-[90vw] xl:px-8 xl:text-left">
          <h4 className="text-[13px] py-3 md:text-lg font-normal text-gray-400">
            You’ve got {totalRecommend} recommendations to review for today!
          </h4>
        </div>

        {notificationList?.length > 0 ? (
          <div className=" mx-auto  flex w-full items-center justify-center px-4 xl:w-[90vw] xl:px-5">
            <div className=" w-full  overflow-hidden bg-transparent text-center">
              <ul
                role="list"
                className="flex flex-col gap-y-4 text-center xl:gap-y-2 "
              >
                <li className="text-left text-lg font-normal text-gray-400 xl:px-4">
                  Today
                </li>
                {notificationList?.map((item, index) => (
                  // <li
                  //   key={index}
                  //   className={`group px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                  //     item?.isRead
                  //       ? "border-gray-200 border-b"
                  //       : "shadow-sm bg-white border-b-2 border-gray-300"
                  //   }`}
                  // >
                  <li
                    key={index}
                    onClick={() => {
                      setselectedNotification(item);
                      setIsNotificationPopupOpen(true);
                    }}
                    className={`group relative cursor-pointer rounded-2xl border bg-white py-3 shadow-sm hover:bg-gray-50 xl:rounded-full xl:px-4 `}
                  >
                    <div className="w-full justify-between xl:flex">
                      <div className="xl:flex xl:w-[calc(100%-150px)]">
                        <div className="flex flex-col items-center justify-between gap-2 xl:flex-row xl:pr-3">
                          <div className="flex">
                            {/* bell icon */}
                            <div
                              className={`h-12 w-12 ${theme.shoorah_bg_5}  flex-shrink-0 rounded-full  p-3`}
                            >
                              <img src={bellIcon} alt="notification-icon" />
                            </div>
                            {/* <div className="ml-2 self-center">
                            <div
                              className={`text-sm P22Mackinac ${
                                item?.isRead
                                  ? "text-gray-500"
                                  : "text-gray-500 font-bold"
                              }`}
                            >
                              {item?.fromUser?.name}
                            </div>
                          </div> */}
                          </div>
                          <div className="block xl:hidden">
                            <p className="P22Mackinac block self-center text-right text-[11px] text-gray-400 group-hover:xl:hidden">
                              {moment(item.publishedOn).format("lll")}
                            </p>
                            <p className="P22Mackinac absolute right-4 top-4 ml-auto text-[12px] text-gray-400 group-hover:xl:block">
                              <TrashIcon
                                onClick={() => deleteHandler(item?.id, 1)}
                                className="ml-auto w-[20px] text-right text-red-500"
                              />
                            </p>
                          </div>
                        </div>
                        {/* message */}
                        <div className="flex flex-col items-start ">
                          <p className="w-full text-center text-[14px] md:text-lg font-medium text-gray-800 xl:text-left ">
                            {item.title.length > 80
                              ? item.title?.substring(0, 80) + "..."
                              : item.title}{" "}
                          </p>
                          {/* <p className="w-full text-center text-sm font-normal text-gray-400 xl:text-left">
                            {item.message.length > 80
                              ? item.message?.substring(0, 80) + "..."
                              : item.message}{" "}
                          </p> */}
                        </div>
                      </div>
                      <div className="hidden self-center xl:block">
                        {/* <p className="xl:w-[150px] P22Mackinac group-hover:hidden block text-right text-gray-400 text-[12px]">
                        {moment(item.createdAt).format("lll")}
                      </p> */}
                        <p className=" P22Mackinac  ml-auto text-[12px] text-gray-400">
                          {/* <TrashIcon
                          onClick={() => deleteHandler(item?.id, 1)}
                          className="text-right P22Mackinac ml-auto w-[20px] text-red-500"
                        /> */}
                          <img
                            onClick={() => deleteHandler(item?.id, 1)}
                            className="h-5 w-5 cursor-pointer"
                            src={recycleBinIcon}
                            alt="delete"
                          />
                        </p>
                      </div>
                    </div>
                    {/*<EyeIcon className='w-[24px]' />*/}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-[red] text-center lg:mt-[5rem]">
            <div className="w-full border-t border-[#EAEAEA] bg-white py-[20px]">
              <NoDataFoundImg
                className={`mx-auto rounded-lg border border-shoorah-blue text-indigo-50`}
              />
              <div className="P22Mackinac mt-3 text-center text-sm text-shoorah-gray4">
                No notifications
              </div>
            </div>
          </div>
        )}
        <div>
          {totalCount > PAGE_SIZE ? (
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={PAGE_SIZE}
              onPageChange={(page) => handlePagination(page, PAGE_SIZE, "")}
            />
          ) : (
            <span />
          )}
        </div>
        {openDeletePopup && (
          <DeletePopup
            open={openDeletePopup}
            title={"Delete notification"}
            message={`Are you sure you want to delete 'this notification'
            ? This action cannot be undone.`}
            setOpen={setDeletePopup}
            setDelete={handleDeletePopup}
          />
        )}
        <div
          style={{ rotate: "20deg" }}
          className="absolute right-[-15%] top-[-4rem] z-[-3]  w-[14rem] lg:w-[28rem]"
        >
          <svg
            // width={1440}
            // height={1440}
            viewBox="0 0 1440 1440"
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{ __html: starContent }}
          />
        </div>

        <div
          style={{ rotate: "20deg" }}
          className="absolute bottom-[5%] left-[-15%] z-[-3] w-[14rem] lg:w-[28rem]"
        >
          <svg
            // width={1440}
            // height={1440}
            viewBox="0 0 1440 1440"
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{ __html: pentagonContent }}
          />
        </div>
      </div>

      <Transition.Root appear show={isNotificationPopupOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          // initialFocus={cancelButtonRef}
          onClose={setIsNotificationPopupOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 py-4">
                    <div className="sm:flex sm:items-start">
                      <div className="text-center lg:mt-3 ">
                        <div className="mb-2 w-full">
                          <p className=" w-full text-left text-base font-medium text-gray-700 lg:text-left lg:text-xl">
                            {selectedNotification?.title}
                          </p>
                        </div>

                        <div className="flex min-h-fit flex-col gap-y-2 overflow-y-auto text-left text-xs text-gray-700  lg:text-base">
                          <div>{selectedNotification?.message}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className={`inline-flex w-full justify-center rounded-3xl border border-transparent font-semibold ${theme.shoorah_bg_5} px-6 py-2 text-base  text-white shadow-sm ${theme.shoorah_bg_hover_6} focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
                      onClick={(e) => {
                        setIsNotificationPopupOpen(false);
                      }}
                    >
                      Ok
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default Notification;
