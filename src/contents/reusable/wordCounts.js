import React from 'react';

const WordLimit = ({ words, limit }) => {

    return (
        <div>
            <div className='P22Mackinac text-[14px]'>
                {`${words} / ${limit}`}
            </div>
        </div>
    );
};

export default WordLimit;