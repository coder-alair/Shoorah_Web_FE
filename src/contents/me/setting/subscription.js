import React, { Fragment, useEffect, useState } from "react";
import Header from "../header";
import { Api } from "../../../api";
import { errorToast, getJWTToken } from "../../../utils/helper";
import Loader from "../../../component/common/Loader";
import { useTheme } from "../../context/themeContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutform";
import TransactionModal from "./transactionModal";

const plans = [
  {
    productId: "com.shoorah.monthly",
    amount: 1200.0,
    time: "Month",
    text: "$1200.0 billed every month",
  },
  {
    productId: "com.shoorah.sixmonths",
    amount: 4800.0,
    time: "6 Months",
    text: "6 months at $800.00/month. Save 33%",
  },
  {
    productId: "com.shoorah.annually",
    amount: 6900.0,
    time: "Year",
    text: "12 months at $575.00/month. Save 52%",
  },
];

const promise = loadStripe(process.env.STRIPE_KEY);

// const tabs = [
//     {
//         id: 1,
//         data: ['Access to all features', 'Mindful meditations', 'Goal setting & affirmations'],
//         time: 'Monthly',
//         price: 9.99,
//         text: 'Montly Plan',
//         duration: '/Month',
//         productId: 'com.shoorah.monthly',
//     },
//     {
//         id: 2,
//         data: ['Saving 50%', 'Works out at $4.99/month', 'Access to all features'],
//         time: 'Annual',
//         text: 'Annual Plan',
//         price: 59.9,
//         duration: '/Year',
//         productId: 'com.shoorah.annually',

//     },
//     {
//         id: 3,
//         data: ['Saving 30%', 'Works out at $6.99/month', 'Access to all features'],
//         time: 'Half Yearly',
//         price: 41.95,
//         text: 'Half Year Plan',
//         duration: '/6 Months',
//         productId: 'com.shoorah.sixmonths',
//     },

// ]

const free = {
  id: 4,
  data: [
    "Moods & Emotions Tracker",
    "Shoorah Affirmations",
    "x3 Collective usage of meditaions, sounds & pods",
  ],
  data2: [
    "3 day FREE TRIAL (cancel at any time)",
    "x1 Usage of all features upon setting your account",
  ],

  time: "Basic Plan",
  price: 0,
  text: "Free Plan",
  duration: "FREE",
  productId: "com.shoorah.monthly",
};

