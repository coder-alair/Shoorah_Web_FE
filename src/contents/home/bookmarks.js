import React, { Fragment, useEffect, useState } from "react";
import BookmarkCarsouel from "../layout/bookmarkcarsouel";
import shoorahshape2 from "../../assets/images/shoorahShape2.png";
import Loader from "../../component/common/Loader";
import { Api } from "../../api";
import { CONTENT_TYPE } from "../../utils/constants";
import { successToast } from "../../utils/helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";

const Bookmarks = ({ refresh }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const { theme } = useTheme();

  useEffect(() => {
    getBookmarks();
  }, [refresh]);

  const getBookmarks = async () => {
    setLoader(true);
    Api.getAllMyBookmarks(1, 10)
      .then((res) => {
        setBookmarks(res.data.data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };

  const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
    
    <svg
       version="1.1"
       id="svg2"
       width="1440"
       height="1440"
       viewBox="0 0 1440 1440"
       sodipodi:docname="Shoorah_Shape_3.ai"
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
         inkscape:label="Shoorah_Shape_3"
         transform="matrix(1.3333333,0,0,-1.3333333,0,1440)">
        <g
           id="g10">
          <g
             id="g12"
             clip-path="url(#clipPath16)">
            <g
               id="g18"
               transform="translate(85.5357,886.4614)">
              <path
                 d="m 0,0 c 25.079,28.935 57.208,45.075 94.516,49.97 126.513,16.632 252.592,35.059 378.765,51.728 71.969,9.506 144.562,14.76 216.834,21.054 82.062,7.125 141.482,-35.606 158.889,-115.589 42.278,-194.854 73.102,-391.541 91.283,-590.043 C 947.81,-664.45 902.111,-722.944 817.8,-739.538 613.61,-779.699 406.509,-806.234 197.462,-816.156 105.081,-820.522 46.474,-774.955 31.505,-688.83 -2.817,-492.71 -23.511,-295.267 -32.016,-96.69 -33.566,-60.592 -22.68,-28.236 0,0"
                 style="fill:${theme.shoorahShapeColor};fill-opacity:0.59;fill-rule:nonzero;stroke:none"
                 id="path20" />
            </g>
          </g>
        </g>
      </g>
    </svg>`;

  if (!bookmarks.length) {
    return <div className="h-[2rem] w-full"></div>;
  }

  return (
    <div className="w-full">
      <div className="relative mt-[4rem] flex h-fit flex-col overflow-hidden md:h-[30rem] xl:mt-[3.5rem]">
        {loader && <Loader />}

        {/* <img src={shoorahshape2} className='absolute z-[-3]  w-[20vw]' /> */}
        <div
          style={{ rotate: "" }}
          className="absolute  bottom-[-8rem] right-[1rem] z-[-3] w-[14rem] md:w-[20rem] lg:w-[28rem]"
        >
          <svg
            // width={1440}
            // height={1440}
            viewBox="0 0 1440 1440"
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>

        {bookmarks.length ? (
          <div className="lg:[0] mb-4 w-full ">
            <div className="relative mx-auto w-full xl:w-[75%]">
              <h1 className=" xl:text-semibold P22Mackinac w-full px-4 text-left text-2xl font-medium xl:w-auto xl:px-0 xl:text-center xl:text-4xl">
                Your Bookmarks
              </h1>
            </div>

            <div className=" flex h-auto items-center justify-center xl:mt-[1rem] xl:h-[24rem]">
              {bookmarks.length > 0 && <BookmarkCarsouel data={bookmarks} />}
              {bookmarks.length == 0 && (
                <p className="P22Mackinac text-2xl">No Bookmarks</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Bookmarks;
