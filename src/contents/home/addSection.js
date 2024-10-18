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

const AddSection = ({ data, setRefresh, refresh }) => {
  const [show, setShow] = useState(false);
  const modalRef = useRef();
  const picRef = useRef();
  const history = useHistory();
  const { theme } = useTheme();
  const handleClick = () => {
    setShow(true);
  };

  useSubscriptionRedirection();

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
        userActivity()
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
        userActivity();
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.message);
      });
  };

  return (
    <div className=" w-full items-center justify-center">
      {show && (
        <>
          <div className="fixed left-0 top-0 z-[60] h-screen w-screen bg-black/30 xl:absolute">
            <div className="relative flex h-full w-full items-center justify-center overflow-y-auto">
              <div
                ref={modalRef}
                className=" relative  inset-0 z-40 flex h-full sm:h-[80vh] w-full  flex-col items-center overflow-hidden overflow-y-auto rounded-2xl border bg-[#fff]  lg:h-[95vh]  xl:w-[70rem] xl:translate-x-1 xl:rounded-[4rem]"
              >
                <svg
                  onClick={() => setShow(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="absolute right-8 top-4  z-50 h-6 w-6 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <div
                  ref={picRef}
                  className={`flex h-[85%] w-[100%] flex-col items-center justify-center gap-5 rounded-3xl border ${theme.shoorah_focus_gradient}`}
                >
                  <div className="relative flex h-[50vh] w-full items-center justify-center sm:h-[60vh] sm:w-[60vw] xl:h-[70vh] xl:w-[50vw]">
                    <img
                      src={theme.shoorah_circle}
                      className=" aspect-square w-full xl:h-[30rem]  xl:w-[30rem]"
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
        </>
      )}

      <div className="mt-3 flex items-center justify-center gap-4 p-5  xl:gap-8">
        <div
          onClick={handleClick}
          className={` h-12 w-12 rounded-[100%] border xl:h-[4rem] xl:w-[4rem] ${theme.shoorah_border_5} `}
        >
          <button className={`h-[100%] w-[100%] ${theme.shoorah_text_5}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-plus-lg mx-auto"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
          </button>
        </div>
        <div
          onClick={handleClick}
          className=" h-12 w-12 rounded-[100%] border xl:h-[4rem] xl:w-[4rem] "
        >
          <button
            className={`flex h-[100%] w-[100%] items-center justify-center rounded-[100%] text-[#fff] ${theme.shoorah_bg_5}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={20}
              width={20}
              fill="currentColor"
              className="bi bi-box-arrow-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"
              />
              <path
                fillRule="evenodd"
                d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSection;