const Subscription = () => {
  const [subsPlans, setSubsPlans] = useState(plans);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loader, setLoader] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [tabs, setTabs] = useState([
    {
      id: 1,
      // data: [
      //   "Access to all features",
      //   "Mindful meditations",
      //   "Goal setting & affirmations",
      // ],
      data: [
        "Full Premium Access ",
        "24/7 Therapy tool",
        "Meditations & Breath work ",
        "Rituals & Goal Setting",
        "Bite Sized Expert Pods",
        "Affirmation Alerts",
        "4 Featured Journaling",
        "Sleep Sounds",
      ],
      time: "Monthly",
      price: 9.99,
      text: "Montly Plan",
      duration: "/Month",
      productId: "com.shoorah.monthly",
      stripeId: 1,
    },
    {
      id: 3,
      data: [
        "Saving 30%",
        "Works out at £6.99/month",
        "Access to all features",
      ],
      time: "Half Yearly",
      price: 41.95,
      text: "Half Year Plan",
      duration: "/6 Months",
      productId: "com.shoorah.sixmonths",
      stripeId: 2,
    },
    {
      id: 2,
      data: [
        "Saving 50%",
        "Works out at £4.99/month",
        "Access to all features",
        "",
        "",
        "",
        "",
        "",
      ],
      time: "Annual",
      text: "Annual Plan",
      price: 59.9,
      duration: "/Year",
      productId: "com.shoorah.annually",
      stripeId: 3,
    },
    {
      id: 4,
      data: [
        "Full Premium Access for Lifetime ",
        "24/7 Therapy tool",
        "Access to all features",
        "Meditations & Breath work ",
        "Rituals & Goal Setting",
      ],
      time: "Lifetime",
      text: "Lifetime Plan",
      price: 169.99,
      duration: "",
      productId: "com.shoorah.lifetime",
      stripeId: 4,
    },
  ]);

  const { theme } = useTheme();
  const [filterPlan, setFilterPlan] = useState([]);
  const [filterSubPlan, setFilterSubPlan] = useState(plans);
  const [user, setUser] = useState({});
  const [tab, setTab] = useState(2);

  const [selectPlan, setSelectPlan] = useState({});
  const [isSubscribed, setisSubscribed] = useState(false);

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

  const handleBuy = () => {
    setPaymentModal(true);
  };

  const handleDowngrade = () => {
    Api.freeSubscription()
      .then((res) => {
        if (res.data.meta.code == 1) {
          setTransactionModal(true);
          console.log("Free Applied");
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPlan();
    getUser();
  }, []);

  const getPlan = () => {
    setLoader(true);
    Api.getCurrentPlan().then((res) => {
      if (res.data.meta.code == 1) {
        setCurrentPlan(res.data.data);
        setFilterSubPlan(
          subsPlans.filter((i) => i?.productId != currentPlan?.productId),
        );
        setFilterPlan(
          subsPlans.filter((i) => i?.productId == currentPlan?.productId),
        );
      } else {
        setLoader(false);
        errorToast(res.data.meta.message);
      }
    });
  };

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

  function moveObjectToMiddle(arr, productId) {
    // Find the index of the object with the specified productId
    const index = arr.findIndex((item) => item.productId === productId);

    if (index === -1) {
      console.log("Product not found in the array.");
      return arr;
    }

    // Remove the object from its current position
    const objectToMove = arr.splice(index, 1)[0];

    // Calculate the middle position
    const middlePosition = Math.floor(arr.length / 2);

    // Insert the object at the middle position
    arr.splice(middlePosition, 0, objectToMove);

    return arr;
  }

  useEffect(() => {
    if (currentPlan) {
      const matchingTab = tabs.findIndex(
        (tab) => tab.productId === currentPlan?.productId,
      );
      setTab(matchingTab);
    }
  }, [currentPlan]);

  useEffect(() => {
    if (currentPlan) {
      setFilterSubPlan(
        subsPlans.filter((i) => i.productId != currentPlan.productId),
      );
      setFilterPlan(
        subsPlans.filter((i) => i.productId == currentPlan.productId),
      );
    }
  }, [currentPlan]);


  return (
    <div className="relative overflow-hidden">
      <div className="flex w-full justify-center">
        <Header
          title={`Our Subscriptions`}
          goBack={true}
          hide={true}
          backUrl={`/me`}
        />
      </div>
      {loader && <Loader />}

      <div
        style={{ rotate: "20deg" }}
        className="absolute right-[-15%] top-[-4rem] z-[-3]  w-[14rem] md:w-[20rem] lg:w-[28rem]"
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: starContent }}
        />
      </div>

      <div className="relative  h-full w-full overflow-hidden">
        <div
          style={{ rotate: "20deg" }}
          className="absolute left-[-15%] top-[20%] z-[-3]  w-[14rem] md:w-[20rem] lg:w-[28rem]"
        >
          <svg
            // width={1440}
            // height={1440}
            viewBox="0 0 1440 1440"
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{ __html: pentagonContent }}
          />
        </div>

        <div
          style={{ rotate: "50deg" }}
          className="absolute right-[-12%] top-[58%] z-[-3]   w-[14rem] md:w-[20rem] lg:w-[28rem]"
        >
          <svg
            // width={1440}
            // height={1440}
            viewBox="0 0 1440 1440"
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>

        {user.company_id ?
          <div className="relative mt-[3rem] md:mt-[5rem] flex h-full w-full flex-col items-center justify-center gap-5 overflow-hidden px-4 xl:px-0">
            {/* <p className="P22Mackinac mt-[1.5rem] flex w-full flex-wrap items-center justify-center text-center text-lg lg:mt-3 xl:text-left">
              Choose a subscription plan to unlock all the functionality's of the
              application
            </p> */}

            <div

              className="flex h-auto w-full lg:w-[60%] flex-col items-center gap-6 px-6 py-4 md:pb-6 lg:rounded-[3rem] lg:px-0  lg:pl-10  lg:pr-[2rem]"
            >
              <div
                className={`relative flex h-[15rem] md:h-[15rem] w-full flex-col justify-evenly pl-4 ${theme.shoorah_bg_7} overflow-hidden rounded-3xl`}
              >
                <div
                  className={`absolute right-[-20rem] top-0 md:right-[-8rem] md:top-[-2rem] h-[550px] w-[550px] rounded-full ${theme.shoorah_bg_5}`}
                ></div>
                <div className="relative py-5 z-20 flex flex-col gap-10">
                  <div className="flex items-center gap-3">
                    <p className="P22Mackinac text-4xl font-medium text-white lg:text-4xl ">
                      {user?.companyName}
                    </p>
                  </div>
                  <div className="flex  flex-col justify-center">

                    <p className="P22Mackinac text-lg md:text-2xl font-medium text-white">
                      You are a part of Business Pro Plan
                    </p>
                    <p className="P22Mackinac text-lg md:text-2xl font-medium text-white">
                      For more information please reach out to {user.companyEmail}
                    </p>
                  </div>

                </div>
              </div>
            </div>
            <p className="P22Mackinac mt-8 flex w-full flex-wrap items-center justify-center text-[2.5rem] xl:mt-[5rem]">
              What we do?
            </p>
            <p className="P22Mackinac  mx-auto flex w-full flex-wrap items-center justify-center text-center text-lg xl:w-[40rem]">
              Helping you prioritise and support your mental health through
              <br className="hidden xl:flex" />
              simplicity & convenience!
            </p>

            <div className=" flex items-center justify-between gap-x-[2rem] xl:mt-[2rem]  ">
              {/* Cut */}
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 overflow-hidden lg:mb-[3rem]">
                <div className=" mt-[2rem] flex flex-col items-center justify-between gap-x-[2rem] xl:flex-row  ">
                  <div className=" hidden h-[26rem] w-[23rem] flex-col items-center justify-evenly gap-2 xl:flex">
                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          <svg
                            className="h-[2.5rem] w-[2.5rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 34.9 42.9"
                          >
                            <g id="stone-spa--relax-location-outdoor-recreation-travel-places">
                              <path
                                id="Vector"
                                d="m2,40.5c.6.9,1.6,1.4,2.6,1.4h25.7c1.1,0,2.1-.5,2.6-1.4.7-1,1-2.1,1-3.3,0-5.2-7.4-9.5-16.5-9.5S1,31.9,1,37.2c0,1.1.3,2.3,1,3.3Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector_2"
                                d="m19.1,27.7c7.4,0,13.4-3.5,13.4-7.9s-6-7.9-13.4-7.9-13.4,3.5-13.4,7.9,6,7.9,13.4,7.9h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector_3"
                                d="m15.1,12c5.2,0,9.5-2.5,9.5-5.5S20.4,1,15.1,1,5.6,3.5,5.6,6.5s4.3,5.5,9.5,5.5Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Moments of Calm
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Guided meditations, your daily oasis of serenity.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          {/* <img src={gratitude} className='w-[2rem] h-[2rem]' /> */}
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 33.68 42.5"
                          >
                            <g id="health-care-2--health-medical-hospital-heart-care-symbol">
                              <path
                                id="Vector"
                                d="m16.84,12.7c3.8,0,5.9-2.1,5.9-5.9s-2.1-5.8-5.9-5.8-5.9,2.1-5.9,5.9,2.1,5.8,5.9,5.8Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_2"
                                d="m30.64,19.3c-4.5-4.3-10.3-.2-13.8,3.3-3.5-3.5-9.2-7.6-13.8-3.3-7.4,7,7.2,21.2,13.8,22.2,6.6-1,21.2-15.2,13.8-22.2Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Gratitude Practices
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Fostering a preofound sense of appreciation and joy.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          <img
                            src={theme.shuruContent}
                            className="h-[2.5rem] w-[2.5rem]"
                          />
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          24/7 Therapy Tool
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Guidance when you need it most.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* phone image */}
                  <div className=" w-full xl:w-[18rem]">
                    <img src={theme.shoorah_phone} className="h-full object-cover w-full" />
                  </div>

                  <div className=" hidden h-[26rem] w-[23rem] flex-col items-center  justify-evenly gap-2 xl:flex">
                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          {/* <img src={breathwork} className='w-[2rem] h-[2rem]' /> */}
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 44 44"
                          >
                            <g id="smiley-very-happy-1">
                              <path
                                id="Vector_2"
                                d="m22,43c13.4,0,21-7.6,21-21S35.4,1,22,1,1,8.6,1,22s7.6,21,21,21Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector"
                                d="m11.3,25.2c1.7,5.8,8.1,9.4,13.9,7.8,3.5-1.3,6.5-4.2,7.4-7.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_557"
                                d="m10.2,17c.6-1,2-1.7,3.4-1.7s2.7.7,3.4,1.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_558"
                                d="m27.2,17c.6-1,2-1.7,3.4-1.7s2.7.7,3.4,1.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Breathwork
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Inhale serenity, exhale stress. It's your path to inner
                          peace.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 45.8 45"
                          >
                            <g id="snooze--nap-sleep-rest-break-clock-bed-time-moon">
                              <path
                                id="Vector_3"
                                d="m36.2,8.9h7.6l-8.1,11.5h8.6"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_1174"
                                d="m32.7,27.3h4.5l-4.8,6.8h5.1"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector"
                                d="m22.5,43.5c2.2,0,4.4-.2,6.5-.7.8-.2.8-1.2.1-1.6-6.4-3.2-9.9-9.6-9.9-18.7s3.5-15.5,9.9-18.7c.7-.4.7-1.4-.1-1.6-2.1-.5-4.3-.7-6.5-.7C9.1,1.5,1.5,9.1,1.5,22.5s7.6,21,21,21Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Enhanced Sleep & Rest
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Experience the soothing power of a good night's sleep.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 43.2 42.3"
                          >
                            <g id="street-sign--crossroad-street-sign-metaphor-directions-travel-places">
                              <path
                                id="Subtract"
                                d="m21.6,1h0Zm0,0c-3.9,0-7.2.2-10.5.4-1.3.1-2.7.1-4,.2-.8,0-1.5.3-2.1.9-1.8,1.7-4,4.2-4,6.4s2.1,4.3,3.9,6.2c.6.6,1.4,1,2.3,1,1.3.1,2.6.1,3.9.2,3.3.2,6.7.4,10.5.4m0-15.7v15.6m0,0h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Subtract_2"
                                d="m21.6,15.2h0Zm0,0c3.9,0,7.2.2,10.5.4,1.3.1,2.7.1,4,.2.8,0,1.5.3,2.1.9,1.8,1.7,4,4.2,4,6.4s-2.1,4.3-3.9,6.2c-.6.6-1.4,1-2.3,1-1.3.1-2.6.1-3.9.2-3.3.2-6.6.3-10.5.3m0-15.6v15.6m0,0h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector"
                                d="m21.6,1.2v40.1"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Mindset Transformation
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Empowering you to shape your world from within
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* mobile cards */}
                  <div className=" mt-6 flex w-full flex-col gap-y-4  xl:hidden">
                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          <svg
                            className="h-[2.5rem] w-[2.5rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 34.9 42.9"
                          >
                            <g id="stone-spa--relax-location-outdoor-recreation-travel-places">
                              <path
                                id="Vector"
                                d="m2,40.5c.6.9,1.6,1.4,2.6,1.4h25.7c1.1,0,2.1-.5,2.6-1.4.7-1,1-2.1,1-3.3,0-5.2-7.4-9.5-16.5-9.5S1,31.9,1,37.2c0,1.1.3,2.3,1,3.3Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector_2"
                                d="m19.1,27.7c7.4,0,13.4-3.5,13.4-7.9s-6-7.9-13.4-7.9-13.4,3.5-13.4,7.9,6,7.9,13.4,7.9h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector_3"
                                d="m15.1,12c5.2,0,9.5-2.5,9.5-5.5S20.4,1,15.1,1,5.6,3.5,5.6,6.5s4.3,5.5,9.5,5.5Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Moments of Calm
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Guided meditations, your daily oasis of serenity.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          {/* <img src={gratitude} className='w-[2rem] h-[2rem]' /> */}
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 33.68 42.5"
                          >
                            <g id="health-care-2--health-medical-hospital-heart-care-symbol">
                              <path
                                id="Vector"
                                d="m16.84,12.7c3.8,0,5.9-2.1,5.9-5.9s-2.1-5.8-5.9-5.8-5.9,2.1-5.9,5.9,2.1,5.8,5.9,5.8Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_2"
                                d="m30.64,19.3c-4.5-4.3-10.3-.2-13.8,3.3-3.5-3.5-9.2-7.6-13.8-3.3-7.4,7,7.2,21.2,13.8,22.2,6.6-1,21.2-15.2,13.8-22.2Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Gratitude Practices
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Fostering a preofound sense of appreciation and joy.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          <img
                            src={theme.shuruContent}
                            className="h-[2.5rem] w-[2.5rem]"
                          />
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          24/7 Therapy Tool
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Guidance when you need it most.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          {/* <img src={breathwork} className='w-[2rem] h-[2rem]' /> */}
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 44 44"
                          >
                            <g id="smiley-very-happy-1">
                              <path
                                id="Vector_2"
                                d="m22,43c13.4,0,21-7.6,21-21S35.4,1,22,1,1,8.6,1,22s7.6,21,21,21Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector"
                                d="m11.3,25.2c1.7,5.8,8.1,9.4,13.9,7.8,3.5-1.3,6.5-4.2,7.4-7.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_557"
                                d="m10.2,17c.6-1,2-1.7,3.4-1.7s2.7.7,3.4,1.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_558"
                                d="m27.2,17c.6-1,2-1.7,3.4-1.7s2.7.7,3.4,1.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Breathwork
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Inhale serenity, exhale stress. It's your path to inner
                          peace.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 45.8 45"
                          >
                            <g id="snooze--nap-sleep-rest-break-clock-bed-time-moon">
                              <path
                                id="Vector_3"
                                d="m36.2,8.9h7.6l-8.1,11.5h8.6"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_1174"
                                d="m32.7,27.3h4.5l-4.8,6.8h5.1"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector"
                                d="m22.5,43.5c2.2,0,4.4-.2,6.5-.7.8-.2.8-1.2.1-1.6-6.4-3.2-9.9-9.6-9.9-18.7s3.5-15.5,9.9-18.7c.7-.4.7-1.4-.1-1.6-2.1-.5-4.3-.7-6.5-.7C9.1,1.5,1.5,9.1,1.5,22.5s7.6,21,21,21Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Enhanced Sleep & Rest
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Experience the soothing power of a good night's sleep.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 43.2 42.3"
                          >
                            <g id="street-sign--crossroad-street-sign-metaphor-directions-travel-places">
                              <path
                                id="Subtract"
                                d="m21.6,1h0Zm0,0c-3.9,0-7.2.2-10.5.4-1.3.1-2.7.1-4,.2-.8,0-1.5.3-2.1.9-1.8,1.7-4,4.2-4,6.4s2.1,4.3,3.9,6.2c.6.6,1.4,1,2.3,1,1.3.1,2.6.1,3.9.2,3.3.2,6.7.4,10.5.4m0-15.7v15.6m0,0h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Subtract_2"
                                d="m21.6,15.2h0Zm0,0c3.9,0,7.2.2,10.5.4,1.3.1,2.7.1,4,.2.8,0,1.5.3,2.1.9,1.8,1.7,4,4.2,4,6.4s-2.1,4.3-3.9,6.2c-.6.6-1.4,1-2.3,1-1.3.1-2.6.1-3.9.2-3.3.2-6.6.3-10.5.3m0-15.6v15.6m0,0h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector"
                                d="m21.6,1.2v40.1"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Mindset Transformation
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Empowering you to shape your world from within
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :

          <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 overflow-hidden px-4 lg:mb-[3rem] xl:px-0">
            <p className="P22Mackinac mt-[1.5rem] flex w-full flex-wrap items-center justify-center text-center text-lg lg:mt-3 xl:text-left">
              Choose a subscription plan to unlock all the functionality's of the
              application
            </p>

            <div className="flex h-full w-full flex-col justify-evenly gap-5 rounded-3xl ">
              <div className="mt-[0.5rem] flex gap-8  w-full flex-col items-center justify-center gap-4 lg:mt-[3rem] lg:flex-wrap xl:flex-row ">
                {tabs.map((i, index) => (
                  <div
                    onClick={() => {
                      setTab(index);
                      setSelectPlan(i);
                    }}
                    key={index}
                    style={{
                      boxShadow:
                        "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                      zIndex: 0,
                    }}
                    className={`${tab == index ? `${theme.shoorah_bg_5} transition duration-500` : `${theme.shoorah_bg_3} transition duration-1000`} cursor-pointer flex w-full justify-center h-[35rem] xl:h-[38rem] xl:w-[22rem] rounded-3xl `}
                  >
                    {/* <div className="flex h-full w-full flex-col items-center justify-evenly gap-6 py-4 xl:gap-[3rem] ">
                    <p className="z-10 text-center text-2xl  text-white">
                      {i.time}
                    </p>
                    <div className="flex flex-row items-center justify-center gap-x-2 xl:flex-col">
                      <p className="z-10 text-xl text-white">£</p>
                      <p className="z-10 text-[3rem] text-white">{i.price}</p>
                      <p className="z-10 text-xl text-white">{i.duration}</p>
                    </div>

                    <div className="flex flex-col gap-2 px-4 ">
                      {i.data.map((text, index) => (
                        <p
                          key={index}
                          className="text-md z-10 flex items-center gap-3 text-left text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            className="h-6 w-6"
                            fill="#fff"
                            viewBox="0 0 30 30"
                          >
                            <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
                          </svg>
                          <span>{text}</span>
                        </p>
                      ))}
                    </div>

                    <div className="flex w-full flex-col px-[4rem]">
                      {currentPlan?.accountType == "SUBSCRIBED" &&
                        i.productId == currentPlan?.productId ? (
                        <button
                          disabled
                          className={`text-md z-10 w-full bg-white outline-none  focus:outline-none  ${theme.shoorah_text_5}  rounded-[3rem] py-2 text-lg `}
                        >
                          Current subscription
                        </button>
                      ) : currentPlan?.accountType != "SUBSCRIBED" ? (
                        <button
                          onClick={handleBuy}
                          className={`z-10 w-full ${theme.shoorah_bg_hover_8} outline-none focus:outline-none  focus:ring-2 focus:ring-offset-0 ${theme.shoorah_border_ring_focus_8} rounded-[3rem] px-8 py-3 text-lg text-white ${theme.shoorah_bg_6}`}
                        >
                          Buy
                        </button>
                      ) : (
                        <button
                          onClick={handleBuy}
                          className={`z-10 w-full ${theme.shoorah_bg_hover_8} outline-none focus:outline-none  focus:ring-2 focus:ring-offset-0 ${theme.shoorah_border_ring_focus_8} rounded-[3rem] px-8 py-3 text-lg text-white ${theme.shoorah_bg_6}`}
                        >
                          Change Plan
                        </button>
                      )}
                    </div>
                  </div> */}

                    <div className="flex">
                      <div className="flex h-full gap-5 py-5 px-3 justify-between flex-col">
                        <p className="z-10 text-center text-2xl  text-white">
                          {i.time}
                        </p>
                        <div className="flex flex-row items-center justify-center gap-x-2 xl:flex-col">
                          <p className="z-10 text-xl text-white">£</p>
                          <p className="z-10 text-[3rem] text-white">{i.price}</p>
                          <p className="z-10 text-xl text-white">{i.duration}</p>
                        </div>

                        <div className="flex flex-col gap-2 px-4 ">
                          {i.data.map((text, index) => (
                            <p
                              key={index}
                              className="text-md z-10 flex items-center gap-3 text-left text-white"
                            >
                              {text.length ?
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  className="h-6 w-6"
                                  fill="#fff"
                                  viewBox="0 0 30 30"
                                >
                                  <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
                                </svg>
                                :
                                null
                              }

                              <span>{text}</span>
                            </p>
                          ))}
                        </div>

                        <div className="flex w-full flex-col px-[4rem]">
                          {currentPlan?.accountType == "SUBSCRIBED" &&
                            i.productId == currentPlan?.productId ? (
                            <button
                              disabled
                              className={`px-3 z-10 w-full bg-white outline-none  focus:outline-none  ${theme.shoorah_text_5}  rounded-[3rem] pb-4 py-3 text-md `}
                            >
                              Current subscription
                            </button>
                          ) : currentPlan?.accountType != "SUBSCRIBED" ? (
                            <button
                              onClick={handleBuy}
                              className={`z-10 w-full ${theme.shoorah_bg_hover_8} outline-none focus:outline-none  focus:ring-2 focus:ring-offset-0 ${theme.shoorah_border_ring_focus_8} rounded-[3rem] px-8 py-3 text-lg text-white ${theme.shoorah_bg_6}`}
                            >
                              Buy
                            </button>
                          ) : (
                            <button
                              onClick={handleBuy}
                              className={`z-10 w-full ${theme.shoorah_bg_hover_8} outline-none focus:outline-none  focus:ring-2 focus:ring-offset-0 ${theme.shoorah_border_ring_focus_8} rounded-[3rem] px-8 py-3 text-lg text-white ${theme.shoorah_bg_6}`}
                            >
                              Change Plan
                            </button>
                          )}
                        </div>
                      </div>
                    </div>



                  </div>
                ))}
              </div>

              <div
                onClick={() => {
                  setSelectPlan(free);
                }}
                style={{
                  boxShadow:
                    "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                  zIndex: 0,
                }}
                className={`${tab == 4 && `${theme.shoorah_bg_5}`
                  } cursor-pointer xl:mt-[3rem] ${theme.shoorah_bg_4
                  } mx-auto w-full rounded-3xl border-none py-4 xl:h-[25rem] xl:w-[40rem] xl:py-[2rem]`}
              >
                <div className="flex h-full w-full  flex-col items-center justify-around gap-[1rem] px-[2rem]">
                  <div className="flex w-full flex-col items-center gap-[1.5rem]">
                    <p className="z-10 text-center text-2xl font-[600] text-white">
                      {free.time}
                    </p>
                    <p className="z-10 text-[2.5rem] font-[500] text-white">
                      {free.duration}
                    </p>

                    <div className="grid w-full grid-cols-1 gap-3 px-2 xl:flex">
                      <div className="flex flex-col gap-2">
                        {free.data.map((text, index) => (
                          <p
                            key={index}
                            className="z-10 flex items-center gap-4  text-white "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              className="h-6 w-6"
                              fill="#fff"
                              viewBox="0 0 30 30"
                            >
                              <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
                            </svg>
                            <span className="text-md">{text}</span>
                          </p>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2">
                        {free.data2.map((text, index) => (
                          <p
                            key={index}
                            className="z-10 flex items-center gap-4  text-white "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              className="h-6 w-6"
                              fill="#fff"
                              viewBox="0 0 30 30"
                            >
                              <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
                            </svg>
                            <span className="text-md">{text}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-col px-[4rem]">
                    {currentPlan?.accountType == "SUBSCRIBED" &&
                      filterPlan.length == 0 ? (
                      <button
                        onClick={handleDowngrade}
                        className={`z-10 w-full ${theme.shoorah_bg_hover_8} outline-none focus:outline-none  focus:ring-2 focus:ring-offset-0 ${theme.shoorah_border_ring_focus_8} P22Mackinac rounded-[3rem] px-8  py-3 text-lg text-white ${theme.shoorah_bg_6}`}
                      >
                        Downgrade
                      </button>
                    ) : currentPlan?.accountType == "INITIAL_USER" ? (
                      <button
                        // onClick={handleBuy}
                        disabled
                        className={`z-10 w-full ${theme.shoorah_bg_hover_8}  outline-none focus:outline-none  focus:ring-2 focus:ring-offset-0 ${theme.shoorah_border_ring_focus_8} P22Mackinac rounded-[3rem] px-8  py-3 text-lg text-white ${theme.shoorah_bg_6}`}
                      >
                        Current subscription
                      </button>
                    ) : (
                      <button
                        onClick={handleBuy}
                        className={`z-10 w-full ${theme.shoorah_bg_hover_8} outline-none focus:outline-none  focus:ring-2 focus:ring-offset-0 ${theme.shoorah_border_ring_focus_8} P22Mackinac rounded-[3rem] px-8 py-3 text-lg text-white ${theme.shoorah_bg_6}`}
                      >
                        Buy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p className="P22Mackinac mt-8 flex w-full flex-wrap items-center justify-center text-[2.5rem] xl:mt-[5rem]">
              What we do?
            </p>
            <p className="P22Mackinac  mx-auto flex w-full flex-wrap items-center justify-center text-center text-lg xl:w-[40rem]">
              Helping you prioritise and support your mental health through
              <br className="hidden xl:flex" />
              simplicity & convenience!
            </p>

            <div className=" flex items-center justify-between gap-x-[2rem] xl:mt-[2rem]  ">
              {/* Cut */}
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 overflow-hidden lg:mb-[3rem]">
                <div className=" mt-[2rem] flex flex-col items-center justify-between gap-x-[2rem] xl:flex-row  ">
                  <div className=" hidden h-[26rem] w-[23rem] flex-col items-center justify-evenly gap-2 xl:flex">
                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          <svg
                            className="h-[2.5rem] w-[2.5rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 34.9 42.9"
                          >
                            <g id="stone-spa--relax-location-outdoor-recreation-travel-places">
                              <path
                                id="Vector"
                                d="m2,40.5c.6.9,1.6,1.4,2.6,1.4h25.7c1.1,0,2.1-.5,2.6-1.4.7-1,1-2.1,1-3.3,0-5.2-7.4-9.5-16.5-9.5S1,31.9,1,37.2c0,1.1.3,2.3,1,3.3Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector_2"
                                d="m19.1,27.7c7.4,0,13.4-3.5,13.4-7.9s-6-7.9-13.4-7.9-13.4,3.5-13.4,7.9,6,7.9,13.4,7.9h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector_3"
                                d="m15.1,12c5.2,0,9.5-2.5,9.5-5.5S20.4,1,15.1,1,5.6,3.5,5.6,6.5s4.3,5.5,9.5,5.5Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Moments of Calm
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Guided meditations, your daily oasis of serenity.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          {/* <img src={gratitude} className='w-[2rem] h-[2rem]' /> */}
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 33.68 42.5"
                          >
                            <g id="health-care-2--health-medical-hospital-heart-care-symbol">
                              <path
                                id="Vector"
                                d="m16.84,12.7c3.8,0,5.9-2.1,5.9-5.9s-2.1-5.8-5.9-5.8-5.9,2.1-5.9,5.9,2.1,5.8,5.9,5.8Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_2"
                                d="m30.64,19.3c-4.5-4.3-10.3-.2-13.8,3.3-3.5-3.5-9.2-7.6-13.8-3.3-7.4,7,7.2,21.2,13.8,22.2,6.6-1,21.2-15.2,13.8-22.2Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Gratitude Practices
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Fostering a preofound sense of appreciation and joy.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          <img
                            src={theme.shuruContent}
                            className="h-[2.5rem] w-[2.5rem]"
                          />
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          24/7 Therapy Tool
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Guidance when you need it most.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* phone image */}
                  <div className=" w-full xl:w-[18rem]">
                    <img src={theme.shoorah_phone} className="h-full object-cover w-full" />
                  </div>

                  <div className=" hidden h-[26rem] w-[23rem] flex-col items-center  justify-evenly gap-2 xl:flex">
                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          {/* <img src={breathwork} className='w-[2rem] h-[2rem]' /> */}
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 44 44"
                          >
                            <g id="smiley-very-happy-1">
                              <path
                                id="Vector_2"
                                d="m22,43c13.4,0,21-7.6,21-21S35.4,1,22,1,1,8.6,1,22s7.6,21,21,21Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector"
                                d="m11.3,25.2c1.7,5.8,8.1,9.4,13.9,7.8,3.5-1.3,6.5-4.2,7.4-7.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_557"
                                d="m10.2,17c.6-1,2-1.7,3.4-1.7s2.7.7,3.4,1.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_558"
                                d="m27.2,17c.6-1,2-1.7,3.4-1.7s2.7.7,3.4,1.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Breathwork
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Inhale serenity, exhale stress. It's your path to inner
                          peace.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 45.8 45"
                          >
                            <g id="snooze--nap-sleep-rest-break-clock-bed-time-moon">
                              <path
                                id="Vector_3"
                                d="m36.2,8.9h7.6l-8.1,11.5h8.6"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_1174"
                                d="m32.7,27.3h4.5l-4.8,6.8h5.1"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector"
                                d="m22.5,43.5c2.2,0,4.4-.2,6.5-.7.8-.2.8-1.2.1-1.6-6.4-3.2-9.9-9.6-9.9-18.7s3.5-15.5,9.9-18.7c.7-.4.7-1.4-.1-1.6-2.1-.5-4.3-.7-6.5-.7C9.1,1.5,1.5,9.1,1.5,22.5s7.6,21,21,21Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Enhanced Sleep & Rest
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Experience the soothing power of a good night's sleep.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white">
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 43.2 42.3"
                          >
                            <g id="street-sign--crossroad-street-sign-metaphor-directions-travel-places">
                              <path
                                id="Subtract"
                                d="m21.6,1h0Zm0,0c-3.9,0-7.2.2-10.5.4-1.3.1-2.7.1-4,.2-.8,0-1.5.3-2.1.9-1.8,1.7-4,4.2-4,6.4s2.1,4.3,3.9,6.2c.6.6,1.4,1,2.3,1,1.3.1,2.6.1,3.9.2,3.3.2,6.7.4,10.5.4m0-15.7v15.6m0,0h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Subtract_2"
                                d="m21.6,15.2h0Zm0,0c3.9,0,7.2.2,10.5.4,1.3.1,2.7.1,4,.2.8,0,1.5.3,2.1.9,1.8,1.7,4,4.2,4,6.4s-2.1,4.3-3.9,6.2c-.6.6-1.4,1-2.3,1-1.3.1-2.6.1-3.9.2-3.3.2-6.6.3-10.5.3m0-15.6v15.6m0,0h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector"
                                d="m21.6,1.2v40.1"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Mindset Transformation
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Empowering you to shape your world from within
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* mobile cards */}
                  <div className=" mt-6 flex w-full flex-col gap-y-4  xl:hidden">
                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          <svg
                            className="h-[2.5rem] w-[2.5rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 34.9 42.9"
                          >
                            <g id="stone-spa--relax-location-outdoor-recreation-travel-places">
                              <path
                                id="Vector"
                                d="m2,40.5c.6.9,1.6,1.4,2.6,1.4h25.7c1.1,0,2.1-.5,2.6-1.4.7-1,1-2.1,1-3.3,0-5.2-7.4-9.5-16.5-9.5S1,31.9,1,37.2c0,1.1.3,2.3,1,3.3Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector_2"
                                d="m19.1,27.7c7.4,0,13.4-3.5,13.4-7.9s-6-7.9-13.4-7.9-13.4,3.5-13.4,7.9,6,7.9,13.4,7.9h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector_3"
                                d="m15.1,12c5.2,0,9.5-2.5,9.5-5.5S20.4,1,15.1,1,5.6,3.5,5.6,6.5s4.3,5.5,9.5,5.5Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Moments of Calm
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Guided meditations, your daily oasis of serenity.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          {/* <img src={gratitude} className='w-[2rem] h-[2rem]' /> */}
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 33.68 42.5"
                          >
                            <g id="health-care-2--health-medical-hospital-heart-care-symbol">
                              <path
                                id="Vector"
                                d="m16.84,12.7c3.8,0,5.9-2.1,5.9-5.9s-2.1-5.8-5.9-5.8-5.9,2.1-5.9,5.9,2.1,5.8,5.9,5.8Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_2"
                                d="m30.64,19.3c-4.5-4.3-10.3-.2-13.8,3.3-3.5-3.5-9.2-7.6-13.8-3.3-7.4,7,7.2,21.2,13.8,22.2,6.6-1,21.2-15.2,13.8-22.2Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Gratitude Practices
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Fostering a preofound sense of appreciation and joy.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          <img
                            src={theme.shuruContent}
                            className="h-[2.5rem] w-[2.5rem]"
                          />
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          24/7 Therapy Tool
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Guidance when you need it most.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          {/* <img src={breathwork} className='w-[2rem] h-[2rem]' /> */}
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 44 44"
                          >
                            <g id="smiley-very-happy-1">
                              <path
                                id="Vector_2"
                                d="m22,43c13.4,0,21-7.6,21-21S35.4,1,22,1,1,8.6,1,22s7.6,21,21,21Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector"
                                d="m11.3,25.2c1.7,5.8,8.1,9.4,13.9,7.8,3.5-1.3,6.5-4.2,7.4-7.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_557"
                                d="m10.2,17c.6-1,2-1.7,3.4-1.7s2.7.7,3.4,1.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_558"
                                d="m27.2,17c.6-1,2-1.7,3.4-1.7s2.7.7,3.4,1.7"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Breathwork
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Inhale serenity, exhale stress. It's your path to inner
                          peace.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 45.8 45"
                          >
                            <g id="snooze--nap-sleep-rest-break-clock-bed-time-moon">
                              <path
                                id="Vector_3"
                                d="m36.2,8.9h7.6l-8.1,11.5h8.6"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector_1174"
                                d="m32.7,27.3h4.5l-4.8,6.8h5.1"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Vector"
                                d="m22.5,43.5c2.2,0,4.4-.2,6.5-.7.8-.2.8-1.2.1-1.6-6.4-3.2-9.9-9.6-9.9-18.7s3.5-15.5,9.9-18.7c.7-.4.7-1.4-.1-1.6-2.1-.5-4.3-.7-6.5-.7C9.1,1.5,1.5,9.1,1.5,22.5s7.6,21,21,21Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Enhanced Sleep & Rest
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Experience the soothing power of a good night's sleep.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${theme.shoorah_bg_3} mx-auto flex h-[7rem]  w-full items-center gap-5 self-center rounded-3xl px-5 `}
                    >
                      <div className="w-[25%] ">
                        <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white xl:mb-4">
                          <svg
                            className="h-[2rem] w-[2rem]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 43.2 42.3"
                          >
                            <g id="street-sign--crossroad-street-sign-metaphor-directions-travel-places">
                              <path
                                id="Subtract"
                                d="m21.6,1h0Zm0,0c-3.9,0-7.2.2-10.5.4-1.3.1-2.7.1-4,.2-.8,0-1.5.3-2.1.9-1.8,1.7-4,4.2-4,6.4s2.1,4.3,3.9,6.2c.6.6,1.4,1,2.3,1,1.3.1,2.6.1,3.9.2,3.3.2,6.7.4,10.5.4m0-15.7v15.6m0,0h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Subtract_2"
                                d="m21.6,15.2h0Zm0,0c3.9,0,7.2.2,10.5.4,1.3.1,2.7.1,4,.2.8,0,1.5.3,2.1.9,1.8,1.7,4,4.2,4,6.4s-2.1,4.3-3.9,6.2c-.6.6-1.4,1-2.3,1-1.3.1-2.6.1-3.9.2-3.3.2-6.6.3-10.5.3m0-15.6v15.6m0,0h0Z"
                                fill={theme.shoorah_2}
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                              <path
                                id="Vector"
                                d="m21.6,1.2v40.1"
                                fill="none"
                                stroke={theme.shoorah_7}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-[75%] flex-col gap-2 ">
                        <p className="P22Mackinac text-xl font-bold text-white">
                          Mindset Transformation
                        </p>
                        <p className="P22Mackinac text-sm text-gray-100 opacity-75 ">
                          Empowering you to shape your world from within
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Elements stripe={promise}>
                <CheckoutForm
                  clientSecret={clientSecret}
                  setTransaction={setTransaction}
                  setTransactionModal={setTransactionModal}
                  open={paymentModal}
                  plan={selectPlan}
                  setOpen={setPaymentModal}
                  selectedPlan={tab}
                />
              </Elements>
              <TransactionModal
                open={transactionModal}
                setOpen={setTransactionModal}
                plan={selectPlan}
                transaction={transaction}
              />
            </div>
          </div>
        }

      </div>
    </div>
  );
};

export default Subscription;
