import React from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import shoorahShape2 from '../../assets/images/shoorahShape2.png';
import SoundCard from '../reusable/soundCard';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ReusableCarsouel from '../reusable/carsouel';


const Carsouel = ({ data }) => {

    const settings = {
        infinite: false,
        speed: 500,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1324,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,

                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                }
            },
            {
                breakpoint: 810,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 610,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    };

    return (
        <div className='w-[90%] 2xl:w-[90%] relative'>
            <ReusableCarsouel data={data} />
        </div>
    );
};

export default Carsouel;