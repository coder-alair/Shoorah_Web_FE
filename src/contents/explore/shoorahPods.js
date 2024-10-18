import React, { useEffect, useState } from "react";
import Header from "../me/header";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Api } from "../../api";
import { errorToast } from "../../utils/helper";
import SoundCard from "../reusable/soundCard";
import { useTheme } from "../context/themeContext";
import Loader from "../../component/common/Loader";
import CategoryFilter from "../reusable/categoryFilter";
import SearchInputField from "../reusable/searchInput";
import InfiniteScroll from "react-infinite-scroll-component";
import SideMenu from "../layout/sideMenu";
import { useRef } from "react";
import Navbar from "../layout/navbar";
import Hero from "../reusable/hero";
import BackButton from "../reusable/backButton";
import NewCarousel from "../reusable/newCarsouel";
import { CONTENT_TYPE } from "../../utils/constants";
import TutorialVideo from "../reusable/tutorialVideo";

const ShoorahPods = () => {
  const { theme } = useTheme();
  const [loader, setLoader] = useState(false);
  const [searchKey, setSearchkey] = useState("");
  const [pods, setPods] = useState([]);
  const [secondPods, setSecondPods] = useState([]);
  const divRef1 = useRef(null);
  const divRef2 = useRef(null);
  const [showLeftButton1, setShowLeftButton1] = useState(false);
  const [showRightButton1, setShowRightButton1] = useState(false);
  const [showLeftButton2, setShowLeftButton2] = useState(false);
  const [showRightButton2, setShowRightButton2] = useState(false);

  const history = useHistory();
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState(pods);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [refresh, setRefresh] = useState(1);
  const [show, setShow] = useState(false);


  const getShoorahPodsList = async () => {
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

    // catrgory id: searchkey
    Api.getShoorahPods(1, 15, searchKey, category?._id)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setLoader(false);
          setPods(res.data.data);
          // setPage(prevPage => prevPage + 1);
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

  const getCategoriesByContentId = () => {
    Api.getCategoryById(5)
      .then((res) => {
        if (res.status == 200) {
          if (res?.data?.meta?.code == 1) {
            setCategories(res?.data?.data);
            // setCategory(res?.data?.data[0]);
          } else {
            errorToast(res?.data?.meta?.message);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast("Something went wrong!");
      });
  };

  const getSecondPodsList = async () => {
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
    Api.getShoorahPods(2, 15, searchKey, category?._id)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setLoader(false);
          setSecondPods(res.data.data);
          // setPage(prevPage => prevPage + 1);
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

  useEffect(() => {
    Api.getCurrentPlan().then((res) => {
      if (res.data.meta.code == 1) {
        if (res?.data?.data?.accountType != "SUBSCRIBED") {
          history.replace("/subscription");
        }
      }
    });
  }, []);

  //   retrieveing categories
  useEffect(() => {
    getCategoriesByContentId();
  }, []);

  // useEffect(() => {

  //   apiCall();
  // }, [searchKey, category]);

  const apiCall = async () => {
    await getShoorahPodsList();
    await getSecondPodsList();
    // setFilters(searchKey);
  };

  useEffect(() => {
    apiCall();
  }, [category, searchKey]);

  useEffect(() => {
    if (refresh > 1) {
      apiCall();
    }
  }, [refresh]);

  const handleSearchKey = (e) => {
    e.target.value = e.target.value.replace(/^\s+/g, "");
    setSearchkey(e.target.value);
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

  return (
    <div className="relative overflow-hidden pb-[13vh] lg:mb-[6rem] lg:pb-0">
      {loader && <Loader />}
      <Navbar />
      <SideMenu />
      <Hero show={show} setShow={setShow} heading={`Shoorah Pods`} subhead={``} />

      <TutorialVideo
        show={show}
        setShow={setShow}
        title={`Welcome to Pods`}
        contentType={CONTENT_TYPE[5]}
        hideVideo={true}
        descriptionOne={
          "Enjoy listening to our informative and relaxing mini pods created by our wise and experienced Shoorah Experts."
        }
        descriptionTwo={
          "Our pods including subjects around mindset, meditation, breath work, sleep, relationships and so much more... and are short and sweet to fit into your busy life."
        }
      />

      <div
        style={{ rotate: "20deg" }}
        className="absolute right-[-15%] top-[18rem] z-[-3] w-[14rem] md:w-[20rem] lg:w-[28rem]"
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
        className="absolute left-[-15%] top-[40rem] z-[-3]  w-[14rem] md:w-[20rem] lg:w-[28rem]"
      >
        <svg
          // width={1440}
          // height={1440}
          viewBox="0 0 1440 1440"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: pentagonContent }}
        />
      </div>

      <div className="relative mx-auto mt-6 flex w-full flex-col justify-around  gap-x-10 gap-y-4 px-4 xl:mt-[4rem] xl:w-[76%] xl:flex-row  ">
        <BackButton />
        <CategoryFilter
          apiCall={apiCall}
          setRefresh={setRefresh}
          refresh={refresh}
          categories={[...categories]}
          category={category}
          setCategory={setCategory}
        />
        <SearchInputField
          placeholder={`Search pods here`}
          searchKey={searchKey}
          setSearchKey={setSearchkey}
          handleSearchKey={handleSearchKey}
        />
      </div>

      <div className="mx-auto flex w-full items-center justify-center px-4 lg:mt-8 lg:h-[24rem] lg:w-[90%] xl:mt-8">
        <NewCarousel data={pods} />
      </div>

      <div
        className={` mx-auto mb-[1rem] w-full px-4 lg:h-[24rem] lg:w-[90%] ${secondPods.length > 0 ? `` : `mb-[6rem]`
          }`}
      >
        <NewCarousel data={secondPods} />
      </div>
    </div>
  );
};

export default ShoorahPods;
