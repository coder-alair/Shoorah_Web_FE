import React, { useEffect, useState } from "react";
import parser from "html-react-parser";
import { Api } from "../../../../../api";
import { errorToast } from "../../../../../utils/helper";
import Header from "../../../header";
import Loader from "../../../../../component/common/Loader";

const CookiePolicy = () => {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getCookiePolicy();
  }, []);

  const getCookiePolicy = () => {
    setLoader(true);
    Api.getCmsPage(`cookie-policy`)
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
      <div className='flex justify-center'>
        <Header
          title={`Cookie Policy`}
          goBack={true}
          hide={true}
          backUrl={`/me`}
        /> </div>
      <div className='sm:px-10 w-[90%] flex flex-wrap  mx-auto  py-2'>
        {loader && <Loader />}
        <p className='text-[0.8rem] md:text-[1.2rem] P22Mackinac mx-auto'>

          {data && parser(data?.description)}
        </p>
      </div>
    </>
  );
};

export default CookiePolicy;
