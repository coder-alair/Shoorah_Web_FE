import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { useTheme } from "../../../contents/context/themeContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../../../contents/context/user";

const DisclaimerPopUp = ({ open, setOpen, message }) => {
  const cancelButtonRef = useRef(null);
  const { theme } = useTheme();
  const history = useHistory();
  const { setDisclaimerAgreed } = useAuth();

  const handleNo = () => {
    history.push("/home");
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 py-4">
                  <div className="sm:flex sm:items-start">
                    {/* <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${theme.shoorah_bg_2} sm:mx-0 sm:h-10 sm:w-10`}>
                      <QuestionMarkCircleIcon
                        className={`h-6 w-6 ${theme.shoorah_text_4}`}
                        aria-hidden='true'
                      />
                    </div> */}
                    <div className="text-center lg:mt-3 ">
                      {/* <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                        Confirm
                      </Dialog.Title> */}
                      <div className="mb-2 w-full">
                        <p className=" w-full text-left text-xl text-gray-700 lg:text-center lg:text-4xl">
                          {message}
                        </p>
                      </div>

                      <div className="flex h-[35vh] flex-col gap-y-2 overflow-y-auto text-left text-xs text-gray-700 lg:h-auto lg:text-base">
                        <div>
                          Shuru is a chatbot based on OpenAI and designed
                          through the use of large data programs built by
                          independent professionals. The information provided by
                          Shuru is supplied by a natural person and Shuru cannot
                          express human emotions. Shuru’s intended use is to
                          provide evidence and research based tools and
                          techniques to assist with managing natural emotions
                          and encouraging mental well-being in a positive
                          self-help context. Shuru is not intended for providing
                          diagnosis, treatments, or cures for any health
                          conditions whatsoever. Shuru does not offer medical,
                          legal or financial advice nor does it hold itself out
                          to be qualified to provide the same. Shuru will only
                          ever provide guidance or support and shall never be
                          held responsible for the actions or decisions of its
                          users.
                        </div>
                        <div>
                          Shuru is not designed to assist with crises such as
                          abuse, trauma or mental health conditions that may
                          cause feelings of suicide, harm to self or any other
                          medical emergencies. In any of these cases users
                          should immediately seek the appropriate professional
                          help or speak with their GP.
                        </div>

                        <p className=" text-xs lg:text-sm">
                          User data is not shared and is used for analytics
                          purposes only and to continually improve the Shuru
                          tool. Communications between users and Shuru are
                          completely anonymous.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-3xl border border-transparent font-semibold ${theme.shoorah_bg_5} px-6 py-2 text-base  text-white shadow-sm ${theme.shoorah_bg_hover_6} focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
                    onClick={(e) => {
                      setOpen(false);
                      setDisclaimerAgreed(true);
                    }}
                  >
                    Agree and Continue
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl border border-gray-300 bg-white px-6 py-2 text-base font-semibold  text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => {
                      handleNo();
                    }}
                    ref={cancelButtonRef}
                  >
                    Go Back
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

DisclaimerPopUp.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleNo: PropTypes.func,
  message: PropTypes.string,
};

export default DisclaimerPopUp;
