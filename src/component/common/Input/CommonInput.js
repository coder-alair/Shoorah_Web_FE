import * as React from "react";
import PropTypes from "prop-types";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { MaxCharlimit } from "../../../utils/helper";
import { useTheme } from "../../../contents/context/themeContext";

const CommonInput = ({
  id,
  name,
  value,
  label,
  error,
  type,
  onChange,
  disabled,
  isRequired,
  isIcon,
  placeholder,
  classNames,
  isLengthValidate,
}) => {
  const [showEyeIcon, setShowEyeIcon] = useState(false);
  const { theme } = useTheme();
  return (
    <div>
      <label htmlFor={id} className="text-md block font-medium text-gray-700">
        {label}{" "}
        {isRequired && !disabled && (
          <span className={` text-red-400`}>&#42;</span>
        )}
        {isLengthValidate && !disabled && (
          <span className="text-md float-right mt-1 text-red-400">
            {value.length <= MaxCharlimit
              ? MaxCharlimit - value.length + " Characters Left"
              : "Out Of Character Limit 100"}
          </span>
        )}
      </label>
      <div className="relative">
        <div className="mt-1">
          <input
            id={id}
            name={name}
            value={value}
            type={showEyeIcon ? "text" : type}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className={`block w-full appearance-none rounded-3xl border border-gray-300  ${
              classNames ? classNames : "px-3 py-2"
            } placeholder-gray-400 outline-none  ${
              theme.shoorah_border_focus_5
            } focus:outline-none ${
              theme.shoorah_border_ring_focus_5
            } sm:text-md`}
          />
        </div>
        {isIcon &&
          (showEyeIcon ? (
            <EyeSlashIcon
              onClick={() => setShowEyeIcon(false)}
              className={`absolute w-[20px] cursor-pointer ${
                theme.shoorah_text_5
              } top-1/2 -translate-y-1/2 transform ${
                classNames ? "right-[13px]" : "right-[10px]"
              }`}
            />
          ) : (
            <EyeIcon
              onClick={() => setShowEyeIcon(true)}
              className={`absolute w-[20px] cursor-pointer ${
                theme.shoorah_text_5
              } top-1/2 -translate-y-1/2 transform ${
                classNames ? "right-[13px]" : "right-[10px]"
              }`}
            />
          ))}
      </div>
      {isRequired && (
        <span className={`error text-xs text-[red]`}>{error}</span>
      )}
    </div>
  );
};

CommonInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  classNames: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isIcon: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  isLengthValidate: PropTypes.any,
};
export default CommonInput;
