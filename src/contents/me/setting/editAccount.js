import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef, useState } from 'react';
import { errorToast, getFileType, successToast } from '../../../utils/helper';
import { Api } from '../../../api';
import { useTheme } from '../../context/themeContext';
import axios from 'axios';

const EditAccount = ({ open, setOpen, user ,handleRefresh}) => {
    const cancelButtonRef = useRef(null);
    const [loader, setLoader] = useState(false);
    const [preview, setPreview] = useState(user.profile);
    const [image, setImage] = useState(null);
    const { theme } = useTheme();

    const handleImageChange = (event) => {
        if (!event?.target?.files[0].name.match(/\.(jpg|jpeg|png)$/i)) {
            errorToast(`The specified file ${event?.target?.files[0].name} could not be uploaded. Please upload JPG, JPEG, PNG image.`,);
        } else if (event?.target?.files[0]?.size > 25500000) {
            errorToast(`File size should be less than 1MB`);
        } else {
            const file = event.target.files[0];
            if (file) {
                setImage(file);
                const objectUrl = URL.createObjectURL(event.target.files[0]);
                setPreview(objectUrl);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let form = {
            name: document.getElementById('name').value,
            profile: image ? getFileType(image) : null,
            dob: document.getElementById('dob').value,
            gender: [document.getElementById('gender').value],
            isImageDeleted: !preview ? true : false
        }
        setLoader(true);

        Api.updateUserProfile(form).then((res) => {
            if (res.status == 200) {
                handleRefresh();
                if (res?.data?.meta?.uploadURL) {
                    axios.put(res?.data?.meta?.uploadURL, image, {
                        headers: {
                            'content-type': `${image?.type?.split('/')[0]}/${image?.name?.split('.')[1]}`,
                        },
                    }).then((res) => {
                        if (res.status == 200) {
                            setLoader(false);
                            successToast('Profile Updated Successfully');
                            setOpen(false);
                            handleRefresh();
                        }
                    }).catch((err) => {
                        setLoader(false);
                        console.log(err)
                        errorToast('Something went wrong with image upload !')

                    })
                } else {
                    if (res?.data?.meta?.code == 1) {
                        setLoader(false);
                        successToast(res?.data?.meta?.message);
                        setOpen(false);
                    }
                    else {
                        errorToast(res?.data?.meta?.message)
                    }
                }
            }
        }).catch(error => {
            console.log(error);
            setLoader(false);
        })

    }

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
                            <Dialog.Panel className='relative w-[80vw] px-5 py-3 h-[35rem] transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8  '>

                                <form onSubmit={handleSubmit}>
                                    <div className='flex flex-col gap-5 justify-center'>
                                        <div className={`${!preview && `border-dashed border-[3px] border ${theme.previewBorder} ${theme.previewImg}`} relative rounded-3xl flex items-center justify-center h-[10rem] w-[14rem] cursor-pointer`}>
                                            {!preview && (
                                                <div onClick={() => {
                                                    document.getElementById('file').click()
                                                }} className='h-[100%] w-[100%] flex justify-center items-center'>
                                                    <label className='cursor-pointer'> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className={`bi bi-plus-lg mx-auto ${theme.previewIcon}`} viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                                    </svg></label>
                                                    <input type="file" id="file" className='hidden' name="image" accept="image/jpeg,image/jpg,image/png" multiple={false} data-original-title="upload photos" onChange={handleImageChange} />
                                                </div>
                                            )}
                                            {preview && (
                                                <>
                                                    <div className='relative h-full w-full'>
                                                        <img src={preview} className='h-[100%] w-[100%] rounded-3xl' />
                                                        <div onClick={() => {
                                                            setImage(null);
                                                            setPreview(null);
                                                        }
                                                        } className={`absolute top-0 right-[-0.5rem] ${theme.textMsg}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                                            </svg>
                                                        </div>

                                                    </div>

                                                </>

                                            )}
                                        </div>
                                        <div>
                                            <input placeholder='Enter Name' defaultValue={user?.name} id='name' type='text' className='px-5 py-3 w-full rounded-3xl outline-none border' />
                                        </div>
                                        <div>
                                            <input disabled placeholder='Enter Email' defaultValue={user?.email} id='email' type='email' className='px-5 bg-[lightgray] py-3 w-full rounded-3xl outline-none border' />

                                        </div>
                                        <div>
                                            <input placeholder='Date' defaultValue={user?.dob} type='date' id='dob' className='px-5 py-3 w-full rounded-3xl outline-none border' />
                                        </div>
                                        <div>
                                            <select id="gender" defaultValue={user?.gender} name="gender" className='px-5 py-3 w-full rounded-3xl outline-none border'>
                                                <option value={0}>Prefer Not to say</option>
                                                <option value={1}>Male</option>
                                                <option value={2}>Female</option>
                                                <option value={3}>Transgender</option>
                                            </select>
                                        </div>
                                        <button type='submit' className={`border px-8 py-3 P22Mackinac border-transparent ${theme.primarytosecondary} rounded-3xl px-12 py-2  text-md font-medium text-white shadow-sm ${theme.bgPrimaryHover} focus:outline-none focus:ring-2 ${theme.borderRingFocus} focus:ring-offset-2`}>Update</button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default EditAccount;