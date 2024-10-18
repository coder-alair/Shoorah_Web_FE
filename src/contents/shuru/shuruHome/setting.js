import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useTheme } from '../../context/themeContext';
import ConfirmPopup from '../../../component/common/modals/ConfirmPopup';
import DownloadShuruReport from './downloadReport';

const Setting = ({ tab }) => {
    const { theme } = useTheme();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [downloadReport, setReport] = useState(false);
    return (
        <div
            className={`px-4 py-2 flex items-center justify-between z-10`}>

            <div className='flex'>

                <Menu as='div'>
                    <div className='flex'>
                        <Menu.Button className='w-full justify-center text-sm font-medium text-gray-700 focus:outline-none'>
                            <div className='flex'>
                                <svg width="28" height="28" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2767_36956)">
                                        <path d="M16.4752 8.49825C17.1511 8.99512 17.1511 10.0051 16.4752 10.502C15.3569 11.324 14.7879 12.7029 14.9976 14.0749C15.1247 14.9069 14.4057 15.6259 13.5737 15.4989C12.2017 15.2892 10.8228 15.8581 10.0008 16.9764C9.50388 17.6523 8.4939 17.6523 7.99703 16.9764C7.17502 15.8581 5.79609 15.2892 4.42408 15.4989C3.59209 15.6259 2.87306 14.9069 3.00017 14.0749C3.20978 12.7029 2.64093 11.324 1.52261 10.502C0.846631 10.0051 0.846631 8.99512 1.52261 8.49825C2.64093 7.67624 3.20978 6.29731 3.00017 4.9253C2.87306 4.09331 3.59209 3.37428 4.42408 3.5014C5.79609 3.71101 7.17502 3.14215 7.99703 2.02383C8.4939 1.34785 9.50388 1.34785 10.0008 2.02383C10.8228 3.14215 12.2017 3.71101 13.5737 3.5014C14.4057 3.37428 15.1247 4.09331 14.9976 4.9253C14.7879 6.29731 15.3569 7.67624 16.4752 8.49825Z" stroke={tab == 3 ? `#fff` : `${theme.strokeColor2}`} strokeWidth="1.28571" stroklinecap="round" strokeLinejoin="round" />
                                        <path d="M9.00086 12.7666C10.8049 12.7666 12.2674 11.3042 12.2674 9.50014C12.2674 7.6961 10.8049 6.23364 9.00086 6.23364C7.19684 6.23364 5.73438 7.6961 5.73438 9.50014C5.73438 11.3042 7.19684 12.7666 9.00086 12.7666Z" stroke={tab == 3 ? `#fff` : `${theme.strokeColor2}`} strokeWidth="1.28571" stroklinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2767_36956">
                                            <rect width="18" height="18" fill="white" transform="translate(0 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <Menu.Items style={{ borderRadius: '1rem 3rem 3rem 3rem' }} className='absolute shadow-lg left-[2.5rem] top-[1.5rem] pl-[2rem] z-10 w-[15rem] origin-top-right bg-white ring-1 ring-shoorah-primary ring-opacity-5 focus:outline-none'>
                            <div className='py-1'>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to='/shuru-profile'
                                            className={'text-gray-700 block w-full   flex items-center py-3 text-left text-sm'}
                                        >
                                            {/* <img src={theme.shuruProfile}  className=''/> */}
                                            <div className='w-[1.5rem] h-[1.5rem] mr-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke={theme.shoorah_4} stroklinecap="round" strokeLinejoin="round" d="M7 13.25c-2.404 0-2.904-3.27-2.904-6.25 2.268-.523 3.54-.535 5.808 0 0 2.98-.5 6.25-2.904 6.25Z"></path><path stroke={theme.shoorah_4} stroklinecap="round" strokeLinejoin="round" d="M7 4.596c1.23 0 1.923-.692 1.923-1.923C8.923 1.443 8.231.75 7 .75c-1.23 0-1.923.692-1.923 1.923 0 1.23.692 1.923 1.923 1.923Z"></path></svg>
                                            </div>
                                            <p className='P22Mackinac text-md hover:opacity-[0.7]'>
                                                My Shuru Profile
                                            </p>
                                        </Link>
                                    )}
                                </Menu.Item>

                                <Menu.Item>
                                    {() => (
                                        <button
                                            type='button'
                                            onClick={() => setReport(!downloadReport)}
                                            className={'text-gray-700 block w-full  flex items-center py-3 text-left text-sm'}
                                        >
                                            <div className='w-[1.5rem] h-[1.5rem] -rotate-90 mr-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke={theme.shoorah_4} stroklinecap="round" strokeLinejoin="round" d="M7 4.129C5.74 5.16 5.11 5.79 4.129 7 5.11 8.21 5.74 8.84 7 9.871"></path><path stroke={theme.shoorah_4} stroklinecap="round" d="M10.482 4.135a86.718 86.718 0 0 0-.063-1.54C10.374 1.678 9.6.923 8.587.85a39.976 39.976 0 0 0-5.67 0c-1.012.072-1.787.827-1.833 1.746A88.811 88.811 0 0 0 .977 7c0 1.511.037 2.985.107 4.404.046.92.82 1.674 1.833 1.746a39.962 39.962 0 0 0 5.67 0c1.012-.072 1.787-.827 1.832-1.746.026-.506.046-1.02.063-1.539"></path><path stroke={theme.shoorah_4} stroklinecap="round" strokeLinejoin="round" d="M13.023 7 4.161 7"></path></svg>
                                            </div>
                                            <p className='P22Mackinac text-md hover:opacity-[0.7]'>
                                                Download Report
                                            </p>
                                        </button>

                                    )}


                                </Menu.Item>

                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type='button'
                                            onClick={() => setShow(!show)}
                                            className={'text-gray-700 block w-full  flex items-center py-3 text-left text-sm'}
                                        >
                                            <div className='w-[1.5rem] h-[1.5rem] mr-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke={theme.shoorah_4} stroklinecap="round" strokeLinejoin="round" d="M7 4.129C5.74 5.16 5.11 5.79 4.129 7 5.11 8.21 5.74 8.84 7 9.871"></path><path stroke={theme.shoorah_4} stroklinecap="round" d="M10.482 4.135a86.718 86.718 0 0 0-.063-1.54C10.374 1.678 9.6.923 8.587.85a39.976 39.976 0 0 0-5.67 0c-1.012.072-1.787.827-1.833 1.746A88.811 88.811 0 0 0 .977 7c0 1.511.037 2.985.107 4.404.046.92.82 1.674 1.833 1.746a39.962 39.962 0 0 0 5.67 0c1.012-.072 1.787-.827 1.832-1.746.026-.506.046-1.02.063-1.539"></path><path stroke={theme.shoorah_4} stroklinecap="round" strokeLinejoin="round" d="M13.023 7 4.161 7"></path></svg>
                                            </div>
                                            <p className='P22Mackinac text-md hover:opacity-[0.7]'>
                                                Leave Shuru
                                            </p>
                                        </button>

                                    )}


                                </Menu.Item>

                              

                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <ConfirmPopup
                open={show}
                setOpen={setShow}
                message={'Are you sure you want to leave shuru ?'}
                setAccepted={() => history.push('/home')}
                handleNo={() => {
                    setShow(false);
                }}
            />

            <DownloadShuruReport open={downloadReport} setOpen={setReport} />
        </div>
    );
};

export default Setting;