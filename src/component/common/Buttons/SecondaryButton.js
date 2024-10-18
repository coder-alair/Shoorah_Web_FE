import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function SecondaryButton({ btnText, btnType }) {
  const history = useHistory();
  return (
    <>
      <button
        type={btnType}
        className='rounded-3xl border border-shoorah-primary bg-gradient-to-r py-2 sm:py-3 px-10 text-sm font-medium shadow-sm focus:outline-none mr-5 text-shoorah-primary '
        onClick={() => history.goBack()}
      >
        {btnText}
      </button>
    </>
  );
}

SecondaryButton.propTypes = {
  btnType: PropTypes.string,
  btnText: PropTypes.string,
};
