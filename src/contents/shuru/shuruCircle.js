import React, { useState } from 'react';
import '../../assets/css/circleCarsouel.css';
import { useTheme } from '../context/themeContext';

const ShuruCircle = () => {
    const { theme } = useTheme();
    const [state, setState] = useState({
        carouselDeg: 17,
        itemDeg: -17,
        centerItem: 0,
        prevItem: 8,
        lastItem: 8,
        nextItem: 1,
        carousel: [
            { shuru: theme.shuruAngry, id: 1, position: 1 },
            { shuru: theme.shuruAnxious, id: 2, position: 2 },
            { shuru: theme.shuruContent, id: 3, position: 3 },
            { shuru: theme.shuruExcited, id: 4, position: 4 },
            { shuru: theme.shuruStressed, id: 5, position: 5 },
            { shuru: theme.shuruHappy, id: 6, position: 6 },
            { shuru: theme.shuruSad, id: 7, position: 7 },
            { shuru: theme.shuruSurprised, id: 8, position: 8 },
            { shuru: theme.shuruTired, id: 9, position: 9 },
        ]
    });

    const getCssClass = id => {
        const { centerItem, nextItem, prevItem } = state;

        if (id === centerItem) {
            return "active";
        } else if (id === nextItem) {
            return "next";
        } else if (id === prevItem) {
            return "prev";
        }
    };



    return (
        <div className="w-[80%] h-[100%]">
            {/* <button onClick={next}>Next</button>
            <button onClick={prev}>Prev</button> */}
            <div
                className="circleCarsouel"
                style={{ transform: `rotate(${state.carouselDeg}deg)` }}
            >
                {state.carousel.map((item, index) => (
                    <div
                        className={`item-circleCarsouel ${theme.shoorah_bg_2} ${getCssClass(index)}`}
                        key={item.id}
                        id={item.id}
                        style={{ transform: `rotate(${state.itemDeg}deg)` }}
                    >

                        <img src={item.shuru} className='w-[3rem] h-[3rem]' />
                    </div>
                ))}
            </div>
        </div>
    );

};

export default ShuruCircle;