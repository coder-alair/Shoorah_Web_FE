import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CONTENT_TYPE, CURRENCY } from "./constants";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { DEADOMAINS } from "./dea-domains";
import Male from "../assets/images/Male.svg";
import Female from "../assets/images/Female.svg";
import NonBinary from "../assets/images/Non Binary.svg";
import InterSex from "../assets/images/Intersex.svg";
import Trans from "../assets/images/Transgender.svg";

export const MaxCharlimit = 50;
export const MaxCharlimitLongText = 2000;
export const getLocalStorageItem = (key) => localStorage.getItem(key);
export const setLocalStorageItem = (key, value) =>
  localStorage.setItem(key, value);
export const removeLocalStorageItem = (key) => localStorage.removeItem(key);
export const cleanLocalStorage = () => localStorage.clear();
export const getJWTToken = () => "Bearer " + localStorage.getItem("token");
export const getDeviceToken = () => localStorage.getItem("deviceToken");
export const getUserType = (type) => (type === 0 ? "Super Admin" : "Sub Admin");
export const getFocusType = (type) => (type === 1 ? "Main" : "Affirmation");
export const getMeditationType = (type) => (type === 1 ? "Video" : "Audio");

export const getAccountType = (type) =>
  type === 0
    ? "In Trial"
    : type === 1
      ? "Not Subscribed"
      : type === 2
        ? "Subscribed"
        : type === 3
          ? "Expired"
          : "━━";

export const getContentApprovalStatus = (type) => {
  return (
    <p
      className={`m-0 inline-flex rounded-full ${
        type === 1
          ? "bg-green-100"
          : type === 2
            ? "bg-red-100"
            : "bg-orange-100"
      } px-4 py-[6px] text-sm capitalize leading-5 ${
        type === 1
          ? "text-green-400"
          : type === 2
            ? "text-red-400"
            : "text-orange-400"
      }`}
    >
      {type === 1 ? "Active" : type === 2 ? "Rejected" : "Draft"}
    </p>
  );
};

export const getSentToUser = (type) =>
  type === 1
    ? "All"
    : type === 2
      ? "In Trial"
      : type === 3
        ? "Subscribed"
        : type === 4
          ? "Custom User"
          : type === 5
            ? "Expired"
            : type === 6
              ? "Not Subscribed"
              : "━━";

//COMMENTED FOR IN FUTURE USE
// let returnValue = '';
// // eslint-disable-next-line
// sentToUser?.map((item) => {
//   if (item?.value === parseInt(type)) {
//     returnValue = item.name;
//   }
// });
// return returnValue ? returnValue : '━━';

export const getContentType = (type) => {
  let returnValue = "";
  CONTENT_TYPE?.map((item) => {
    if (item?.value === parseInt(type)) {
      returnValue = item.name;
    }
  });
  return returnValue ? returnValue : "━━";
};

export const errorToast = (msg, toastId = "") =>
  toast.error(msg, {
    duration: 2000,
    id: toastId,
  });

export const successToast = (msg, duration = 2000) =>
  toast.success(msg, {
    duration,
  });

export const informativeToast = (msg, duration = 3000) =>
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
      >
        <div className="w-0 flex-1 p-2">
          <div className="flex items-start">
            <div className="self-center">
              <InformationCircleIcon className="w-[24px] text-shoorah-secondary" />
            </div>
            <div className="ml-3 self-center">
              <p className="mt-1 text-gray-500">{msg}</p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      duration,
    },
  );

export const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export const capitalize = (value) => {
  let lowerCase = value?.toLowerCase();
  return lowerCase.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase(),
  );
};

export const getFilterKey = (value) => {
  let key = value?.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1);
  let returnKey = key?.toString()?.replaceAll(",", " ");
  return capitalize(returnKey);
};

export const isSuperAdmin = () => {
  const userData =
    getLocalStorageItem("userData") &&
    JSON.parse(getLocalStorageItem("userData"));
  return userData.userType;
};

export const DeadDomainEmail = (email) => {
  const emailDomain = "@" + email.split("@")[1];
  return DEADOMAINS.includes(emailDomain);
};

