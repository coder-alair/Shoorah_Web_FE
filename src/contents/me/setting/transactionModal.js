import React, { useState, useEffect, Fragment, useRef } from "react";
import shoorahLogo from '../../../assets/images/shoorah_logo.png';
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "../../context/themeContext";
import { successToast } from "../../../utils/helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function TransactionModal({ open, setOpen, plan, transaction }) {

    const { theme } = useTheme();
    const cancelButtonRef = useRef();
    const history = useHistory();
    const [success, setSuccess] = useState(transaction?.code ? false : true);

    useEffect(()=>{
        setSuccess(transaction?.code?.length>0 ? false : true);
    },[transaction])

    console.log({ transaction })

    return (

        <Transition.Root appear show={open} as={Fragment}>
            <Dialog as='div' className='relative z-20' initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-20 overflow-y-auto'>
                    <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-[35rem] sm:h-[20rem] px-2'>
                                <div className='bg-white px-4 pt-5 pb-4 sm:p-3 sm:pb-4'>
                                    <div className='sm:flex sm:items-start'>

                                        <div className='mt-3 w-full text-center sm:mt-0 sm:text-left'>

                                            <div className='relative flex flex-col justify-evenly items-center'>
                                              

                                                <div className='w-full  text-center text-lg tracking-wide P22Mackinac'>

                                                    <div className="w-full flex flex-col justify-center mx-auto items-center rounded-3xl h-[20rem]">
                                                    

                                                        <div className={`flex items-center justify-center ${theme.shoorah_bg_6} h-[6rem] w-[6rem] rounded-[2.6rem] px-3 py-2`}>
                                                        <svg width="30" height="30" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0.795365 11.3882L6.38386 17.4533C6.38386 17.4533 9.96556 6.85147 17.0165 1.5438" stroke={`#fff`} stroke-width="1.5" stroke-linejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <div className="w-full flex gap-2 justify-center mt-[1rem] px-3 py-2"><p className="text-center P22Mackinac text-3xl">Your Order Success!</p></div>
                                                        <div onClick={()=>history.push('/home')} className="w-full flex gap-2 cursor-pointer justify-center text-gray-400 px-3 py-2">Click here to return to home page</div>

                                                       


                                                    </div>



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
}