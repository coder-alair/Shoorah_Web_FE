import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const BadgeModal = ({ open, setOpen, title, description }) => {
    const cancelButtonRef = useRef(null);

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

                <div className='fixed top-[30%] inset-0 z-20 overflow-y-auto'>
                    <div className='flex min-h-full items-start sm:items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                                <div className='bg-white px-4 pt-2 sm:pt-5 pb-4 sm:p-3 sm:pb-4'>
                                    <div className='sm:flex sm:items-start'>

                                        <div className='mt-1 w-full text-center sm:mt-0 sm:ml-4 sm:text-left'>

                                            <div className='relative flex flex-col justify-evenly items-center'>
                                                <div className='items-center relative w-full'>
                                                    <p className='text-center my-2 P22Mackinac font-[500] text-xl md:text-3xl cursor-default'>{title}</p>
                                                    <div onClick={() => setOpen(false)} className='cursor-pointer absolute top-[0.5rem] right-[1rem] hover:scale-105'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                        </svg>
                                                    </div>
                                                    <hr className='w-full' />
                                                </div>

                                                <div className='my-5 text-center text-sm md:text-lg tracking-wide P22Mackinac'>
                                                    {description}
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

export default BadgeModal;
