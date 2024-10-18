import React, { Fragment, useState } from 'react';
import SosModal from './sosModal';
import { Api } from '../../api';

const SOSButton = () => {

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
        Api.sosClick(1).then((res) => {
            if (res.data.meta.code == 1) {
                console.log('SOS')
            }
            else {
                console.log('SOS')
            }
        })
            .catch(err => console.log(err))
    }

    return (
        <Fragment>
            <div onClick={handleClick} className='cursor-pointer z-10 right-[1rem] bottom-[2rem] fixed flex justify-center items-center border border-transparent bg-[#F04438] hover:scale-110 text-sm sm:text-xl P22Mackinac text-white font-[1000] rounded-full w-[3rem] h-[3rem] sm:h-[4.5rem] sm:w-[4.5rem]'>
                Help
                <SosModal open={show} setOpen={setShow} message={`Call Suicide Prevention Helpline UK`} />
            </div>

        </Fragment>

    );
};

export default SOSButton;