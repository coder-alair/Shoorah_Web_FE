import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef, useState } from 'react';
import CommonInput from '../../../component/common/Input/CommonInput';
import changePassValidations from '../../../validation/changePassValidations';
import { Api } from '../../../api';
import { errorToast, successToast, useOutsideClick } from '../../../utils/helper';
import Loader from '../../../component/common/Loader';
import { useTheme } from '../../context/themeContext';

const ChangePasswordModal = ({ open, setOpen, user }) => {
    const cancelButtonRef = useRef(null);
    const [error, setError] = useState({});
    const [loader, setLoader] = useState(false);
    const { theme } = useTheme();

    const [form, setForm] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setError((prevState) => ({
            ...prevState,
            [e.target.name]: '',
        }));

        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { isValid, errors } = changePassValidations(form);
        if (isValid) {
            setLoader(true);
            const payload = {
                oldPassword: form.password,
                newPassword: form.newPassword,
                confirmPassword: form.confirmPassword,
            };
            const response = await Api.changePassword(payload);
            if (response?.data?.meta?.code === 1) {
                setForm({
                    password: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setLoader(false);
                successToast(response?.data?.meta?.message);
                setOpen(false);
            } else if (response?.data?.meta?.code === 0) {
                setLoader(false);
                errorToast(response?.data?.meta?.message);
            }
        }
        setError(errors);
        setLoader(false);
    };

    useOutsideClick(cancelButtonRef, () => {
        setError({})
    });


    return (
        <div>
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
                                <Dialog.Panel ref={cancelButtonRef} className='relative w-[50vw] px-5 py-3 h-[30rem] transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8  '>

                                    <div onClick={()=>setOpen(false)} className='absolute top-[1rem] right-[1rem] hover:scale-105'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                        </svg>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        {loader && <Loader />}
                                        <div className='flex mt-[3rem] flex-col gap-3 items-center justify-between'>
                                            <div className='w-full'>
                                                <CommonInput
                                                    id='password'
                                                    name='password'
                                                    type='password'
                                                    value={form.password}
                                                    onChange={handleChange}
                                                    label='Enter old password'
                                                    error={error.password}
                                                    className={`px-4 px-5 py-3  sm:px-5 sm:py-5 w-full rounded-[3rem] outline-none border sm:px-5 P22Mackinac placeholder:font-[600] placeholder:P22Mackinac block w-[100%] my-3 appearance-none border border-gray-300 placeholder-[#000] sm:text-lg`}
                                                    placeholder='Enter Current Password'
                                                    isRequired
                                                    isIcon
                                                />
                                            </div>
                                            <div className='w-full'>
                                                <CommonInput
                                                    id='newPassword'
                                                    name='newPassword'
                                                    type='password'
                                                    value={form.newPassword}
                                                    onChange={handleChange}
                                                    label='Enter new password'
                                                    error={error.newPassword}
                                                    classNames='px-4 px-5 py-3 w-full rounded-[3rem] outline-none border py-2 sm:px-5 sm:py-3'
                                                    placeholder='Enter New Password'
                                                    isRequired
                                                    isIcon
                                                />
                                            </div>


                                            <div className='w-full'>
                                                <CommonInput
                                                    id='confirmPassword'
                                                    name='confirmPassword'
                                                    type='password'
                                                    value={form.confirmPassword}
                                                    onChange={handleChange}
                                                    label='Confirm new password'
                                                    error={error.confirmPassword}
                                                    classNames='px-4 px-5 py-3 w-full rounded-[3rem] outline-none border py-2 sm:px-5 sm:py-3'
                                                    placeholder='Confirm New Password'
                                                    isRequired
                                                    isIcon
                                                />
                                            </div>

                                            <button type='submit' className={`self-center mt-5 border P22Mackinac border-transparent ${theme.shoorah_bg_5} rounded-[3rem] px-12 py-2 px-[5rem] text-lg font-medium text-white shadow-sm ${theme.shoorah_bg_hover_5} focus:outline-none focus:ring-2 ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}>
                                                Confirm Password
                                            </button>
                                        </div>
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

export default ChangePasswordModal;