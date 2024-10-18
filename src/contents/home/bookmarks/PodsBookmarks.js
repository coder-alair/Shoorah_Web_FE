import React, { useEffect, useState } from "react";
import { BOOKMARKS_CONTENT_TYPE } from "../../../utils/constants";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Api } from "../../../api";
import { errorToast } from "../../../utils/helper";
import SoundCard from "../../reusable/soundCard";
import Loader from "../../../component/common/Loader";

const PodsBookmarks = () => {
  const [pods, setPods] = useState([]);
  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const getBookmarks = () => {
    setLoader(true);
    Api.getMyBookmarks(BOOKMARKS_CONTENT_TYPE.SHOORAH_PODS)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setPods(res.data.data);
          setLoader(false);
        } else {
          errorToast(res.data.meta.message);
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);

        errorToast(`Some Error Occurred ${err}`);
      });
  };

  const userActivity = (i) => {
    let feature =
      i.contentType == 5 ? 5 : i.contentType == 3 ? 8 : i.contentType == 4 ? 9 : null;
    let payload = {
      featureType: feature,
    };
    Api.userActivityStatus(payload)
      .then((res) => {
        if (res.data.meta.code == 1) {
          console.log("success");
          if (res.data.data.totalCount > 1) {
            history.push('/subscription');
          } else {
            window.location.href = `/soundPlayer/type/${i.contentType}/content/${i.contentId}`;
          }
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRedirection = (i) => {
    Api.getCurrentPlan().then((res) => {
      if (res.data.meta.code == 1) {
        if (res?.data?.data?.accountType != "SUBSCRIBED") {
          userActivity(i);
        }
        else {
          window.location.href = `/soundPlayer/type/${i.contentType}/content/${i.contentId}`;
        }
      }
    });
  }

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div
      className={`mx-auto items-center justify-evenly md:justify-start  lg:my-3 lg:mt-[2rem] flex w-[95%] md:w-[86%] lg:w-[76%] flex-wrap gap-x-5 px-4`}
    >
      {loader && <Loader />}
      {pods.map((i) => (
        <div
        onClick={() =>
          handleRedirection(i)
        }
          key={i.contentId}
          className="cursor-pointer lg:w-[15rem] w-[8rem] md:w-[10rem]"
        >
          <SoundCard data={i} />
        </div>
      ))}
      {!pods.length && (
        <div className="P22Mackinac mt-[5rem] flex justify-center items-center lg:mt-[3rem] h-full lg:h-[10rem] text-md md:text-lg lg:text-2xl">No Pods</div>
      )}
    </div>
  );
};

export default PodsBookmarks;
