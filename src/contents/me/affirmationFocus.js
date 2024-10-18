import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Api } from "../../api";
import { errorToast, successToast, useOutsideClick } from "../../utils/helper";
import { useTheme } from "../context/themeContext";
import Loader from "../../component/common/Loader";

const AffirFocusModal = ({
  open,
  setOpen,
  focusData,
  myAffirmationFocus: userFocus,
  refresh,
  setRefresh,
}) => {
  const cancelButtonRef = useRef(null);
  const focus = focusData || [];
  const [loader, setLoader] = useState(false);
  const [myAffirmationFocus, setAffirmationMyfocus] = useState([]);
  const { theme } = useTheme();

  let prevFocus = [];
  userFocus.forEach((i) => {
    prevFocus.push(i.focusId);
  });

  const handleClick = (i) => {
    if (myAffirmationFocus.includes(i.focusId)) {
      let newArray = myAffirmationFocus.filter((item) => item != i.focusId);
      setAffirmationMyfocus(newArray);
    } else {
      setAffirmationMyfocus([...myAffirmationFocus, i.focusId]);
    }
  };

  const handleSave = () => {
    setLoader(true);
    let payload = {
      affirmationFocusIds: myAffirmationFocus,
      focusType: 2,
    };
    Api.addEditFocus(payload).then((res) => {
      if (res.data.meta.code == 1) {
        successToast(res.data.meta.message);
        setOpen(false);
        setRefresh(refresh + 1);
        setAffirmationMyfocus([]);
        setLoader(false);
      } else {
        errorToast(res.data.meta.message);
        setLoader(false);
      }
    });
  };

  useEffect(() => {
    let foc = [];
    focus.forEach((e) => {
      if (e.isSaved) {
        foc.push(e.focusId);
      }
    });
    setAffirmationMyfocus(foc);
  }, [focus]);

  useOutsideClick(cancelButtonRef, () => {
    setAffirmationMyfocus(prevFocus);
  });

  return (
    <Transition.Root appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                ref={cancelButtonRef}
                className="relative  h-[85vh] w-full transform overflow-hidden rounded-3xl bg-white px-4 text-left shadow-xl transition-all sm:my-8 lg:h-auto lg:px-0 xl:w-[80vw] xl:px-5  "
              >
                <div className="h-full lg:h-auto">
                  {loader && <Loader />}
                  <div className="relative flex h-full flex-col rounded-3xl py-2 lg:h-fit xl:px-5 ">
                    <div className="relative flex justify-between py-3 xl:px-5">
                      <p className="P22Mackinac cursor-default text-lg lg:text-xl xl:text-2xl">
                        Select Your Affirmation Focuses
                      </p>
                      <p
                        onClick={() => {
                          setOpen(false);
                          setAffirmationMyfocus(prevFocus);
                        }}
                        className=" absolute right-0 top-2 cursor-pointer text-base lg:text-2xl xl:right-[1rem] xl:top-[1rem] xl:text-3xl"
                      >
                        X
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 overflow-y-auto py-3 lg:gap-5 xl:mt-0 xl:justify-start xl:px-8">
                      {focus.map((i) => (
                        <p
                          onClick={() => handleClick(i)}
                          key={i.focusId}
                          className={` lg:text-md P22Mackinac relative h-fit w-fit cursor-pointer p-3 text-base ${
                            myAffirmationFocus.includes(i.focusId) &&
                            `${theme.shoorah_focus_gradient} ${theme.shoorah_text_5}`
                          } border-slate-1000 rounded-3xl border`}
                        >
                          {i.focusName}
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between px-5 py-3 xl:mt-[3rem]">
                      <button
                        onClick={handleSave}
                        className={`P22Mackinac ${theme.shoorah_bg_4} mx-auto w-full rounded-[3rem] border px-8 py-2 text-base text-white lg:py-4 lg:text-xl xl:text-2xl`}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AffirFocusModal;
