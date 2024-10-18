import React, { useState } from 'react';
import { useTheme } from '../context/themeContext';
import lockSvg from '../../assets/svg/lock.svg';
import unlockSvg from '../../assets/images/Unlock.svg';
import { useAudio } from '../context/audiobar';
import BadgeModal from './badgeModal';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';



const DetailsSection = ({ badgeInfoData, badgeInfo }) => {
    const { theme } = useTheme();
    const [show, setShow] = useState(false);
    const { audioNav } = useAudio();
    const [infoPopup, setInfoPopup] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const badge = searchParams.get("badge");

    let info = badgeInfo && Object.entries(badgeInfo);


    return (
        <div className={`w-full  relative ${audioNav && `mb-[10rem]`} mb-[1rem] md:mb-[5rem] mt-[3rem] gap-[1.5rem] md:gap-[3rem] flex flex-col`}>

            {badgeInfoData && Object.keys(badgeInfoData).map((key) => (
                <div key={key} className='w-[90%] bg-white py-[1rem] sm:py-[2rem] px-[0.7rem] sm:px-[1.5rem] mx-auto border flex flex-col gap-3 sm:gap-5 rounded-3xl'>

                    <div className=' flex gap-3 text-sm sm:text-xl'>
                        <p className='P22Mackinac text-lg sm:text-xl'>{key}</p>
                        <span onClick={() => { setShow(true); setInfoPopup(key) }} className='cursor-pointer'>
                            <div className='md:w-[1.8rem] h-[1.4rem] w-[1.4rem]  cursor-pointer md:h-[1.8rem] hover:scale-110'><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="10" transform="matrix(-1 0 0 1 22 2)" fill={theme.shoorah_2} stroke={theme.shoorah_7} strokeWidth="1.5" />
                                <path d="M12 12L12 18" stroke={theme.shoorah_7} strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M12 7L12 6" stroke={theme.shoorah_7} strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            </div>
                        </span></div>

                    {badgeInfoData[key].map((item, index) =>
                        <div key={index} className={`flex justify-between py-4 md:py-8 md:px-3 px-5 border rounded-3xl items-center ${item.isUnlocked ? `border-[#12B76A] bg-[#fff]` : `border-gray-300 bg-gray-100`}`}>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm sm:text-lg P22Mackinac'>{item.title}</p>
                                {index != 1 && badge != 1 ?
                                    <p className='text-sm sm:text-lg P22Mackinac text-gray-500'>{item.description} {item.counts > item.limit ? '(' + item.limit + '/' + item.limit + ')' : '(' + item.counts + '/' + item.limit + ')'}</p>
                                    :
                                    <p className='text-sm sm:text-lg P22Mackinac text-gray-500'>{item.description} {item.counts > item.limit ? '(' + item.limit + '/' + item.limit + ')' : '(' + item.counts + '/' + item.limit + ')'}</p>
                                }
                            </div>
                            <div className='md:w-[2rem] md:h-[2rem] w-[1.5rem] h-[1.5rem] mr-[1rem]'>
                                <img src={item.isUnlocked ? unlockSvg : lockSvg} className='w-full h-full rounded-3xl' />
                            </div>
                        </div>
                    )}



                </div>

            ))}

            {!badgeInfoData &&
                <div className='flex mt-[3rem] md:mt-[8rem] w-full md:w-[40rem]  P22Mackinac mx-auto text-center text-lg md:text-3xl items-center justify-center w-full h-full'>
                    Please explore more about the web and earn 3 or more diamond badges to become a proud Shoorah Guru User.
                </div>

            }


            <BadgeModal open={show} setOpen={setShow} title={infoPopup} description={info && badgeInfo[infoPopup]} />


        </div>
    );
};

export default DetailsSection;