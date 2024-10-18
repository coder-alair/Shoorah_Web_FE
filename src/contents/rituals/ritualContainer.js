import React, { useEffect, useState } from "react";
import { successToast } from "../../utils/helper";
import { Api } from "../../api";
import Loader from "../../component/common/Loader";
import bin from "../../assets/images/bin.png";
import ConfirmPopup from "../../component/common/modals/ConfirmPopup";
import RitualEdit from "../reusable/ritualsEdit";

const RitualContainer = ({ searchKey, refresh, setRefresh }) => {
  const [myRituals, setMyRituals] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [show, setShow] = useState(false);
  const [delRitual, setDelRitual] = useState(null);
  const [drafts, setDraft] = useState([]);

  useEffect(() => {
    getMyRituals();
    getMyDrafts();
  }, [refresh]);

  useEffect(() => {
    searchKey = searchKey.trim().toLowerCase();
    if (searchKey.length) {
      let data = myRituals.filter((i) =>
        i.ritualName.toLowerCase().includes(searchKey),
      );
      setFilterData(data);
    }
    if (searchKey.length === 0) {
      setFilterData(myRituals);
    }
  }, [searchKey]);

  const getMyRituals = () => {
    setLoader(true);
    Api.getUserRituals()
      .then((res) => {
        if (res?.data?.meta?.code === 9) {
          setLoader(false);
          setError(res.data.meta.message);
        } else {
          setMyRituals(res.data.data);
          setFilterData(res.data.data);
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.message);
      });
  };

  const getMyDrafts = () => {
    setLoader(true);
    Api.getDraftRituals(1, 20)
      .then((res) => {
        if (res?.data?.meta?.code === 9) {
          setLoader(false);
          setError(res.data.meta.message);
        } else {
          setDraft(res.data.data);
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.message);
      });
  };

  const deleteRitual = (i) => {
    Api.deleteMyRitual(i)
      .then((res) => {
        setRefresh(!refresh);
        successToast("Ritual is deleted!");
      })
      .catch((err) => console.log(err.message));
  };

  const apiCall = () => {
    getMyRituals();
    getMyDrafts();
  };

  return (
    <div className="relative md:mb-[14.5rem] h-fit min-h-[10rem] w-full xl:my-[2.5rem]">
      {loader && <Loader />}

      {drafts.length > 0 && (
        <div className="mx-auto mt-[2rem] flex h-fit w-full flex-col gap-5 px-4 xl:w-[70%] xl:px-0 ">
          <p className="P22Mackinac text-2xl xl:text-[1.8rem] 2xl:text-[2rem]">
            My Drafts
          </p>

          <div
            style={{
              boxShadow:
                "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
            }}
            className="mt-2 h-full w-full  rounded-[3.5rem] bg-[#fff] text-[1.5rem] "
          >
            <div className={`h-fit w-full   py-5 pl-10`}>
              {drafts.map((ritual, index) => (
                <React.Fragment key={index}>
                  <div
                    className="my-4 flex items-center"
                    key={ritual.id || ritual.ritualId}
                  >
                    <RitualEdit
                      apiCall={apiCall}
                      id={ritual.ritualId || ritual.id}
                      handleDel={deleteRitual}
                      data={ritual}
                      index={index}
                    />
                  </div>

                  {index != drafts.length - 1 && (
                    <div className="my-5 border border-b"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {error && !drafts.length && (
              <div className=" P22Mackinac mb-8 flex items-center justify-center px-10 text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mx-auto flex h-fit w-full flex-col gap-5 px-4 py-10 xl:w-[70%] xl:px-0 ">
        <p className="P22Mackinac text-2xl xl:text-[1.8rem] 2xl:text-[2rem]">
          My Rituals
        </p>
        <div
          style={{
            boxShadow:
              "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
          }}
          className="mt-2 h-full w-full  rounded-[3.5rem] bg-[#fff] text-[1.5rem] "
        >
          {myRituals && (
            <div className={`h-fit w-full   py-5 pl-10`}>
              {filterData.map((ritual, index) => (
                <React.Fragment key={index}>
                  <div
                    className="my-4 flex items-center"
                    key={ritual.id || ritual.ritualId}
                  >
                    <RitualEdit
                      apiCall={apiCall}
                      id={ritual.ritualId || ritual.id}
                      handleDel={deleteRitual}
                      data={ritual}
                      index={index}
                    />
                  </div>

                  {index != filterData.length - 1 && (
                    <div className="my-5 border border-b"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {error && !myRituals.length && (
            <div className=" P22Mackinac mb-8 flex items-center justify-center px-10 text-center">
              {error}
            </div>
          )}

          {filterData.length === 0 && (
            <div className="P22Mackinac mb-8 flex items-center justify-center px-10 text-center text-2xl">
              {`No Rituals`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RitualContainer;
