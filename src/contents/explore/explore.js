import React, { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../layout/navbar";
import SideMenu from "../layout/sideMenu";
import Hero from "../reusable/hero";
import { BOOKMARKS_CONTENT_TYPE, CONTENT_TYPE } from "../../utils/constants";
import TutorialVideo from "../reusable/tutorialVideo";
import { errorToast, successToast } from "../../utils/helper";
import { Api } from "../../api";
import { useTheme } from "../context/themeContext";
import Loader from "../../component/common/Loader";
import SoundCard from "../reusable/soundCard";
import headPhone from "../../assets/svg/headphone.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import InfiniteScroll from "react-infinite-scroll-component";
import ritualsBg from "../../assets/svg/ritualsBgDefault.svg";
import affirmationBg from "../../assets/svg/affirmationBgDefault.png";
import ReusableCarsouel from "../reusable/carsouel";
import { useAudio } from "../context/audiobar";
import ConfirmPopup from "../../component/common/modals/ConfirmPopup";
import RecentPlayCarsouel from "../restore/recentplaycarsouel";
import useSubscriptionRedirection from "../../utils/useSubscriptionRedirection";

const Explore = () => {
  const { theme } = useTheme();
  const [loader, setLoader] = useState(false);
  const [explore, setExplore] = useState([]);
  const { audioNav } = useAudio();
  const [show, setShow] = useState(false);
  const scrollContainerRef = useRef(null);
  const [reachedBottom, setReachedBottom] = useState(false);

  const checkIfAtBottom = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight
      ) {
        setReachedBottom(true);
      } else {
        setReachedBottom(false);
      }
    }
  }; 

  useEffect(() => {
    if (reachedBottom) {
      getFirstExploreList();
    }
  }, [reachedBottom]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkIfAtBottom);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkIfAtBottom);
      }
    };
  }, []);

  const getFirstExploreList = () => {
    setLoader(true);
    Api.getExploreList()
      .then((res) => {
        if (res.data.meta.code == 1) {
          setLoader(false);
          setExplore(res.data.data);
        } else if (res.data.meta.code == 9) {
          setLoader(false);
          history.replace("/subscription");
        } else {
          setLoader(false);
          errorToast(res.data.meta.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const [affirPopup, setaffirPopup] = useState(false);
  const [ritualPopup, setRitualPopup] = useState(false);
  const [addRitual, setAddritual] = useState(null);
  const [addAffirBook, setAddAffirBook] = useState(null);

  const [trendingPods, setTrendingPods] = useState([]);
  const [trendingMeditation, setTrendingMeditation] = useState([]);
  const [trendingSounds, setTrendingSounds] = useState([]);
  const [trendingRituals, setTrendingRituals] = useState([]);
  const [trendingAffirmations, setTrendingAffirmations] = useState([]);

  const history = useHistory();

  const addToMyRituals = async () => {
    let payload = {
      ritualIds: [addRitual.contentId],
    };
    Api.addToMyRituals(payload)
      .then((res) => {
        if (res?.data?.meta?.code === 1) {
          successToast(res?.data?.meta?.message);
          window.location.reload();
        } else {
          errorToast(res.data.meta.message);
        }
      })
      .catch((err) => errorToast(err));
  };

  const createBookmark = (id) => {
    let reqBody = {
      contentType: BOOKMARKS_CONTENT_TYPE.AFFIRMATION,
      contentId: id,
    };
    Api.saveAffirmationToBookmarks(reqBody)
      .then((res) => {
        successToast(res.data.meta.message);
        window.location.reload();
      })
      .catch((err) => {
        errorToast(err.message);
      });
  };

  const getTrendingPods = () => {
    Api.getTrendingsByContentType(5)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setTrendingPods(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTrendingMeditations = () => {
    Api.getTrendingsByContentType(3)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setTrendingMeditation(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTrendingSounds = () => {
    Api.getTrendingsByContentType(4)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setTrendingSounds(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTrendingAffirmations = () => {
    Api.getTrendingsByContentType(2)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setTrendingAffirmations(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTrendingRituals = () => {
    Api.getTrendingsByContentType(7)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setTrendingRituals(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTrendingPods();
    getTrendingMeditations();
    getTrendingSounds();
    getTrendingAffirmations();
    getTrendingRituals();
  }, []);

  useEffect(() => {
    getFirstExploreList();
  }, []);

  useEffect(() => {
    Api.getCurrentPlan().then((res) => {
      if (res.data.meta.code == 1) {
        if (res?.data?.data?.accountType != "SUBSCRIBED") {
          history.replace("/subscription");
        }
      }
    });
  }, []);

  const refresh = (setSleep) => {};

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

  const ritualBgSvg = `<svg viewBox="0 0 164 164" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.1" filter="url(#filter0_d_1236_18369)">
    <circle cx="82" cy="138" r="106" fill="#fff"/>
    </g>
    <g opacity="0.2" filter="url(#filter1_d_1236_18369)">
    <circle cx="82.0007" cy="138" r="69.0359" fill="#fff"/>
    </g>
    <defs>
    <filter id="filter0_d_1236_18369" x="-163" y="-111" width="490" height="490" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="-4"/>
    <feGaussianBlur stdDeviation="69.5"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1236_18369"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1236_18369" result="shape"/>
    </filter>
    <filter id="filter1_d_1236_18369" x="8.96484" y="68.9639" width="146.072" height="146.072" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1236_18369"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1236_18369" result="shape"/>
    </filter>
    </defs>
    </svg>
    `;

  const affirBgSvg = `<svg viewBox="0 0 120 124" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M1.01832 62.3861C-3.41007 43.4394 8.35941 24.4901 27.306 20.0618L33.3096 18.6585C52.2562 14.2302 71.2056 25.9996 75.634 44.9463L78.5889 57.5887C78.5895 57.5914 78.5901 57.594 78.5907 57.5966C78.6738 57.9519 78.9331 58.195 79.1699 58.1396C79.4067 58.0843 79.5314 57.7514 79.4484 57.3962C79.4435 57.3754 79.4381 57.355 79.432 57.335C79.4327 57.3351 79.4334 57.3351 79.4341 57.3351L76.4916 44.7458C72.0632 25.7991 83.8327 6.84983 102.779 2.42145L108.783 1.01824C127.73 -3.41014 146.679 8.35926 151.107 27.306L152.51 33.3095C156.939 52.2562 145.169 71.2055 126.223 75.6339L113.73 78.5537L113.74 78.5664C113.685 78.5694 113.629 78.5774 113.572 78.5906C113.217 78.6737 112.974 78.933 113.029 79.1698C113.085 79.4067 113.418 79.5313 113.773 79.4483C113.849 79.4304 113.921 79.4043 113.985 79.372C113.985 79.381 113.985 79.3899 113.984 79.3989L126.423 76.4915C145.37 72.0632 164.319 83.8326 168.748 102.779L170.151 108.783C174.579 127.73 162.81 146.679 143.863 151.107L137.86 152.51C118.913 156.939 99.9635 145.169 95.5351 126.223L92.6278 113.784L92.6193 113.788L92.6041 113.796C92.6045 113.724 92.5963 113.649 92.5784 113.572C92.4953 113.217 92.2361 112.974 91.9992 113.029C91.7624 113.085 91.6377 113.418 91.7207 113.773C91.734 113.829 91.7517 113.883 91.7731 113.933L91.7577 113.931L94.6775 126.423C99.1059 145.37 87.3364 164.319 68.3898 168.747L62.3862 170.151C43.4396 174.579 24.4902 162.81 20.0618 143.863L18.6586 137.859C14.2302 118.913 25.9997 99.9634 44.9464 95.5351L57.5356 92.5926L57.5346 92.5908C57.5486 92.5884 57.5627 92.5857 57.5769 92.5827C57.5835 92.5813 57.5901 92.5798 57.5967 92.5783C57.952 92.4953 58.1951 92.236 58.1397 91.9991C58.0844 91.7623 57.7515 91.6376 57.3962 91.7206L57.3883 91.7225L44.7459 94.6774C25.7993 99.1058 6.84992 87.3364 2.42153 68.3897L1.01832 62.3861Z"
    fill="#fff"
    />
    </svg>
    `;

  return (
    <div
      className={`relative ${
        audioNav && `mb-[6rem]`
      } overflow-hidden  pb-[6vh] md:pb-[13vh] lg:pb-0`}
    >
      {loader && <Loader />}
      <Navbar />
      <SideMenu />
      <Hero show={show} setShow={setShow} heading={`Explore`} subhead={``} />
      <TutorialVideo
        show={show}
        setShow={setShow}
        title={`Welcome to Explore`}
        contentType={CONTENT_TYPE[0]}
        descriptionOne={
          "Adventure through our library of mood-lifting Shoorah resources including rituals, affirmations, meditations, pods and sleep sounds."
        }
        descriptionTwo={
          "With new content added constantly, there's always something new to explore."
        }
      />
      <div
        style={{ rotate: "60deg" }}
        className="absolute left-[-10%] top-[45%] z-[-3]   w-[14rem] md:w-[20rem] lg:w-[28rem]"
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
      <div className=" mt-8 h-auto w-full px-4 lg:h-[10rem] xl:mx-auto xl:mb-[3rem] xl:mt-[5rem] xl:w-[50%] ">
        <div className="relative mt-3 w-full overflow-hidden">
          <div className="flex h-fit w-full items-center justify-center">
            <div
              className={`flex items-center justify-around ${theme.shoorah_bg_6} h-20 w-full overflow-hidden rounded-2xl lg:h-[10rem] lg:w-[60rem] lg:rounded-[5.5rem]`}
            >
              <div className="flex w-[100%] items-center justify-evenly gap-1 text-center text-[1.5rem] text-[#fff] sm:text-3xl xl:text-4xl">
                {/* <img src={headPhone} className='xl:h-[60px] xl:w-[80px] h-[60px] w-[50px]' /> */}
                <div className=" flex items-center  gap-4 ">
                  <svg
                    className=" h-8 w-8 lg:h-[60px] lg:w-[50px] xl:h-[60px] xl:w-[80px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_4687_10189)">
                      <path
                        d="M22.705 11.8682C22.6891 13.698 22.2732 15.5022 21.4863 17.1543"
                        stroke="#fff"
                        strokeWidth="1.71429"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.0009 22.5722C10.5952 22.5722 9.20333 22.2953 7.90466 21.7574C6.60598 21.2194 5.42597 20.431 4.43201 19.4371C2.42462 17.4296 1.29688 14.707 1.29688 11.8682"
                        stroke="#fff"
                        strokeWidth="1.71429"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.2338 21.7489C21.598 21.7489 22.7039 20.6431 22.7039 19.2788C22.7039 17.9146 21.598 16.8086 20.2338 16.8086C18.8696 16.8086 17.7637 17.9146 17.7637 19.2788C17.7637 20.6431 18.8696 21.7489 20.2338 21.7489Z"
                        fill="white"
                      />
                      <path
                        d="M20.2338 21.7489C21.598 21.7489 22.7039 20.6431 22.7039 19.2788C22.7039 17.9146 21.598 16.8086 20.2338 16.8086C18.8696 16.8086 17.7637 17.9146 17.7637 19.2788C17.7637 20.6431 18.8696 21.7489 20.2338 21.7489Z"
                        stroke="#fff"
                        strokeWidth="1.71429"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.98828 7.91618C2.34718 7.01929 2.82938 6.1768 3.42098 5.41309"
                        stroke="#fff"
                        strokeWidth="1.71429"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.59766 2.58048C7.52572 2.0446 8.5312 1.65573 9.57832 1.42773"
                        stroke="#fff"
                        strokeWidth="1.71429"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22.0127 7.91618C21.6539 7.01929 21.1717 6.1768 20.5801 5.41309"
                        stroke="#fff"
                        strokeWidth="1.71429"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.4005 2.58048C16.4725 2.0446 15.467 1.65573 14.4199 1.42773"
                        stroke="#fff"
                        strokeWidth="1.71429"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.71484 13.0715L10.8317 16.2858C12.2984 12.0726 13.5199 10.2238 16.2863 7.71436"
                        stroke="#fff"
                        strokeWidth="1.71429"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4687_10189">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p>Rituals</p>
                </div>
              </div>
              <div className="relative flex w-[80%] items-center justify-center">
                <div
                  className={`absolute left-[-3rem] top-[-25rem] ${theme.shoorah_bg_2} h-[35rem] w-[90rem] rounded-full 2xl:h-[38rem] 2xl:w-[120rem]`}
                  style={{ zIndex: 0 }}
                >
                  {" "}
                  Hello
                </div>
                <div
                  onClick={() => history.push(`/rituals`)}
                  className={`absolute w-auto cursor-pointer  bg-[#fff] text-center text-sm xl:w-[10rem] ${theme.podsText} xl:text-md flex cursor-pointer items-center justify-center rounded-[2rem]  px-4 py-2  lg:px-3 lg:py-3`}
                  style={{ zIndex: 10 }}
                >
                  <p
                    className={` text-sm lg:text-xl ${theme.shoorah_text_5} P22Mackinac`}
                  >
                    My Rituals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col px-4 sm:gap-2 lg:mt-0 xl:px-0 ">
        <div className="w-[100%]">
          <RecentPlayCarsouel
            type={`3`}
            data={trendingMeditation}
            viewMore={false}
            heading={`Newly Added`}
          />
        </div>

        <div className="w-[100%]">
          <RecentPlayCarsouel
            type={`2`}
            data={trendingAffirmations}
            viewMore={false}
            heading={`Most Bookmarked Affirmation`}
          />
        </div>
        <div className="  w-[100%]">
          <RecentPlayCarsouel
            type={`7`}
            data={trendingRituals}
            viewMore={false}
            heading={` Most Used Rituals`}
          />
        </div>
        <div className="  w-[100%]">
          <RecentPlayCarsouel
            type={`5`}
            data={trendingPods}
            viewMore={false}
            heading={`Most Played Pods`}
          />
        </div>
        <div className="  w-[100%]">
          <RecentPlayCarsouel
            type={`3`}
            data={trendingMeditation}
            viewMore={false}
            heading={`Most Played Meditation`}
          />
        </div>

        <div className="  w-[100%]">
          <RecentPlayCarsouel
            type={`4`}
            data={trendingSounds}
            viewMore={false}
            heading={`Most Played Sleep Sounds`}
          />
        </div>

        <div className=" w-[100%] sm:mb-[5rem]">
          <RecentPlayCarsouel
            type={`4`}
            data={explore}
            viewMore={false}
            heading={`Explore More`}
          />
        </div>
      </div>
      <div
        style={{ rotate: "20deg", zIndex: "-10" }}
        className="absolute bottom-[-4%] right-[-15%]  w-[14rem] md:w-[20rem] lg:w-[28rem]  lg:w-[35rem]"
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: starContent }}
        />
      </div>

      <ConfirmPopup
        open={ritualPopup}
        setOpen={setRitualPopup}
        message={"Are you sure you want to save this ritual?"}
        setAccepted={() => addToMyRituals(addRitual.contentId)}
        handleNo={() => {
          setRitualPopup(false);
        }}
      />
      <ConfirmPopup
        open={affirPopup}
        setOpen={setaffirPopup}
        message={"Are you sure you want to bookmark this affirmation?"}
        setAccepted={() => createBookmark(addAffirBook.contentId)}
        handleNo={() => {
          setaffirPopup(false);
        }}
      />
    </div>
  );
};

export default Explore;
