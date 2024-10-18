import React, { useEffect, useState } from 'react';
import { currentDateWithFormat, errorToast, getFileType, getLocalStorageItem, successToast } from '../utils/helper';
import { Country, State, City } from 'country-state-city';
import 'react-phone-number-input/style.css';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Header from './me/header';
import { DEPARTMENT, ETHINICITY, GENDER, MARITAL_STATUS } from '../utils/constants';
import { Api } from '../api';
import { useTheme } from './context/themeContext';
import axios from 'axios';
import Loader from '../component/common/Loader';

const CompanyUserLandingPage = () => {
    const [loader, setLoader] = useState(false);
    const history = useHistory();
    const { theme } = useTheme();
    const [country, setCountry] = useState(Country.getAllCountries())
    const [state, setState] = useState([])
    const [city, setCity] = useState([])
    const [valid, setValid] = useState({ isSubmit: false })
    const [number, setNumber] = useState('');
    const [user, setUser] = useState({})
    const location = useLocation();
    let alreadyUser = location.state;
    const [showPass, setShowPass] = useState({ pass: false, rePass: false })
    const [preview, setPreview] = useState(alreadyUser?.profile);
    const [image, setImage] = useState()
    const [userData, setUserData] = useState({
        name: alreadyUser.name,
        profile: image ? getFileType(image) : null,
        email: alreadyUser.email,
        dob: alreadyUser.dob,
        gender: alreadyUser.gender,
        marital_status: '',
        dom: '',
        contact_number: '',
        employee_id: '',
        department: '',
        designation: '',
        country: '',
        state: '',
        city: '',
        ethnicity: ''
    });

    console.log(userData)


    const [companyData, setCompanyData] = useState(null);


    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        setLoader(true);
        Api.getCompanyUserProfile().then((res) => {
            if (res.data.meta.code == 1) {
                if (res.data.data) {
                    res.data.data.profileChar = res.data.data.name?.[0]; // Use the optional chaining operator here
                    if (res.data.data.user_profile?.includes('null') || !res.data.data.user_profile) { // Use the optional chaining operator here
                        if (!res.data.data.socialProfile) {
                            res.data.data.user_profile = null;
                        }
                        res.data.data.user_profile = res.data.data.socialProfile;
                    }
                }
                setLoader(false);

                setPreview(res.data.data.user_profile)
                setUserData(res.data.data);
            }
            else {
                setLoader(false);

                errorToast(res.data.meta.message);
            }
        }).catch(err => {
            setLoader(false);

            console.log(err)
        });

    }


    useEffect(() => {
        const states = State.getStatesOfCountry(userData.country)
        setState(states)
    }, [userData.country])

    useEffect(() => {
        const cities = City.getCitiesOfState(userData.country, userData.state)
        setCity(cities)
    }, [userData.state])

    useEffect(() => {
        if (userData.marital_status == '1') {
            setUserData({ ...userData, dom: '' })
        }
    }, [userData.marital_status])

    const getCodeByCountryName = (name) => {
        const data = Country.getAllCountries().filter(e => e.name.toLowerCase() == name.toLowerCase())
        return data.length > 0 ? data[0].isoCode : false
    }
    const getCodeByStateName = (name, countryCode) => {
        if (countryCode) {
            const data = State.getAllStates(countryCode).filter(e => e.name.toLowerCase() == name.toLowerCase())
            return data.length > 0 ? data[0].isoCode : false
        } else {
            return false
        }
    }

    useEffect(() => {
        if (user._id) {
            setUserData({
                ...userData,
                id: user._id,
                name: user.name ? user.name : '',
                profile: image ? getFileType(image) : null,
                dob: user.date_of_birth ? currentDateWithFormat(new Date(user.date_of_birth)) : '',
                dom: user.date_of_marriage ? currentDateWithFormat(new Date(user.date_of_marriage)) : '',
                gender: user.gender ? user.gender : '',
                marital_status: user.marital_status ? user.marital_status : '',
                contact_number: user.contact_number ? user.contact_number : '',
                employee_id: user.employee_id ? user.employee_id : '',
                email: user.email_address ? user.email_address : '',
                department: user.department ? user.department : '',
                designation: user.designation ? user.designation : '',
                country: user.country ? getCodeByCountryName(user.country) ? getCodeByCountryName(user.country) : '' : '',
                state: user.state ? getCodeByStateName(user.state, getCodeByCountryName(user.country)) ? getCodeByStateName(user.state, getCodeByCountryName(user.country)) : '' : '',
                city: user.city ? user.city : '',
                ethnicity: user.user_id.ethnicity
            })
            setNumber(user?.contact_number ? (user?.contact_number.toString()) : '')
        }
    }, []);

    const handleClick = () => {
        setLoader(true)
        const data = {
            name: userData?.name,
            marital_status: userData?.marital_status,
            date_of_marriage: userData?.dom,
            email: userData?.email,
            employee_id: userData?.employee_id,
            dob: userData?.dob,
            profile: userData?.profile,
            department: userData?.department,
            designation: userData?.designation,
            country: Country.getCountryByCode(userData?.country)?.name,
            state: State.getStateByCodeAndCountry(userData?.state, userData.country)?.name,
            city: userData?.city,
            gender: alreadyUser ? alreadyUser.gender : userData?.gender,
            ethnicity: userData?.ethnicity,
            profile: image ? getFileType(image) : userData.profile || null,
            isImageDeleted: !preview ? true : false,


        }

        Api.editCompanyUserProfile(data).then((res) => {
            if (res.status == 200) {
                if (res?.data?.meta?.uploadURL) {
                    axios.put(res?.data?.meta?.uploadURL, image, {
                        headers: {
                            'content-type': `${image?.type?.split('/')[0]}/${image?.name?.split('.')[1]}`,
                        },
                    }).then((res) => {
                        if (res.status == 200) {
                            setLoader(false);
                            successToast('Profile Updated Successfully');
                            history.goBack();
                        }
                    }).catch((err) => {
                        setLoader(false);
                        console.log(err)
                        errorToast('Something went wrong with image upload !')

                    })
                } else {
                    if (res?.data?.meta?.code == 1) {
                        setLoader(false);
                        successToast(`Profile Updated Successfully`);
                        history.goBack();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    return (
        <>
            <div className='flex justify-center'>
                <Header title={`Edit User Details`} hide={true} backUrl={`/home`} goBack={true} />
            </div>
            {loader && <Loader />}
            <div className='flex mt-[5rem] flex-col justify-center items-center'>
                <div className='w-[90vw] flex flex-col gap-10  px-8 py-8 border rounded-3xl my-10'>
                    <div className={`${!preview && `border-dashed border-[3px] border ${theme.shoorah_border_5} ${theme.shoorah_bg_2}`} relative rounded-3xl flex items-center justify-center h-[10rem] w-[14rem] cursor-pointer`}>
                        {!preview && (
                            <div onClick={() => {
                                document.getElementById('file').click()
                            }} className='h-[100%] w-[100%] flex justify-center items-center'>
                                <label className='cursor-pointer'> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className={`bi bi-plus-lg mx-auto ${theme.shoorah_text_5}`} viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                </svg></label>
                                <input type="file" id="file" className='hidden' name="image" accept="image/jpeg,image/jpg,image/png" multiple={false} data-original-title="upload photos" onChange={handleImageChange} />
                            </div>
                        )}
                        {preview && (
                            <>
                                <div className='relative h-full w-full'>
                                    <img src={preview} className='object-cover h-[100%] w-[100%] rounded-3xl' />
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

                    <div className='grid grid-cols-3 gap-8'>
                        <div className='flex-col flex'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' id='name' name='name' placeholder='Enter Your Name' defaultValue={userData.name} onChange={handleChange} className='py-3 px-8 border rounded-3xl outline-none' />
                        </div>

                        <div className='flex-col flex'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' name='email' placeholder='Enter Your Email' onChange={handleChange} defaultValue={userData.email} className='py-3 px-8 border rounded-3xl outline-none' />
                        </div>

                        <div className='flex-col flex'>
                            <label htmlFor='dob'>Date of Birth</label>
                            <input max={currentDateWithFormat(new Date())} type='date' value={userData.dob} id='dob' name='dob' onChange={handleChange} className='py-3 px-8 border rounded-3xl outline-none' min={new Date()} />
                        </div>

                        <div className='flex-col flex'>
                            <label className='' htmlFor="gender">Gender<span className='text-[#FF0000]'> *</span></label>
                            <select className='py-3 px-8 border rounded-3xl outline-none' value={userData?.gender} onChange={handleChange} id='gender' name='gender'>
                                <option value={""} disabled>Select Gender</option>
                                {GENDER.map((e) => <option key={e.value} value={e.value}>{e.name}</option>)}
                            </select>
                        </div>

                        <div className='flex-col flex'>
                            <label htmlFor='maritalStats'>Marital Status</label>
                            <select className='py-3 px-8 border rounded-3xl outline-none' value={userData?.marital_status} onChange={handleChange} id='marital_status' name='marital_status'>
                                <option value={""} disabled>Select Marital Status</option>
                                {MARITAL_STATUS.map((e) => <option key={e.value} value={e.value}>{e.name}</option>)}
                            </select>
                        </div>

                        <div className='flex-col flex'>
                            <label htmlFor='dom'>Date of Marraige</label>
                            <input max={currentDateWithFormat(new Date())} type='date' value={userData.dom} id='dom' name='dom' onChange={handleChange} className='py-3 px-8 border rounded-3xl outline-none' disabled={userData.marital_status == '1'} />
                        </div>
                        <div className='flex-col flex'>
                            <label htmlFor='employeeId'>Employee ID</label>
                            <input type='text' id='employeeId' placeholder='Enter Your Employee ID' className='py-3 px-8 border rounded-3xl outline-none' />
                        </div>

                        <div className='flex-col flex'>
                            <label htmlFor='department'>Department</label>
                            <select className='py-3 px-8 border rounded-3xl outline-none' value={userData?.department} onChange={handleChange} id='department' name='department'>
                                <option value={""} disabled>Select</option>
                                {DEPARTMENT.map((e) => <option key={e.value} value={e.value}>{e.name}</option>)}
                            </select>
                        </div>

                        <div className='flex-col flex'>
                            <label htmlFor='designation'>Designation</label>
                            <input autoComplete="off" className='py-3 px-8 border rounded-3xl outline-none' type='text' value={userData.designation} id='designation' name='designation' onChange={handleChange} placeholder="Enter Designation" />
                        </div>

                        <div className='flex-col flex'>
                            <label htmlFor='country'>Country</label>
                            <select className='py-3 px-8 border rounded-3xl outline-none' value={userData.country} onChange={handleChange} id='country' name='country'>
                                <option value={""} disabled>Select</option>
                                {country.map((e) => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                            </select>
                        </div>

                        <div className='flex-col flex'>
                            <label htmlFor='state'>State</label>
                            <select className='py-3 px-8 border rounded-3xl outline-none' value={userData?.state} onChange={handleChange} id='state' name='state'>
                                <option value={""} disabled>Select</option>
                                {state.map((e) => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                            </select>
                        </div>

                        <div className='flex-col flex'>
                            <label htmlFor='city'>City</label>
                            <select className='py-3 px-8 border rounded-3xl outline-none' value={userData?.city} onChange={handleChange} id='city' name='city'>
                                <option value={""} disabled>Select</option>
                                {city.map((e) => <option key={e.name} value={e.name.toLowerCase()}>{e.name}</option>)}
                            </select>
                        </div>

                        <div className='flex-col flex'>
                            <label htmlFor='ethinicity'>Ethinicity</label>
                            <select className='py-3 px-8 border rounded-3xl outline-none' value={userData?.ethnicity} onChange={handleChange} id='ethnicity' name='ethnicity'>
                                <option value={""} disabled>Select</option>
                                {ETHINICITY.map((e) => <option key={e.value} value={e.value}>{e.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <button onClick={handleClick} className={`border px-8 py-3 ${theme.shoorah_bg_5} rounded-3xl text-white`}>Submit</button>
                </div>
            </div >
        </>
    );
};

export default CompanyUserLandingPage;