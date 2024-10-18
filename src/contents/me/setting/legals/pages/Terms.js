import React, { useEffect, useState } from "react";
import parser from "html-react-parser";
import { Api } from "../../../../../api";
import { errorToast } from "../../../../../utils/helper";
import Header from "../../../header";
import Loader from "../../../../../component/common/Loader";

const Terms = () => {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getTermsCondition();
  }, []);

  const getTermsCondition = () => {
    setLoader(true);
    Api.getCmsPage(`terms-and-conditions`)
      .then((res) => {
        if (res.data.meta.code == 1) {
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
          title={`Terms & Conditions`}
          goBack={true}
          hide={true}
          backUrl={`/me`}
        />
      </div>
      <div className="mx-auto flex w-screen justify-center  px-10 py-2  lg:w-[90%]">
        {loader && <Loader />}
        <p className="P22Mackinac mx-auto text-xs lg:text-[1.2rem]">
          {data && parser(data?.description)}
        </p>
      </div>
    </>
  );
};

export default Terms;