export const ValueToPercentage = (value, max) => {
  return (value * 100) / max;
};

export const IsLastIndex = (j, length) => {
  return j === length - 1;
};

export const getGender = (type, flag) => {
  switch (type) {
    case 1:
      return flag ? Male : "Male";
    case 2:
      return flag ? Female : "Female";
    case 3:
      return flag ? NonBinary : "Nonbinary";
    case 4:
      return flag ? InterSex : "Intersex";
    case 5:
      return flag ? Trans : "Transgender";
    default:
      return "Not Preferred";
  }
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export const getFileType = (value) => {
  const fileExtension = value?.name?.split(".");
  const finalType = `${value?.type?.split("/")[0]}/${
    fileExtension[fileExtension?.length - 1]
  }`;
  return finalType;
};

export const jsonToCsv = (data) => {
  if (!data || data.length === 0) {
    return "";
  }
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((item) => Object.values(item).join(","));
  return `${header}\n${rows.join("\n")}`;
};

export const convertToIndianDate = (date) => {
  if (!date || date == "━━") {
    return "━━";
  }
  const newDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const indianDate = newDate.toLocaleDateString("en-IN", options);
  return indianDate;
};

export const convertCodeToType = (code) => {
  let type;
  if (code === 0) {
    type = "In Trial";
  } else if (code === 1) {
    type = "Not Subscribed";
  } else if (code === 2) {
    type = "Subscribed";
  } else if (code === 3) {
    type = "Expired";
  }
  return type;
};

export const convertCodeToPlatform = (code) => {
  let type;
  if (code === 0) {
    type = "Email";
  } else if (code === 1) {
    type = "Apple";
  } else if (code === 2) {
    type = "Gmail";
  } else if (code === 3) {
    type = "Facebook";
  }
  return type;
};

export const convertCodeToStatus = (code) => {
  let type;
  if (code === 0) {
    type = "Inactive";
  } else if (code === 1) {
    type = "Active";
  }
  return type;
};

export const convertCodeToPurchasedDevice = (code) => {
  let type;
  if (code === 0) {
    type = "Email";
  } else if (code === 1) {
    type = "Gmail";
  } else if (code === 2) {
    type = "Apple";
  } else if (code === 3) {
    type = "Facebook";
  }
  return type;
};

export const addMonthOnDate = (date, len) => {
  let data = new Date(date);
  var newDate = new Date(data.setMonth(data.getMonth() + parseInt(len)));
  return newDate;
};
export const minusMonthOnDate = (date, len) => {
  let data = new Date(date);
  var newDate = new Date(data.setMonth(data.getMonth() - parseInt(len)));
  return newDate;
};
export const minusDayOnDate = (date, len) => {
  let data = new Date(date);
  var newDate = new Date(data.setDate(data.getDate() - parseInt(len)));
  return newDate;
};

export const monthDiff = (d1, d2) => {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

export const currentDateWithFormat = (date) => {
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return yyyy + "-" + mm + "-" + dd;
};

export const getCurrencyData = (data) => {
  const data1 = CURRENCY.filter((e) => e.value == data);
  if (data1.length > 0) {
    return data1[0].name;
  } else {
    return "";
  }
};

export const getCurrencyIcon = (data) => {
  const data1 = CURRENCY.filter((e) => e.value == data);
  if (data1.length > 0) {
    return data1[0].icon;
  } else {
    return "";
  }
};

export const isObjectEmpty = (obj) => {
  return Object.entries(obj).length === 0;
};

export const captchaTextGenerator = () => {
  let uniquechar = "";

  const randomchar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Generate captcha for length of
  // 5 with random character
  for (let i = 1; i < 5; i++) {
    uniquechar += randomchar.charAt(Math.random() * randomchar.length);
  }

  return uniquechar;
};

export function generateRandomSoftColor() {
  // Generate random values for RGB components
  const red = Math.floor(Math.random() * 150) + 100; // 100 to 250
  const green = Math.floor(Math.random() * 150) + 100; // 100 to 250
  const blue = Math.floor(Math.random() * 150) + 100; // 100 to 250

  // Convert RGB to hex
  const hexColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(
    16,
  )}`;

  return hexColor;
}
