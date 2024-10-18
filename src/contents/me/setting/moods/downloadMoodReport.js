import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../context/themeContext';
import { Dialog, Transition } from '@headlessui/react';
import { errorToast, getJWTToken } from '../../../../utils/helper';
import Loader from '../../../../component/common/Loader';
import axios from 'axios';

const DownloadMoodReport = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null);
    const [loader, setLoader] = useState(false);
    const { theme } = useTheme();
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [period, setPeriod] = useState(1);
    const today = new Date().toISOString().split('T')[0];
    const [emotion, setEmotion] = useState(1);


    const handleClose = () => {
        setOpen(!open)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);
        let payload = {
            reportType: period,
            reportFromDate: from,
            reportToDate: to
        };
        let { reportFromDate, reportToDate, reportType } = payload;
        if (reportType == 3) {
            if (reportFromDate == null || reportFromDate == '') {
                errorToast(`From Date is Needed`);
                setLoader(false);
                return;
            }
            if (reportToDate == null || reportToDate == '') {
                errorToast(`To Date is Needed`);
                setLoader(false);

                return;
            }
        }
        if (reportType < 3) {
            reportToDate = null;
            reportFromDate = null;
        }

        if (emotion == 1) {
            const url = `${process.env.REACT_APP_API_BASE_URL}/mood-report?${reportType !== 3 ? `reportType=${reportType}` : `reportType=${reportType}&reportFromDate=${reportFromDate}&reportToDate=${reportToDate}`}`;
            axios.get(url, {
                headers: {
                    deviceType: 3,
                    Authorization: getJWTToken(),
                },
                responseType: 'blob',
            })
                .then((response) => {
                    const blob = new Blob([response.data], { type: 'application/pdf' });
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `moods-report.pdf`; // Specify the filename
                    a.click();

                    window.URL.revokeObjectURL(url);
                })
                .then(() => {
                    setLoader(false);
                })
                .catch((error) => {
                    setLoader(false);
                    errorToast("No mood data found.")
                });
        }

        if (emotion == 2) {
            const url = `${process.env.REACT_APP_API_BASE_URL}/professional-mood-report?${reportType !== 3 ? `reportType=${reportType}` : `reportType=${reportType}&reportFromDate=${reportFromDate}&reportToDate=${reportToDate}`}`;
            axios.get(url, {
                headers: {
                    deviceType: 3,
                    Authorization: getJWTToken(),
                },
                responseType: 'blob',
            })
                .then((response) => {
                    const blob = new Blob([response.data], { type: 'application/pdf' });
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `professiona-mood-report.pdf`; // Specify the filename
                    a.click();

                    window.URL.revokeObjectURL(url);
                })
                .then(() => {
                    setLoader(false);
                })
                .catch((error) => {
                    setLoader(false);
                    console.error('Error downloading PDF', error);
                    // Optionally, you can log the response for debugging:
                    console.log('Response data:', error.response.data);
                });
        }

    }

    useEffect(() => {
        if (from || to) {
            setPeriod(3);
            document.getElementById('30').checked = false;
            document.getElementById('60').checked = false;
        }
    }, [from, to])

    return (
        <div>
            {loader && <Loader />}
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
                                <Dialog.Panel className='relative  w-[35rem] flex flex-col justify-around px-5 py-5 h-fit  transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8  '>
                                    <p className='relative text-center P22Mackinac mb-3 text-md md:text-xl'>Download All Moods Report
                                        <span onClick={handleClose} className=' cursor-pointer absolute right-[0.5rem]'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                            </svg>
                                        </span>
                                    </p>
                                    <hr className='w-[98%] py-3' />
                                    <form onSubmit={handleSubmit}>
                                        <div className='mb-8 flex items-center justify-center gap-x-[1rem]'>
                                            <input type='radio' onChange={(e) => { setEmotion(3) }} name='mood' value='3' id='overall' /><label htmlFor='overall' className='sm:text-xl text-md outline-none P22Mackinac'>All</label>
                                            <input type='radio' onChange={(e) => { setEmotion(1) }} defaultChecked={true} name='mood' value='1' id='moods' className='P22Mackinac outline-none' /><label htmlFor='moods' className='sm:text-xl text-md P22Mackinac'>Personal moods</label>
                                            <input type='radio' onChange={(e) => { setEmotion(2) }} name='mood' value='2' id='professional-moods' /><label htmlFor='professional-moods' className='sm:text-xl text-md outline-none P22Mackinac'>Professional Moods</label>
                                        </div>
                                        <p className='mb-2 P22Mackinac tracking-wide'>For which period do you need a statement?</p>
                                        <div className='flex gap-3'>
                                            <input type='radio' defaultChecked onChange={(e) => { setPeriod(e.target.value); setTo(null); setFrom(null) }} name='period' value='1' id='30' className='P22Mackinac outline-none' /><label htmlFor='30' className='P22Mackinac sm:text-xl text-md'>Last 30 days</label>
                                            <input type='radio' onChange={(e) => { setPeriod(e.target.value); setTo(null); setFrom(null) }} name='period' value='2' id='60' /><label htmlFor='60' className='outline-none P22Mackinac sm:text-xl text-md'>Last 60 days</label>
                                        </div>
                                        <p className='my-5 sm:my-3 P22Mackinac'>OR Select a custom date of your choice</p>

                                        <div className='flex flex-col gap-3'>
                                            <label htmlFor='from' className='P22Mackinac'>From Date</label>
                                            <input id='from' type='date'
                                                max={today}
                                                onChange={(e) => {
                                                    setFrom(e.target.value);
                                                    setPeriod(null)
                                                }} className='border outline-none rounded-3xl w-full py-3 px-8' />

                                            <label htmlFor='to' className='P22Mackinac'>To Date</label>
                                            <input id='to' type='date'
                                                max={today}
                                                onChange={(e) => {
                                                    setTo(e.target.value);
                                                    setPeriod(null)
                                                }} className='border outline-none rounded-3xl w-full py-3 px-8' />

                                        </div>

                                        <button className={`w-full mt-[2rem] self-end outline-none  rounded-[3rem] py-3 P22Mackinac text-xl text-white ${theme.shoorah_bg_4}`}>Download</button>
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </div>
    );
};

export default DownloadMoodReport;