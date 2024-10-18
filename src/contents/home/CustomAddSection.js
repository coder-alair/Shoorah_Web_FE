import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/shoorahLogoLarge.png";
import moon from "../../assets/images/moon-lrf.png";
import html2canvas from "html2canvas";
import { errorToast, successToast } from "../../utils/helper";
import { BOOKMARKS_CONTENT_TYPE, CONTENT_TYPE } from "../../utils/constants";
import { Api } from "../../api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";
import useSubscriptionRedirection from "../../utils/useSubscriptionRedirection";

const CustomAddSection = ({ data, setRefresh, refresh, show, setShow }) => {
  const modalRef = useRef();
  const picRef = useRef();
  const history = useHistory();
  const { theme } = useTheme();
  const handleClick = () => {
    setShow(true);
  };

  useSubscriptionRedirection();

  // console.log(data);

  const handleDocumentClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const userActivity = () => {
    let payload = {
      featureType: 1
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

  const handleShare = async () => {
    if (picRef.current) {
      // const canvas = await html2canvas(picRef.current);
      // const imageDataUrl = canvas.toDataURL("image/png");
      // const imageName = "shoorah_affirmation.png";
      // const link = document.createElement("a");
      // link.href = imageDataUrl;
      // link.download = imageName;
      // link.click();

      if (navigator.share) {
        try {
          const canvas = await html2canvas(picRef.current);
          const imageDataUrl = canvas.toDataURL("image/png");

          const shareData = {
            title: "MDN",
            text: "Learn web development on MDN!",
            files: [new File([dataURItoBlob(imageDataUrl)], "shoorah_affirmation.png", { type: "image/png" })],
          };
          userActivity();
          await navigator.share(shareData);
        } catch (error) {
          console.error("Error sharing:", error);
        }
      } else {
        // Fallback for browsers that do not support navigator.share
        // You can customize this fallback as needed (e.g., open a modal with share options)
        alert("Sharing is not supported on your device/browser. You can manually share the image.");
        const canvas = await html2canvas(picRef.current);
        const imageDataUrl = canvas.toDataURL("image/png");
        const imageName = "shoorah_affirmation.png";
        const link = document.createElement("a");
        link.href = imageDataUrl;
        link.download = imageName;
        userActivity();
        link.click();
      }

    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };


  const createBookmark = () => {
    let reqBody = {
      contentType: BOOKMARKS_CONTENT_TYPE.AFFIRMATION,
      contentId: data.id,
    };
    Api.saveAffirmationToBookmarks(reqBody)
      .then((res) => {
        successToast(res.data.meta.message);
        setShow(!show);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.message);
      });
  };

  return (
    <>
      {show && (
          <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/30  ">
            <div className="flex h-full w-full items-center justify-center overflow-y-auto">
              <div
                ref={modalRef}
                className="  inset-0 z-40 flex h-full md:h-[80vh] w-full translate-x-1 flex-col items-center overflow-hidden overflow-y-auto rounded-2xl border bg-[#fff] lg:h-auto  lg:w-[70rem] xl:rounded-[4rem]"
              >
                <svg
                  onClick={() => setShow(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="absolute right-4 top-4  z-50 h-6 w-6 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <div
                  ref={picRef}
                  className={`flex h-[85%] w-[100%] flex-col items-center justify-center gap-5 border xl:rounded-3xl ${theme.shoorah_focus_gradient}`}
                >
                  <div className="relative flex h-[50vh] w-full items-center justify-center sm:h-[60vh] sm:w-[60vw] xl:h-[70vh] xl:w-[50vw]">
                    <img
                      src={theme.shoorah_circle}
                      className=" aspect-square w-full xl:h-[30rem] xl:w-[30rem]"
                    />
                    <div className="absolute flex h-full w-[90%] items-center justify-center text-center lg:w-[60%]">
                      <p className="P22Mackinac w-full  text-4xl font-medium tracking-wider lg:text-[2.8rem] xl:text-[2rem] xl:leading-[3rem] 2xl:text-[3rem] ">
                        {data?.displayName}
                      </p>
                    </div>
                  </div>
                  <div className=" mt-12 w-32 xl:mt-0 xl:w-[16rem]">
                    <img src={logo} className="h-full w-full object-cover" />
                  </div>
                </div>

                <div className="flex h-[15%] w-full items-center  gap-10 p-3 text-[#fff] xl:w-auto">
                  <button
                    onClick={createBookmark}
                    className={`${theme.shoorah_bg_5} P22Mackinac w-1/2 rounded-[3rem] p-3 text-base xl:w-[10rem] xl:text-xl`}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleShare}
                    className={`${theme.shoorah_bg_5} P22Mackinac w-1/2 rounded-[3rem] p-3 text-base xl:w-[10rem] xl:text-xl`}
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
      )}

      {/* {show && (
        <div
          ref={modalRef}
          className=" fixed inset-0 z-40 flex h-[80vh] w-full translate-x-1 flex-col items-center overflow-hidden overflow-y-auto rounded-2xl border bg-[#fff]  lg:w-[70rem] xl:rounded-[4rem]"
        >
          <svg
            onClick={() => setShow(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="absolute right-4 top-4  z-50 h-6 w-6 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div
            ref={picRef}
            className={`flex h-[85%] w-[100%] flex-col items-center justify-center gap-5 border xl:rounded-3xl ${theme.shoorah_focus_gradient}`}
          >
            <div className="relative flex h-[50vh] w-full items-center justify-center sm:h-[60vh] sm:w-[60vw] xl:h-[70vh] xl:w-[50vw]">
              <img
                src={theme.shoorah_circle}
                className=" aspect-square w-full xl:h-[30rem] xl:w-[30rem]"
              />
              <div className="absolute flex h-full w-[60%] items-center justify-center text-center">
                <p className="P22Mackinac w-full  text-4xl font-medium tracking-wider lg:text-[2.8rem] xl:text-[2rem] xl:leading-[3rem] 2xl:text-[3rem] ">
                  {data?.displayName}
                </p>
              </div>
            </div>
            <div className=" mt-12 w-32 xl:mt-0 xl:w-[16rem]">
              <img src={logo} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex h-[15%] w-full items-center  gap-10 p-3 text-[#fff] xl:w-auto">
            <button
              onClick={createBookmark}
              className={`${theme.shoorah_bg_5} P22Mackinac w-1/2 rounded-[3rem] p-3 text-base xl:w-[10rem] xl:text-xl`}
            >
              Save
            </button>
            <button
              onClick={handleShare}
              className={`${theme.shoorah_bg_5} P22Mackinac w-1/2 rounded-[3rem] p-3 text-base xl:w-[10rem] xl:text-xl`}
            >
              Share
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default CustomAddSection;
