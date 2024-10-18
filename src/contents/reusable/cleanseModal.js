import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";
import Loader from "../../component/common/Loader";
import Lottie from "lottie-react";
import cleanseLottie from "../../assets/lottie/lottie_cleanse_added_shoorah.json";

const CleanseModal = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const history = useHistory();

  const handleClose = () => {
    setOpen(!open);
    history.replace("/journal/cleanse");
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        handleClose();
      }, 4000);
    }
  }, [open]);

  return (
    <div>
      {loader && <Loader />}
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
                <Dialog.Panel className="relative  flex h-fit w-fit transform flex-col justify-around overflow-hidden  rounded-3xl bg-white px-5 py-5 text-left shadow-xl transition-all sm:my-8  ">
                  <div className="h-[15rem] w-[15rem] md:h-[25rem] md:w-[25rem]">
                    <Lottie animationData={cleanseLottie} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default CleanseModal;
