import React, { useEffect, useState } from "react";
import parser from "html-react-parser";
import { Api } from "../../../../../api";
import { errorToast } from "../../../../../utils/helper";
import Header from "../../../header";
import Loader from "../../../../../component/common/Loader";

const Privacy = () => {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  const getPrivacyPolicy = () => {
    setLoader(true);
    Api.getCmsPage(`privacy-policy`)
      .then((res) => {
        if (res.data.meta.code === 1) {
          setLoader(false);
          setData(res.data.data);
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
  return (
    <>
      <div className="flex justify-center">
        <Header
          title={`Privacy Policy`}
          goBack={true}
          hide={true}
          backUrl={`/me`}
        />
      </div>
      <div className=" mx-auto flex w-full justify-center px-4  py-2 xl:w-[90%]  xl:px-10">
        {loader && <Loader />}
        <p className="P22Mackinac mx-auto text-[0.9rem] md:text-[1.2rem]">
          {data && parser(data?.description)}
        </p>
      </div>
    </>
  );
};

export default Privacy;
