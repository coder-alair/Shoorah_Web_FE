import PropTypes from 'prop-types';
import React from 'react';

export default function PrimaryButton({ btnText, btnType, disabled }) {
  return (
    <>
      <button
        type={btnType}
        disabled={disabled}
        className={`${
          disabled
            ? 'bg-gray-300'
            : 'border border-transparent bg-gradient-to-r from-shoorah-primary to-shoorah-secondary'
        } rounded-3xl py-2 sm:py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-shoorah-primary focus:outline-none focus:ring-2 focus:ring-shoorah-primary focus:ring-offset-2`}
      >
        {btnText}
      </button>
    </>
  );
}

PrimaryButton.propTypes = {
  btnType: PropTypes.string,
  btnText: PropTypes.string,
  disabled: PropTypes.bool,
};
