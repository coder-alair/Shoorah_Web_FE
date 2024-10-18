import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import { Api } from "../../api";
import { EMERGENCY_NUMBER } from "../../utils/constants";
import Lottie from "lottie-react";
import callLottie from "../../assets/lottie/lottie_call.json";
import linkImg from "../../assets/images/linked.svg";

const SosModal = ({ open, setOpen, message }) => {
  const cancelButtonRef = useRef(null);

  const handleClick = () => {
    setOpen(!open);
    Api.sosClick(2)
      .then((res) => {
        if (res.data.meta.code == 1) {
          console.log("SOS_CALL");
        } else {
          console.log("SOS_CALL");
        }
      })
      .catch((err) => console.log(err));
  };

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
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-2 md:pt-5 sm:p-3 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="md:mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="relative flex flex-col items-center justify-evenly">
                        <div className="w-full items-center">
                          <p className="P22Mackinac my-2 cursor-default text-center text-2xl font-[500]">
                            Emergency
                          </p>
                          <hr className="w-full" />
                        </div>
                        <div
                          onClick={() => setOpen(!open)}
                          className="absolute right-[0.5rem] top-[0.5rem] cursor-pointer text-xl outline-none hover:scale-110"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-x-lg"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                          </svg>
                        </div>
                        <a
                          onClick={handleClick}
                          target="_blank"
                          href={`https://www.samaritans.org`}
                          className="text-md my-[2rem] flex cursor-pointer items-center justify-center rounded-full text-white outline-none  "
                        >
                          <div className="h-[5rem] w-[5rem]">
                            {/* <Lottie animationData={callLottie} /> */}
                            <img
                              className="w-16 animate-pulse"
                              src={linkImg}
                              alt="link"
                            />
                          </div>
                        </a>
                        <div className="P22Mackinac mb-4 text-xl font-[500] tracking-wide">
                          Suicide Prevention Help
                        </div>
                      </div>
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

SosModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  message: PropTypes.string,
};

export default SosModal;
