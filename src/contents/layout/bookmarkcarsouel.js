import React from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import defaultImage from '../../assets/images/emptyData.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SoundCard from '../reusable/soundCard';
import ReusableCarsouel from '../reusable/carsouel';
import NewCarousel from '../reusable/newCarsouel';
import TrendCarsoeul from '../reusable/trendingCarsouel';




const BookmarkCarsouel = ({ data }) => {
    const history = useHistory();

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1324,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 810,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
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
        <div className='w-[100%] 2xl:w-[100%] relative'>
            <TrendCarsoeul data={data} />

        </div>
    );
};

export default BookmarkCarsouel;