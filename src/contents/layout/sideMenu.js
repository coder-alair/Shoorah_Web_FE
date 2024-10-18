import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../context/themeContext";
import { useAuth } from "../context/user";

const SideMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [tabs, setTabs] = useState([
    {
      name: "Home",
      url: "/home",
      activeImage: theme.shoorah_Home_active,
      inactiveImage: theme.shoorah_Home_in_active,
      active: false,
    },
    {
      name: "Journal",
      url: "/journal",
      activeImage: theme.shoorah_Journal_active,
      inactiveImage: theme.shoorah_Journal_in_active,
      active: false,
    },
    {
      name: "Restore",
      url: "/restore",
      activeImage: theme.shoorah_Restore_active,
      inactiveImage: theme.shoorah_Restore_in_active,
      active: false,
    },
    {
      name: "Shuru",
      url: "/shuru",
      activeImage: theme.shoorah_Explore_active,
      inactiveImage: theme.shoorah_Explore_in_active,
      active: false,
    },
    {
      name: "Pods",
      url: "/shoorah-pods",
      activeImage: theme.shoorah_Rituals_active,
      inactiveImage: theme.shoorah_Rituals_in_active,
      active: false,
    },

    {
      name: "Explore",
      url: "/explore",
      activeImage: theme.shoorah_Explore_active,
      inactiveImage: theme.shoorah_Explore_in_active,
      active: false,
    },
  ]);

  const handleTab = (tab) => {
    history.push(`${tab.url}`);
  };

  useEffect(() => {
    tabs.map((i) => {
      if (window.location.pathname.includes(i.name.toLowerCase())) {
        i.active = true;
      } else {
        i.active = false;
      }
    });

    return () => {
      tabs.map((i) => {
        if (window.location.pathname.includes(i.name.toLowerCase())) {
          i.active = true;
        } else {
          i.active = false;
        }
      });
    };
  }, [history, window.location.pathname, tabs]);

  useEffect(() => {
    if (!window) {
      return;
    }
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, [window.location.pathname]);

  useEffect(() => {
    const shuruTab = {
      name: "Shuru",
      url: "/shuru",
      activeImage: theme.shoorah_Explore_active,
      inactiveImage: theme.shoorah_Explore_in_active,
      active: false,
    };
  
    const shuruTabIndex = tabs.findIndex((tab) => tab.name === "Shuru");

    const updatedTabs = (user?.shuruUsage == true|| !user?.companyId)
      ? shuruTabIndex !== -1
        ? tabs.map((tab, index) => (index === shuruTabIndex ? shuruTab : tab))
        : [...tabs, shuruTab]
      : tabs.filter((tab) => tab.name !== "Shuru");
  
    setTabs(updatedTabs);
  }, [history, window.location.pathname, user?.shuruUsage]);

  return (
    <div>
      <div
        style={{
          boxShadow:
            "0 0px 5px 0px rgba(0, 0, 0, 0.1), 0 0px 0px 0 rgba(0, 0, 0, 0.10)",
        }}
        className="fixed bottom-0 left-0 z-50 flex w-screen items-start justify-center overflow-hidden rounded-t-3xl  bg-white drop-shadow-lg lg:hidden "
      >
        <div className="right-0 z-10 flex h-[12vh]   w-full items-center justify-evenly gap-1 rounded-3xl rounded-r-none bg-[#fff] px-3 py-4  transition-all duration-500 ease-in">
          {tabs.map((tab) => (
            <React.Fragment key={tab.name}>
              <div
                onClick={() => handleTab(tab)}
                className=" flex w-[60%] cursor-pointer flex-col items-center gap-1 lg:hover:scale-105"
              >
                {window.location.pathname.includes(tab.name?.toLowerCase()) ? (
                  <>
                    {tab.name == "Home" ? (
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9994 13.8667C13.5782 13.8667 14.8581 15.1466 14.8581 16.7255V21.9368H9.14062V16.7255C9.14062 15.1466 10.4205 13.8667 11.9994 13.8667Z"
                          fill="white"
                        />
                        <path
                          d="M1.28516 14.5203L10.701 3.59789C11.3849 2.80461 12.614 2.80461 13.2979 3.59789L22.7137 14.5203"
                          stroke={`${theme.shoorah_8}`}
                          strokeWidth="1.71429"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.6991 3.5787L4.58235 10.705L4.23296 13.1975C3.91814 15.4435 3.93355 17.7234 4.27874 19.965C4.45342 21.0994 5.42948 21.9366 6.57717 21.9366H17.4226C18.5703 21.9366 19.5465 21.0994 19.7211 19.965C20.0662 17.7234 20.0817 15.4435 19.7669 13.1975L19.4175 10.705L13.3007 3.5787C12.6166 2.7817 11.3832 2.78172 10.6991 3.5787ZM14.8587 16.7253C14.8587 15.1464 13.5788 13.8665 11.9999 13.8665C10.4211 13.8665 9.14119 15.1464 9.14119 16.7253V21.9365H14.8587V16.7253Z"
                          fill={`${theme.shoorah_2}`}
                        />
                        <path
                          d="M4.58235 10.705L10.6991 3.57871C11.3832 2.78171 12.6167 2.78171 13.3007 3.57871L19.4176 10.705L19.7669 13.1975C20.0817 15.4435 20.0662 17.7235 19.7212 19.9651C19.5465 21.0995 18.5704 21.9367 17.4226 21.9367H6.57716C5.42948 21.9367 4.45342 21.0995 4.27873 19.9651C3.93356 17.7235 3.91813 15.4435 4.23296 13.1975L4.58235 10.705Z"
                          stroke={`${theme.shoorah_8}`}
                          strokeWidth="1.71429"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.9994 13.8667C13.5782 13.8667 14.8581 15.1466 14.8581 16.7255V21.9368H9.14062V16.7255C9.14062 15.1466 10.4205 13.8667 11.9994 13.8667Z"
                          stroke={`${theme.shoorah_8}`}
                          strokeWidth="1.71429"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : tab.name == "Journal" ? (
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_4687_10160)">
                          <path
                            d="M1.71854 19.1114C1.90236 20.757 3.21783 22.0718 4.86271 22.2621C6.72137 22.4771 8.64197 22.6891 10.607 22.6891C12.5721 22.6891 14.4927 22.4771 16.3514 22.2621C17.9962 22.0718 19.3118 20.757 19.4955 19.1114C19.7021 17.2615 19.9017 15.3502 19.9017 13.3946C19.9017 11.4391 19.7021 9.52777 19.4955 7.67792C19.3118 6.0323 17.9962 4.71746 16.3514 4.52719C14.4927 4.31219 12.5721 4.1001 10.607 4.1001C8.64197 4.1001 6.72137 4.31219 4.86271 4.52719C3.21783 4.71746 1.90236 6.0323 1.71854 7.67792C1.5119 9.52777 1.3125 11.4391 1.3125 13.3946C1.3125 15.3502 1.5119 17.2615 1.71854 19.1114Z"
                            fill="white"
                          />
                          <path
                            d="M9.2399 4.13184C7.74967 4.19895 6.28798 4.36212 4.86273 4.52698C3.21783 4.71725 1.90236 6.03209 1.71854 7.6777C1.5119 9.52755 1.3125 11.4389 1.3125 13.3944C1.3125 15.35 1.5119 17.2613 1.71854 19.1112C1.90236 20.7567 3.21783 22.0716 4.86271 22.2618C6.72137 22.4768 8.64197 22.689 10.607 22.689C12.5721 22.689 14.4927 22.4768 16.3514 22.2618C17.9962 22.0716 19.3118 20.7569 19.4955 19.1112C19.6442 17.7805 19.789 16.418 19.8586 15.0302"
                            stroke={`${theme.shoorah_8}`}
                            strokeWidth="1.71429"
                            strokeLinecap="round"
                          />
                          <path
                            d="M17.3296 2.23312L11.0126 9.40083L10.1472 13.4711C10.0079 14.126 10.6906 14.7457 11.3299 14.5447L15.3805 13.2713L21.9052 6.40578C22.9889 5.26549 22.7998 3.35828 21.4881 2.19803C20.207 1.06496 18.3453 1.08067 17.3296 2.23312Z"
                            fill={`${theme.shoorah_2}`}
                          />
                          <path
                            d="M17.3296 2.23312L11.0126 9.40083L10.1472 13.4711C10.0079 14.126 10.6906 14.7457 11.3299 14.5447L15.3805 13.2713L21.9052 6.40578C22.9889 5.26549 22.7998 3.35828 21.4881 2.19803C20.207 1.06496 18.3453 1.08067 17.3296 2.23312Z"
                            stroke={`${theme.shoorah_8}`}
                            strokeWidth="1.71429"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4687_10160">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    ) : tab.name == "Pods" ? (
                      <svg
                        id="Layer_1"
                        width="26"
                        height="26"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="m2,38v-12.5c0-6.2,2.3-12.2,6.4-16.6s9.8-6.9,15.6-6.9,11.4,2.5,15.6,6.9,6.4,10.4,6.4,16.6v12.5"
                          fill="none"
                          stroke="#000"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                        <path
                          d="m13,28H2v14c0,2.2,1.8,4,4,4h7v-18Z"
                          fill={theme.shoorah_2}
                          stroke="#000"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                        <path
                          d="m35,28h11v14c0,2.2-1.8,4-4,4h-7v-18Z"
                          fill={theme.shoorah_2}
                          stroke="#000"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                      </svg>
                    ) : tab.name == "Explore" ? (
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_4687_1971)">
                          <g clipPath="url(#clip1_4687_1971)">
                            <path
                              d="M22.2863 23.7144H13.7148"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.7148 15.1426H22.2863"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.7148 19.4287H22.2863"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22.5798 8.59413C23.1256 9.6587 22.2964 10.8571 21.1 10.8571H14.843C13.6627 10.8571 12.8328 9.68728 13.3544 8.62847C14.4767 6.35018 15.9148 4.68474 18.0003 2.28564C20.0013 4.67712 21.4223 6.33662 22.5798 8.59413Z"
                              fill={`${theme.shoorah_2}`}
                            />
                            <path
                              d="M5.5719 24.1408C8.17455 24.1408 10.2844 22.0311 10.2844 19.4283C10.2844 16.8257 8.17455 14.7158 5.5719 14.7158C2.96924 14.7158 0.859375 16.8257 0.859375 19.4283C0.859375 22.0311 2.96924 24.1408 5.5719 24.1408Z"
                              fill={`${theme.shoorah_2}`}
                            />
                            <path
                              d="M1.46008 9.09683C1.5513 9.91972 2.21012 10.5783 3.03263 10.6729C3.85521 10.7675 4.70365 10.8571 5.57087 10.8571C6.43809 10.8571 7.28653 10.7675 8.10911 10.6729C8.93162 10.5783 9.59044 9.91972 9.68166 9.09683C9.7724 8.27832 9.85658 7.43416 9.85658 6.57136C9.85658 5.70854 9.7724 4.86439 9.68166 4.04589C9.59044 3.223 8.93162 2.56443 8.10911 2.46983C7.28653 2.37523 6.43809 2.28564 5.57087 2.28564C4.70365 2.28564 3.85521 2.37523 3.03263 2.46983C2.21012 2.56443 1.5513 3.223 1.46008 4.04589C1.36934 4.86439 1.28516 5.70854 1.28516 6.57136C1.28516 7.43416 1.36934 8.27832 1.46008 9.09683Z"
                              fill={`${theme.shoorah_2}`}
                            />
                            <path
                              d="M22.5798 8.59413C23.1256 9.6587 22.2964 10.8571 21.1 10.8571H14.843C13.6627 10.8571 12.8328 9.68728 13.3544 8.62847C14.4767 6.35018 15.9148 4.68474 18.0003 2.28564C20.0013 4.67712 21.4223 6.33662 22.5798 8.59413Z"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.5719 24.1408C8.17455 24.1408 10.2844 22.0311 10.2844 19.4283C10.2844 16.8257 8.17455 14.7158 5.5719 14.7158C2.96924 14.7158 0.859375 16.8257 0.859375 19.4283C0.859375 22.0311 2.96924 24.1408 5.5719 24.1408Z"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M1.46008 9.09683C1.5513 9.91972 2.21012 10.5783 3.03263 10.6729C3.85521 10.7675 4.70365 10.8571 5.57087 10.8571C6.43809 10.8571 7.28653 10.7675 8.10911 10.6729C8.93162 10.5783 9.59044 9.91972 9.68166 9.09683C9.7724 8.27832 9.85658 7.43416 9.85658 6.57136C9.85658 5.70854 9.7724 4.86439 9.68166 4.04589C9.59044 3.223 8.93162 2.56443 8.10911 2.46983C7.28653 2.37523 6.43809 2.28564 5.57087 2.28564C4.70365 2.28564 3.85521 2.37523 3.03263 2.46983C2.21012 2.56443 1.5513 3.223 1.46008 4.04589C1.36934 4.86439 1.28516 5.70854 1.28516 6.57136C1.28516 7.43416 1.36934 8.27832 1.46008 9.09683Z"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_4687_1971">
                            <rect width="25" height="25" fill="white" />
                          </clipPath>
                          <clipPath id="clip1_4687_1971">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0 1)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    ) : tab.name == "Restore" ? (
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.7713 11.6865C16.5476 9.57588 13.7155 11.5983 12.0007 13.3131C10.2859 11.5983 7.45386 9.57588 5.23007 11.6865C1.55697 15.1746 8.77 22.1169 12.0007 22.6492C15.2314 22.1169 22.4444 15.1746 18.7713 11.6865Z"
                          fill={`${theme.shoorah_2}`}
                        />
                        <path
                          d="M18.7713 11.6865C16.5476 9.57588 13.7155 11.5983 12.0007 13.3131C10.2859 11.5983 7.45386 9.57588 5.23007 11.6865C1.55697 15.1746 8.77 22.1169 12.0007 22.6492C15.2314 22.1169 22.4444 15.1746 18.7713 11.6865Z"
                          stroke={`${theme.shoorah_8}`}
                          strokeWidth="1.71429"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.79688 19.145L7.58737 18.3545L11.9999 13.3125L16.4124 18.3545L17.2029 19.145"
                          stroke={`${theme.shoorah_8}`}
                          strokeWidth="1.71429"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.0008 8.14279C13.8944 8.14279 15.4294 6.60776 15.4294 4.71422C15.4294 2.82067 13.8944 1.28564 12.0008 1.28564C10.1073 1.28564 8.57227 2.82067 8.57227 4.71422C8.57227 6.60776 10.1073 8.14279 12.0008 8.14279Z"
                          fill={`${theme.shoorah_2}`}
                        />
                        <path
                          d="M12.0008 8.14279C13.8944 8.14279 15.4294 6.60776 15.4294 4.71422C15.4294 2.82067 13.8944 1.28564 12.0008 1.28564C10.1073 1.28564 8.57227 2.82067 8.57227 4.71422C8.57227 6.60776 10.1073 8.14279 12.0008 8.14279Z"
                          stroke={`${theme.shoorah_8}`}
                          strokeWidth="1.71429"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : tab.name == "Shuru" ? (
                      <svg
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 464.67 372.84"
                        width="30"
                        height="30"
                      >
                        <path
                          d="m35.11,200.95C22.1,73.49,123.41,2,232.33,2s210.24,71.49,197.23,198.95"
                          fill={theme.shoorah_3}
                          stroke-width="0"
                        />
                        <path
                          d="m417.72,213.51c0,92.06-83,157.33-185.38,157.33S46.95,305.57,46.95,213.51,129.95,37.46,232.33,37.46s185.38,83.99,185.38,176.05h0Z"
                          fill="#fff"
                          stroke-width="0"
                        />
                        <path
                          d="m417.72,213.51c0,92.06-83,157.33-185.38,157.33S46.95,305.57,46.95,213.51,129.95,37.46,232.33,37.46s185.38,83.99,185.38,176.05h0Z"
                          fill="none"
                          stroke="#000"
                          stroke-miterlimit="10"
                          stroke-width="4"
                        />
                        <path
                          d="m35.11,200.95C22.1,73.49,123.41,2,232.33,2s210.24,71.49,197.23,198.95"
                          fill="none"
                          stroke="#000"
                          stroke-miterlimit="10"
                          stroke-width="4"
                        />
                        <path
                          d="m232.33,17.41c-126.32,2.61-170.21,97.82-176.05,116.23-6.04,19.06-17.73,73.83,78.11-5.63,0,0-30.88,89.22,70.79,9.01,0,0-1.24,28.21,27.15,28.21s27.15-28.21,27.15-28.21c101.68,80.21,70.79-9.01,70.79-9.01,95.84,79.46,84.15,24.69,78.11,5.63-5.84-18.41-49.73-113.62-176.05-116.23Z"
                          fill={theme.shoorah_2}
                          stroke-width="0"
                        />
                        <path
                          d="m232.33,17.41c-126.32,2.61-170.21,97.82-176.05,116.23-6.04,19.06-17.73,73.83,78.11-5.63,0,0-30.88,89.22,70.79,9.01,0,0-1.24,28.21,27.15,28.21s27.15-28.21,27.15-28.21c101.68,80.21,70.79-9.01,70.79-9.01,95.84,79.46,84.15,24.69,78.11,5.63-5.84-18.41-49.73-113.62-176.05-116.23Z"
                          fill="none"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                        <circle
                          cx="328.02"
                          cy="271.86"
                          r="27.03"
                          fill={theme.shoorah_2}
                          stroke-width="0"
                        />
                        <circle
                          cx="136.65"
                          cy="271.86"
                          r="27.03"
                          fill={theme.shoorah_2}
                          stroke-width="0"
                        />
                        <path
                          d="m18.26,300.87c14.79.48,29.54-.84,44.01-3.93,2.31-.49,3.89-2.9,3.65-5.6-3.88-43.48-7.77-86.96-11.65-130.43-.24-2.7-2.23-4.79-4.59-4.87-14.79-.48-29.54.84-44.01,3.93-2.31.49-3.89,2.9-3.65,5.6,3.88,43.48,7.77,86.96,11.65,130.43.24,2.7,2.23,4.79,4.59,4.87Z"
                          fill={theme.shoorah_3}
                          stroke-width="0"
                        />
                        <path
                          d="m18.26,300.87c14.79.48,29.54-.84,44.01-3.93,2.31-.49,3.89-2.9,3.65-5.6-3.88-43.48-7.77-86.96-11.65-130.43-.24-2.7-2.23-4.79-4.59-4.87-14.79-.48-29.54.84-44.01,3.93-2.31.49-3.89,2.9-3.65,5.6,3.88,43.48,7.77,86.96,11.65,130.43.24,2.7,2.23,4.79,4.59,4.87Z"
                          fill="none"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                        <path
                          d="m446.4,300.87c-14.79.48-29.54-.84-44.01-3.93-2.31-.49-3.89-2.9-3.65-5.6,3.88-43.48,7.77-86.96,11.65-130.43.24-2.7,2.23-4.79,4.59-4.87,14.79-.48,29.54.84,44.01,3.93,2.31.49,3.89,2.9,3.65,5.6-3.88,43.48-7.77,86.96-11.65,130.43-.24,2.7-2.23,4.79-4.59,4.87Z"
                          fill={theme.shoorah_3}
                          stroke-width="0"
                        />
                        <path
                          d="m446.4,300.87c-14.79.48-29.54-.84-44.01-3.93-2.31-.49-3.89-2.9-3.65-5.6,3.88-43.48,7.77-86.96,11.65-130.43.24-2.7,2.23-4.79,4.59-4.87,14.79-.48,29.54.84,44.01,3.93,2.31.49,3.89,2.9,3.65,5.6-3.88,43.48-7.77,86.96-11.65,130.43-.24,2.7-2.23,4.79-4.59,4.87Z"
                          fill="none"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                        <path
                          d="m339.33,236.63c-7.26-34.82-50.28-34.82-57.54,0"
                          fill="none"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                        <path
                          d="m182.88,236.63c-7.26-34.82-50.28-34.82-57.54,0"
                          fill="none"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                        <path
                          d="m283.39,265.56c-22.73,38.43-78.33,38.43-101.06,0"
                          fill="none"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                      </svg>
                    ) : null}

                    <p className="text-[12px]">{tab.name}</p>
                  </>
                ) : (
                  <>
                    {tab.name == "Home" ? (
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9994 13.8667C13.5782 13.8667 14.8581 15.1466 14.8581 16.7255V21.9368H9.14062V16.7255C9.14062 15.1466 10.4205 13.8667 11.9994 13.8667Z"
                          fill="white"
                        />
                        <path
                          d="M1.28516 14.5203L10.701 3.59789C11.3849 2.80461 12.614 2.80461 13.2979 3.59789L22.7137 14.5203"
                          stroke={`#9399b1`}
                          strokeWidth="1.71429"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.6991 3.5787L4.58235 10.705L4.23296 13.1975C3.91814 15.4435 3.93355 17.7234 4.27874 19.965C4.45342 21.0994 5.42948 21.9366 6.57717 21.9366H17.4226C18.5703 21.9366 19.5465 21.0994 19.7211 19.965C20.0662 17.7234 20.0817 15.4435 19.7669 13.1975L19.4175 10.705L13.3007 3.5787C12.6166 2.7817 11.3832 2.78172 10.6991 3.5787ZM14.8587 16.7253C14.8587 15.1464 13.5788 13.8665 11.9999 13.8665C10.4211 13.8665 9.14119 15.1464 9.14119 16.7253V21.9365H14.8587V16.7253Z"
                          fill={`white`}
                        />
                        <path
                          d="M4.58235 10.705L10.6991 3.57871C11.3832 2.78171 12.6167 2.78171 13.3007 3.57871L19.4176 10.705L19.7669 13.1975C20.0817 15.4435 20.0662 17.7235 19.7212 19.9651C19.5465 21.0995 18.5704 21.9367 17.4226 21.9367H6.57716C5.42948 21.9367 4.45342 21.0995 4.27873 19.9651C3.93356 17.7235 3.91813 15.4435 4.23296 13.1975L4.58235 10.705Z"
                          stroke={`#9399b1`}
                          strokeWidth="1.71429"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.9994 13.8667C13.5782 13.8667 14.8581 15.1466 14.8581 16.7255V21.9368H9.14062V16.7255C9.14062 15.1466 10.4205 13.8667 11.9994 13.8667Z"
                          stroke={`#9399b1`}
                          strokeWidth="1.71429"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : tab.name == "Journal" ? (
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_4687_10160)">
                          <path
                            d="M1.71854 19.1114C1.90236 20.757 3.21783 22.0718 4.86271 22.2621C6.72137 22.4771 8.64197 22.6891 10.607 22.6891C12.5721 22.6891 14.4927 22.4771 16.3514 22.2621C17.9962 22.0718 19.3118 20.757 19.4955 19.1114C19.7021 17.2615 19.9017 15.3502 19.9017 13.3946C19.9017 11.4391 19.7021 9.52777 19.4955 7.67792C19.3118 6.0323 17.9962 4.71746 16.3514 4.52719C14.4927 4.31219 12.5721 4.1001 10.607 4.1001C8.64197 4.1001 6.72137 4.31219 4.86271 4.52719C3.21783 4.71746 1.90236 6.0323 1.71854 7.67792C1.5119 9.52777 1.3125 11.4391 1.3125 13.3946C1.3125 15.3502 1.5119 17.2615 1.71854 19.1114Z"
                            fill="white"
                          />
                          <path
                            d="M9.2399 4.13184C7.74967 4.19895 6.28798 4.36212 4.86273 4.52698C3.21783 4.71725 1.90236 6.03209 1.71854 7.6777C1.5119 9.52755 1.3125 11.4389 1.3125 13.3944C1.3125 15.35 1.5119 17.2613 1.71854 19.1112C1.90236 20.7567 3.21783 22.0716 4.86271 22.2618C6.72137 22.4768 8.64197 22.689 10.607 22.689C12.5721 22.689 14.4927 22.4768 16.3514 22.2618C17.9962 22.0716 19.3118 20.7569 19.4955 19.1112C19.6442 17.7805 19.789 16.418 19.8586 15.0302"
                            stroke="#9399b1"
                            strokeWidth="1.71429"
                            strokeLinecap="round"
                          />
                          <path
                            d="M17.3296 2.23312L11.0126 9.40083L10.1472 13.4711C10.0079 14.126 10.6906 14.7457 11.3299 14.5447L15.3805 13.2713L21.9052 6.40578C22.9889 5.26549 22.7998 3.35828 21.4881 2.19803C20.207 1.06496 18.3453 1.08067 17.3296 2.23312Z"
                            fill="white"
                          />
                          <path
                            d="M17.3296 2.23312L11.0126 9.40083L10.1472 13.4711C10.0079 14.126 10.6906 14.7457 11.3299 14.5447L15.3805 13.2713L21.9052 6.40578C22.9889 5.26549 22.7998 3.35828 21.4881 2.19803C20.207 1.06496 18.3453 1.08067 17.3296 2.23312Z"
                            stroke="#9399b1"
                            strokeWidth="1.71429"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4687_10160">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    ) : tab.name == "Pods" ? (
                      <svg
                        id="Layer_1"
                        height="26"
                        width="26"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="m2,38v-12.5c0-6.2,2.3-12.2,6.4-16.6s9.8-6.9,15.6-6.9,11.4,2.5,15.6,6.9,6.4,10.4,6.4,16.6v12.5"
                          fill="none"
                          stroke="#999db3"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                        <path
                          d="m13,28H2v14c0,2.2,1.8,4,4,4h7v-18Z"
                          fill="none"
                          stroke="#999db3"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                        <path
                          d="m35,28h11v14c0,2.2-1.8,4-4,4h-7v-18Z"
                          fill="none"
                          stroke="#999db3"
                          stroke-linejoin="round"
                          stroke-width="4"
                        />
                      </svg>
                    ) : tab.name == "Explore" ? (
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_4687_1971)">
                          <g clipPath="url(#clip1_4687_1971)">
                            <path
                              d="M22.2863 23.7144H13.7148"
                              stroke="#9399b1"
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.7148 15.1426H22.2863"
                              stroke="#9399b1"
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.7148 19.4287H22.2863"
                              stroke="#9399b1"
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22.5798 8.59413C23.1256 9.6587 22.2964 10.8571 21.1 10.8571H14.843C13.6627 10.8571 12.8328 9.68728 13.3544 8.62847C14.4767 6.35018 15.9148 4.68474 18.0003 2.28564C20.0013 4.67712 21.4223 6.33662 22.5798 8.59413Z"
                              fill="white"
                            />
                            <path
                              d="M5.5719 24.1408C8.17455 24.1408 10.2844 22.0311 10.2844 19.4283C10.2844 16.8257 8.17455 14.7158 5.5719 14.7158C2.96924 14.7158 0.859375 16.8257 0.859375 19.4283C0.859375 22.0311 2.96924 24.1408 5.5719 24.1408Z"
                              fill="white"
                            />
                            <path
                              d="M1.46008 9.09683C1.5513 9.91972 2.21012 10.5783 3.03263 10.6729C3.85521 10.7675 4.70365 10.8571 5.57087 10.8571C6.43809 10.8571 7.28653 10.7675 8.10911 10.6729C8.93162 10.5783 9.59044 9.91972 9.68166 9.09683C9.7724 8.27832 9.85658 7.43416 9.85658 6.57136C9.85658 5.70854 9.7724 4.86439 9.68166 4.04589C9.59044 3.223 8.93162 2.56443 8.10911 2.46983C7.28653 2.37523 6.43809 2.28564 5.57087 2.28564C4.70365 2.28564 3.85521 2.37523 3.03263 2.46983C2.21012 2.56443 1.5513 3.223 1.46008 4.04589C1.36934 4.86439 1.28516 5.70854 1.28516 6.57136C1.28516 7.43416 1.36934 8.27832 1.46008 9.09683Z"
                              fill="white"
                            />
                            <path
                              d="M22.5798 8.59413C23.1256 9.6587 22.2964 10.8571 21.1 10.8571H14.843C13.6627 10.8571 12.8328 9.68728 13.3544 8.62847C14.4767 6.35018 15.9148 4.68474 18.0003 2.28564C20.0013 4.67712 21.4223 6.33662 22.5798 8.59413Z"
                              stroke="#9399b1"
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.5719 24.1408C8.17455 24.1408 10.2844 22.0311 10.2844 19.4283C10.2844 16.8257 8.17455 14.7158 5.5719 14.7158C2.96924 14.7158 0.859375 16.8257 0.859375 19.4283C0.859375 22.0311 2.96924 24.1408 5.5719 24.1408Z"
                              stroke="#9399b1"
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M1.46008 9.09683C1.5513 9.91972 2.21012 10.5783 3.03263 10.6729C3.85521 10.7675 4.70365 10.8571 5.57087 10.8571C6.43809 10.8571 7.28653 10.7675 8.10911 10.6729C8.93162 10.5783 9.59044 9.91972 9.68166 9.09683C9.7724 8.27832 9.85658 7.43416 9.85658 6.57136C9.85658 5.70854 9.7724 4.86439 9.68166 4.04589C9.59044 3.223 8.93162 2.56443 8.10911 2.46983C7.28653 2.37523 6.43809 2.28564 5.57087 2.28564C4.70365 2.28564 3.85521 2.37523 3.03263 2.46983C2.21012 2.56443 1.5513 3.223 1.46008 4.04589C1.36934 4.86439 1.28516 5.70854 1.28516 6.57136C1.28516 7.43416 1.36934 8.27832 1.46008 9.09683Z"
                              stroke="#9399b1"
                              strokeWidth="1.71429"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_4687_1971">
                            <rect width="25" height="25" fill="white" />
                          </clipPath>
                          <clipPath id="clip1_4687_1971">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0 1)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    ) : tab.name == "Restore" ? (
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.7713 11.6865C16.5476 9.57588 13.7155 11.5983 12.0007 13.3131C10.2859 11.5983 7.45386 9.57588 5.23007 11.6865C1.55697 15.1746 8.77 22.1169 12.0007 22.6492C15.2314 22.1169 22.4444 15.1746 18.7713 11.6865Z"
                          fill="white"
                        />
                        <path
                          d="M18.7713 11.6865C16.5476 9.57588 13.7155 11.5983 12.0007 13.3131C10.2859 11.5983 7.45386 9.57588 5.23007 11.6865C1.55697 15.1746 8.77 22.1169 12.0007 22.6492C15.2314 22.1169 22.4444 15.1746 18.7713 11.6865Z"
                          stroke="#9399b1"
                          strokeWidth="1.71429"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.79688 19.145L7.58737 18.3545L11.9999 13.3125L16.4124 18.3545L17.2029 19.145"
                          stroke="#9399b1"
                          strokeWidth="1.71429"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.0008 8.14279C13.8944 8.14279 15.4294 6.60776 15.4294 4.71422C15.4294 2.82067 13.8944 1.28564 12.0008 1.28564C10.1073 1.28564 8.57227 2.82067 8.57227 4.71422C8.57227 6.60776 10.1073 8.14279 12.0008 8.14279Z"
                          fill="white"
                        />
                        <path
                          d="M12.0008 8.14279C13.8944 8.14279 15.4294 6.60776 15.4294 4.71422C15.4294 2.82067 13.8944 1.28564 12.0008 1.28564C10.1073 1.28564 8.57227 2.82067 8.57227 4.71422C8.57227 6.60776 10.1073 8.14279 12.0008 8.14279Z"
                          stroke="#9399b1"
                          strokeWidth="1.71429"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : tab.name == "Shuru" ? (
                      <svg
                        id="Layer_1"
                        height="2rem"
                        width="2rem"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 477.15 396.7"
                      >
                        <path
                          d="m41.12,218.3C28.12,90.9,129.42,19.4,238.32,19.4s210.2,71.5,197.2,198.9"
                          fill="#fff"
                          strokeWidth="0"
                        />
                        <path
                          d="m423.72,230.9c0,92.1-83,157.3-185.4,157.3S53.02,323,53.02,230.9,136.02,54.9,238.42,54.9s185.3,83.9,185.3,176h0Z"
                          fill="#fff"
                          strokeWidth="0"
                        />
                        <path
                          d="m423.72,230.9c0,92.1-83,157.3-185.4,157.3S53.02,323,53.02,230.9,136.02,54.9,238.42,54.9s185.3,83.9,185.3,176h0Z"
                          fill="none"
                          stroke="#999db3"
                          strokeMiterlimit="10"
                          strokeWidth="17"
                        />
                        <path
                          d="m32.22,207.4C19.22,80,129.42,8.5,238.32,8.5s220.3,71.5,207.3,198.9"
                          fill="none"
                          stroke="#999db3"
                          strokeMiterlimit="10"
                          strokeWidth="17"
                        />
                        <path
                          d="m238.32,34.8c-126.3,2.6-170.2,97.8-176,116.2-6,19.1-17.7,73.8,78.1-5.6,0,0-30.9,89.2,70.8,9,0,0-1.2,28.2,27.1,28.2s27.1-28.2,27.1-28.2c101.7,80.2,70.8-9,70.8-9,95.8,79.5,84.1,24.7,78.1,5.6-5.8-18.4-49.7-113.6-176-116.2h0Z"
                          fill="#fff"
                          strokeWidth="0"
                        />
                        <path
                          d="m238.32,34.8c-126.3,2.6-170.2,97.8-176,116.2-6,19.1-17.7,73.8,78.1-5.6,0,0-30.9,89.2,70.8,9,0,0-1.2,28.2,27.1,28.2s27.1-28.2,27.1-28.2c101.7,80.2,70.8-9,70.8-9,95.8,79.5,84.1,24.7,78.1,5.6-5.8-18.4-49.7-113.6-176-116.2h0Z"
                          fill="none"
                          stroke="#999db3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="17"
                        />
                        <path
                          d="m25.32,323.3c14.8.5,29.5-.8,44-3.9,2.3-.5,3.9-2.9,3.7-5.6-3.9-43.5-7.8-87-11.7-130.4-.2-2.7-2.2-4.8-4.6-4.9-14.8-.5-29.5.8-44,3.9-2.3.5-3.9,2.9-3.7,5.6,3.9,43.5,7.8,87,11.6,130.4.3,2.7,2.3,4.8,4.7,4.9Z"
                          fill="#fff"
                          strokeWidth="0"
                        />
                        <path
                          d="m25.32,323.3c14.8.5,29.5-.8,44-3.9,2.3-.5,3.9-2.9,3.7-5.6-3.9-43.5-7.8-87-11.7-130.4-.2-2.7-2.2-4.8-4.6-4.9-14.8-.5-29.5.8-44,3.9-2.3.5-3.9,2.9-3.7,5.6,3.9,43.5,7.8,87,11.6,130.4.3,2.7,2.3,4.8,4.7,4.9Z"
                          fill="none"
                          stroke="#999db3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="18"
                        />
                        <path
                          d="m452.42,323.3c-14.8.5-29.5-.8-44-3.9-2.3-.5-3.9-2.9-3.6-5.6,3.9-43.5,7.8-87,11.6-130.4.2-2.7,2.2-4.8,4.6-4.9,14.8-.5,29.5.8,44,3.9,2.3.5,3.9,2.9,3.6,5.6-3.9,43.5-7.8,87-11.6,130.4-.2,2.7-2.2,4.8-4.6,4.9Z"
                          fill="#fff"
                          strokeWidth="0"
                        />
                        <path
                          d="m452.42,323.3c-14.8.5-29.5-.8-44-3.9-2.3-.5-3.9-2.9-3.6-5.6,3.9-43.5,7.8-87,11.6-130.4.2-2.7,2.2-4.8,4.6-4.9,14.8-.5,29.5.8,44,3.9,2.3.5,3.9,2.9,3.6,5.6-3.9,43.5-7.8,87-11.6,130.4-.2,2.7-2.2,4.8-4.6,4.9Z"
                          fill="none"
                          stroke="#999db3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="17"
                        />
                        <path
                          d="m345.32,254c-7.3-34.8-50.3-34.8-57.5,0"
                          fill="none"
                          stroke="#999db3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="18"
                        />
                        <path
                          d="m188.92,254c-7.3-34.8-50.3-34.8-57.5,0"
                          fill="none"
                          stroke="#999db3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="18"
                        />
                        <path
                          d="m289.42,283c-22.7,38.4-78.3,38.4-101.1,0"
                          fill="none"
                          stroke="#999db3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="18"
                        />
                      </svg>
                    ) : null}

                    <p
                      className={`text-[12px] ${theme.shoorah_inactive_icons}`}
                    >
                      {tab.name}
                    </p>
                  </>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="fixed right-0 top-[8rem] z-[50] hidden sm:top-64 lg:top-[15rem] lg:flex ">
        {!showMenu && (
          <div
            onClick={() => setShowMenu(!showMenu)}
            style={{
              boxShadow:
                "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
            }}
            className="flex h-[70px]  cursor-pointer items-center justify-start rounded-3xl rounded-r-none bg-[#fff] px-4  text-[black] 2xl:h-[80px]"
          >
            <svg
              className="rotate-180"
              width="24"
              height="24"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.375 0.75C1.375 0.75 6.625 3.858 6.625 6C6.625 8.14125 1.375 11.25 1.375 11.25"
                stroke={`#999db3`}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}
        {showMenu && (
          <div className="relative flex w-auto items-start justify-center rounded-3xl drop-shadow-lg ">
            <div
              onClick={() => setShowMenu(!showMenu)}
              style={{
                boxShadow:
                  "0 0px 5px 0px rgba(0, 0, 0, 0.1), 0 0px 0px 0 rgba(0, 0, 0, 0.10)",
              }}
              className="absolute right-16 top-[27px] z-[10] flex h-[4rem] w-[3rem] cursor-pointer items-center justify-start rounded-l-full border-[#fff] bg-[#fff] px-4 text-[black] transition-all duration-300 ease-in"
            >
              <svg
                className=""
                width="18"
                height="18"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.375 0.75C1.375 0.75 6.625 3.858 6.625 6C6.625 8.14125 1.375 11.25 1.375 11.25"
                  stroke={`#000`}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            {/* <div
              style={{
                boxShadow:
                  "0 1px 5px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.10)",
              }}
              className="absolute right-[0.3rem] flex h-[24rem] w-[5.5rem] flex-col items-start justify-around gap-1 rounded-3xl bg-[#fff] px-3 py-4 transition-all duration-500 ease-in lg:right-[2.5rem] 2xl:right-[4rem]"
            ></div> */}

            <div className="right-0 z-10 flex h-[24rem]   flex-col items-center justify-around gap-1 rounded-3xl rounded-r-none bg-[#fff] px-3 py-4  transition-all duration-500 ease-in">
              {tabs.map((tab) => (
                <React.Fragment key={tab.name}>
                  <div
                    onClick={() => handleTab(tab)}
                    className=" flex w-[60%] cursor-pointer flex-col items-center gap-1 hover:scale-105"
                  >
                    {tab.active ? (
                      <>
                        {tab.name == "Home" ? (
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.9994 13.8667C13.5782 13.8667 14.8581 15.1466 14.8581 16.7255V21.9368H9.14062V16.7255C9.14062 15.1466 10.4205 13.8667 11.9994 13.8667Z"
                              fill="white"
                            />
                            <path
                              d="M1.28516 14.5203L10.701 3.59789C11.3849 2.80461 12.614 2.80461 13.2979 3.59789L22.7137 14.5203"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.6991 3.5787L4.58235 10.705L4.23296 13.1975C3.91814 15.4435 3.93355 17.7234 4.27874 19.965C4.45342 21.0994 5.42948 21.9366 6.57717 21.9366H17.4226C18.5703 21.9366 19.5465 21.0994 19.7211 19.965C20.0662 17.7234 20.0817 15.4435 19.7669 13.1975L19.4175 10.705L13.3007 3.5787C12.6166 2.7817 11.3832 2.78172 10.6991 3.5787ZM14.8587 16.7253C14.8587 15.1464 13.5788 13.8665 11.9999 13.8665C10.4211 13.8665 9.14119 15.1464 9.14119 16.7253V21.9365H14.8587V16.7253Z"
                              fill={`${theme.shoorah_2}`}
                            />
                            <path
                              d="M4.58235 10.705L10.6991 3.57871C11.3832 2.78171 12.6167 2.78171 13.3007 3.57871L19.4176 10.705L19.7669 13.1975C20.0817 15.4435 20.0662 17.7235 19.7212 19.9651C19.5465 21.0995 18.5704 21.9367 17.4226 21.9367H6.57716C5.42948 21.9367 4.45342 21.0995 4.27873 19.9651C3.93356 17.7235 3.91813 15.4435 4.23296 13.1975L4.58235 10.705Z"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.9994 13.8667C13.5782 13.8667 14.8581 15.1466 14.8581 16.7255V21.9368H9.14062V16.7255C9.14062 15.1466 10.4205 13.8667 11.9994 13.8667Z"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : tab.name == "Journal" ? (
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_4687_10160)">
                              <path
                                d="M1.71854 19.1114C1.90236 20.757 3.21783 22.0718 4.86271 22.2621C6.72137 22.4771 8.64197 22.6891 10.607 22.6891C12.5721 22.6891 14.4927 22.4771 16.3514 22.2621C17.9962 22.0718 19.3118 20.757 19.4955 19.1114C19.7021 17.2615 19.9017 15.3502 19.9017 13.3946C19.9017 11.4391 19.7021 9.52777 19.4955 7.67792C19.3118 6.0323 17.9962 4.71746 16.3514 4.52719C14.4927 4.31219 12.5721 4.1001 10.607 4.1001C8.64197 4.1001 6.72137 4.31219 4.86271 4.52719C3.21783 4.71746 1.90236 6.0323 1.71854 7.67792C1.5119 9.52777 1.3125 11.4391 1.3125 13.3946C1.3125 15.3502 1.5119 17.2615 1.71854 19.1114Z"
                                fill="white"
                              />
                              <path
                                d="M9.2399 4.13184C7.74967 4.19895 6.28798 4.36212 4.86273 4.52698C3.21783 4.71725 1.90236 6.03209 1.71854 7.6777C1.5119 9.52755 1.3125 11.4389 1.3125 13.3944C1.3125 15.35 1.5119 17.2613 1.71854 19.1112C1.90236 20.7567 3.21783 22.0716 4.86271 22.2618C6.72137 22.4768 8.64197 22.689 10.607 22.689C12.5721 22.689 14.4927 22.4768 16.3514 22.2618C17.9962 22.0716 19.3118 20.7569 19.4955 19.1112C19.6442 17.7805 19.789 16.418 19.8586 15.0302"
                                stroke={`${theme.shoorah_8}`}
                                strokeWidth="1.71429"
                                strokeLinecap="round"
                              />
                              <path
                                d="M17.3296 2.23312L11.0126 9.40083L10.1472 13.4711C10.0079 14.126 10.6906 14.7457 11.3299 14.5447L15.3805 13.2713L21.9052 6.40578C22.9889 5.26549 22.7998 3.35828 21.4881 2.19803C20.207 1.06496 18.3453 1.08067 17.3296 2.23312Z"
                                fill={`${theme.shoorah_2}`}
                              />
                              <path
                                d="M17.3296 2.23312L11.0126 9.40083L10.1472 13.4711C10.0079 14.126 10.6906 14.7457 11.3299 14.5447L15.3805 13.2713L21.9052 6.40578C22.9889 5.26549 22.7998 3.35828 21.4881 2.19803C20.207 1.06496 18.3453 1.08067 17.3296 2.23312Z"
                                stroke={`${theme.shoorah_8}`}
                                strokeWidth="1.71429"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_4687_10160">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : tab.name == "Pods" ? (
                          <svg
                            id="Layer_1"
                            width="26"
                            height="26"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="m2,38v-12.5c0-6.2,2.3-12.2,6.4-16.6s9.8-6.9,15.6-6.9,11.4,2.5,15.6,6.9,6.4,10.4,6.4,16.6v12.5"
                              fill="none"
                              stroke="#000"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                            <path
                              d="m13,28H2v14c0,2.2,1.8,4,4,4h7v-18Z"
                              fill={theme.shoorah_2}
                              stroke="#000"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                            <path
                              d="m35,28h11v14c0,2.2-1.8,4-4,4h-7v-18Z"
                              fill={theme.shoorah_2}
                              stroke="#000"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                          </svg>
                        ) : tab.name == "Explore" ? (
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_4687_1971)">
                              <g clipPath="url(#clip1_4687_1971)">
                                <path
                                  d="M22.2863 23.7144H13.7148"
                                  stroke={`${theme.shoorah_8}`}
                                  strokeWidth="1.71429"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13.7148 15.1426H22.2863"
                                  stroke={`${theme.shoorah_8}`}
                                  strokeWidth="1.71429"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13.7148 19.4287H22.2863"
                                  stroke={`${theme.shoorah_8}`}
                                  strokeWidth="1.71429"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M22.5798 8.59413C23.1256 9.6587 22.2964 10.8571 21.1 10.8571H14.843C13.6627 10.8571 12.8328 9.68728 13.3544 8.62847C14.4767 6.35018 15.9148 4.68474 18.0003 2.28564C20.0013 4.67712 21.4223 6.33662 22.5798 8.59413Z"
                                  fill={`${theme.shoorah_2}`}
                                />
                                <path
                                  d="M5.5719 24.1408C8.17455 24.1408 10.2844 22.0311 10.2844 19.4283C10.2844 16.8257 8.17455 14.7158 5.5719 14.7158C2.96924 14.7158 0.859375 16.8257 0.859375 19.4283C0.859375 22.0311 2.96924 24.1408 5.5719 24.1408Z"
                                  fill={`${theme.shoorah_2}`}
                                />
                                <path
                                  d="M1.46008 9.09683C1.5513 9.91972 2.21012 10.5783 3.03263 10.6729C3.85521 10.7675 4.70365 10.8571 5.57087 10.8571C6.43809 10.8571 7.28653 10.7675 8.10911 10.6729C8.93162 10.5783 9.59044 9.91972 9.68166 9.09683C9.7724 8.27832 9.85658 7.43416 9.85658 6.57136C9.85658 5.70854 9.7724 4.86439 9.68166 4.04589C9.59044 3.223 8.93162 2.56443 8.10911 2.46983C7.28653 2.37523 6.43809 2.28564 5.57087 2.28564C4.70365 2.28564 3.85521 2.37523 3.03263 2.46983C2.21012 2.56443 1.5513 3.223 1.46008 4.04589C1.36934 4.86439 1.28516 5.70854 1.28516 6.57136C1.28516 7.43416 1.36934 8.27832 1.46008 9.09683Z"
                                  fill={`${theme.shoorah_2}`}
                                />
                                <path
                                  d="M22.5798 8.59413C23.1256 9.6587 22.2964 10.8571 21.1 10.8571H14.843C13.6627 10.8571 12.8328 9.68728 13.3544 8.62847C14.4767 6.35018 15.9148 4.68474 18.0003 2.28564C20.0013 4.67712 21.4223 6.33662 22.5798 8.59413Z"
                                  stroke={`${theme.shoorah_8}`}
                                  strokeWidth="1.71429"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.5719 24.1408C8.17455 24.1408 10.2844 22.0311 10.2844 19.4283C10.2844 16.8257 8.17455 14.7158 5.5719 14.7158C2.96924 14.7158 0.859375 16.8257 0.859375 19.4283C0.859375 22.0311 2.96924 24.1408 5.5719 24.1408Z"
                                  stroke={`${theme.shoorah_8}`}
                                  strokeWidth="1.71429"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M1.46008 9.09683C1.5513 9.91972 2.21012 10.5783 3.03263 10.6729C3.85521 10.7675 4.70365 10.8571 5.57087 10.8571C6.43809 10.8571 7.28653 10.7675 8.10911 10.6729C8.93162 10.5783 9.59044 9.91972 9.68166 9.09683C9.7724 8.27832 9.85658 7.43416 9.85658 6.57136C9.85658 5.70854 9.7724 4.86439 9.68166 4.04589C9.59044 3.223 8.93162 2.56443 8.10911 2.46983C7.28653 2.37523 6.43809 2.28564 5.57087 2.28564C4.70365 2.28564 3.85521 2.37523 3.03263 2.46983C2.21012 2.56443 1.5513 3.223 1.46008 4.04589C1.36934 4.86439 1.28516 5.70854 1.28516 6.57136C1.28516 7.43416 1.36934 8.27832 1.46008 9.09683Z"
                                  stroke={`${theme.shoorah_8}`}
                                  strokeWidth="1.71429"
                                />
                              </g>
                            </g>
                            <defs>
                              <clipPath id="clip0_4687_1971">
                                <rect width="25" height="25" fill="white" />
                              </clipPath>
                              <clipPath id="clip1_4687_1971">
                                <rect
                                  width="24"
                                  height="24"
                                  fill="white"
                                  transform="translate(0 1)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : tab.name == "Restore" ? (
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.7713 11.6865C16.5476 9.57588 13.7155 11.5983 12.0007 13.3131C10.2859 11.5983 7.45386 9.57588 5.23007 11.6865C1.55697 15.1746 8.77 22.1169 12.0007 22.6492C15.2314 22.1169 22.4444 15.1746 18.7713 11.6865Z"
                              fill={`${theme.shoorah_2}`}
                            />
                            <path
                              d="M18.7713 11.6865C16.5476 9.57588 13.7155 11.5983 12.0007 13.3131C10.2859 11.5983 7.45386 9.57588 5.23007 11.6865C1.55697 15.1746 8.77 22.1169 12.0007 22.6492C15.2314 22.1169 22.4444 15.1746 18.7713 11.6865Z"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.79688 19.145L7.58737 18.3545L11.9999 13.3125L16.4124 18.3545L17.2029 19.145"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12.0008 8.14279C13.8944 8.14279 15.4294 6.60776 15.4294 4.71422C15.4294 2.82067 13.8944 1.28564 12.0008 1.28564C10.1073 1.28564 8.57227 2.82067 8.57227 4.71422C8.57227 6.60776 10.1073 8.14279 12.0008 8.14279Z"
                              fill={`${theme.shoorah_2}`}
                            />
                            <path
                              d="M12.0008 8.14279C13.8944 8.14279 15.4294 6.60776 15.4294 4.71422C15.4294 2.82067 13.8944 1.28564 12.0008 1.28564C10.1073 1.28564 8.57227 2.82067 8.57227 4.71422C8.57227 6.60776 10.1073 8.14279 12.0008 8.14279Z"
                              stroke={`${theme.shoorah_8}`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : tab.name == "Shuru" ? (
                          <svg
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 464.67 372.84"
                          >
                            <path
                              d="m35.11,200.95C22.1,73.49,123.41,2,232.33,2s210.24,71.49,197.23,198.95"
                              fill={theme.shoorah_3}
                              stroke-width="0"
                            />
                            <path
                              d="m417.72,213.51c0,92.06-83,157.33-185.38,157.33S46.95,305.57,46.95,213.51,129.95,37.46,232.33,37.46s185.38,83.99,185.38,176.05h0Z"
                              fill="#fff"
                              stroke-width="0"
                            />
                            <path
                              d="m417.72,213.51c0,92.06-83,157.33-185.38,157.33S46.95,305.57,46.95,213.51,129.95,37.46,232.33,37.46s185.38,83.99,185.38,176.05h0Z"
                              fill="none"
                              stroke="#000"
                              stroke-miterlimit="10"
                              stroke-width="4"
                            />
                            <path
                              d="m35.11,200.95C22.1,73.49,123.41,2,232.33,2s210.24,71.49,197.23,198.95"
                              fill="none"
                              stroke="#000"
                              stroke-miterlimit="10"
                              stroke-width="4"
                            />
                            <path
                              d="m232.33,17.41c-126.32,2.61-170.21,97.82-176.05,116.23-6.04,19.06-17.73,73.83,78.11-5.63,0,0-30.88,89.22,70.79,9.01,0,0-1.24,28.21,27.15,28.21s27.15-28.21,27.15-28.21c101.68,80.21,70.79-9.01,70.79-9.01,95.84,79.46,84.15,24.69,78.11,5.63-5.84-18.41-49.73-113.62-176.05-116.23Z"
                              fill={theme.shoorah_2}
                              stroke-width="0"
                            />
                            <path
                              d="m232.33,17.41c-126.32,2.61-170.21,97.82-176.05,116.23-6.04,19.06-17.73,73.83,78.11-5.63,0,0-30.88,89.22,70.79,9.01,0,0-1.24,28.21,27.15,28.21s27.15-28.21,27.15-28.21c101.68,80.21,70.79-9.01,70.79-9.01,95.84,79.46,84.15,24.69,78.11,5.63-5.84-18.41-49.73-113.62-176.05-116.23Z"
                              fill="none"
                              stroke="#000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                            <circle
                              cx="328.02"
                              cy="271.86"
                              r="27.03"
                              fill={theme.shoorah_2}
                              stroke-width="0"
                            />
                            <circle
                              cx="136.65"
                              cy="271.86"
                              r="27.03"
                              fill={theme.shoorah_2}
                              stroke-width="0"
                            />
                            <path
                              d="m18.26,300.87c14.79.48,29.54-.84,44.01-3.93,2.31-.49,3.89-2.9,3.65-5.6-3.88-43.48-7.77-86.96-11.65-130.43-.24-2.7-2.23-4.79-4.59-4.87-14.79-.48-29.54.84-44.01,3.93-2.31.49-3.89,2.9-3.65,5.6,3.88,43.48,7.77,86.96,11.65,130.43.24,2.7,2.23,4.79,4.59,4.87Z"
                              fill={theme.shoorah_3}
                              stroke-width="0"
                            />
                            <path
                              d="m18.26,300.87c14.79.48,29.54-.84,44.01-3.93,2.31-.49,3.89-2.9,3.65-5.6-3.88-43.48-7.77-86.96-11.65-130.43-.24-2.7-2.23-4.79-4.59-4.87-14.79-.48-29.54.84-44.01,3.93-2.31.49-3.89,2.9-3.65,5.6,3.88,43.48,7.77,86.96,11.65,130.43.24,2.7,2.23,4.79,4.59,4.87Z"
                              fill="none"
                              stroke="#000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                            <path
                              d="m446.4,300.87c-14.79.48-29.54-.84-44.01-3.93-2.31-.49-3.89-2.9-3.65-5.6,3.88-43.48,7.77-86.96,11.65-130.43.24-2.7,2.23-4.79,4.59-4.87,14.79-.48,29.54.84,44.01,3.93,2.31.49,3.89,2.9,3.65,5.6-3.88,43.48-7.77,86.96-11.65,130.43-.24,2.7-2.23,4.79-4.59,4.87Z"
                              fill={theme.shoorah_3}
                              stroke-width="0"
                            />
                            <path
                              d="m446.4,300.87c-14.79.48-29.54-.84-44.01-3.93-2.31-.49-3.89-2.9-3.65-5.6,3.88-43.48,7.77-86.96,11.65-130.43.24-2.7,2.23-4.79,4.59-4.87,14.79-.48,29.54.84,44.01,3.93,2.31.49,3.89,2.9,3.65,5.6-3.88,43.48-7.77,86.96-11.65,130.43-.24,2.7-2.23,4.79-4.59,4.87Z"
                              fill="none"
                              stroke="#000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                            <path
                              d="m339.33,236.63c-7.26-34.82-50.28-34.82-57.54,0"
                              fill="none"
                              stroke="#000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                            <path
                              d="m182.88,236.63c-7.26-34.82-50.28-34.82-57.54,0"
                              fill="none"
                              stroke="#000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                            <path
                              d="m283.39,265.56c-22.73,38.43-78.33,38.43-101.06,0"
                              fill="none"
                              stroke="#000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                          </svg>
                        ) : null}

                        <p className="text-[12px]">{tab.name}</p>
                      </>
                    ) : (
                      <>
                        {tab.name == "Home" ? (
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.9994 13.8667C13.5782 13.8667 14.8581 15.1466 14.8581 16.7255V21.9368H9.14062V16.7255C9.14062 15.1466 10.4205 13.8667 11.9994 13.8667Z"
                              fill="white"
                            />
                            <path
                              d="M1.28516 14.5203L10.701 3.59789C11.3849 2.80461 12.614 2.80461 13.2979 3.59789L22.7137 14.5203"
                              stroke={`#9399b1`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.6991 3.5787L4.58235 10.705L4.23296 13.1975C3.91814 15.4435 3.93355 17.7234 4.27874 19.965C4.45342 21.0994 5.42948 21.9366 6.57717 21.9366H17.4226C18.5703 21.9366 19.5465 21.0994 19.7211 19.965C20.0662 17.7234 20.0817 15.4435 19.7669 13.1975L19.4175 10.705L13.3007 3.5787C12.6166 2.7817 11.3832 2.78172 10.6991 3.5787ZM14.8587 16.7253C14.8587 15.1464 13.5788 13.8665 11.9999 13.8665C10.4211 13.8665 9.14119 15.1464 9.14119 16.7253V21.9365H14.8587V16.7253Z"
                              fill={`white`}
                            />
                            <path
                              d="M4.58235 10.705L10.6991 3.57871C11.3832 2.78171 12.6167 2.78171 13.3007 3.57871L19.4176 10.705L19.7669 13.1975C20.0817 15.4435 20.0662 17.7235 19.7212 19.9651C19.5465 21.0995 18.5704 21.9367 17.4226 21.9367H6.57716C5.42948 21.9367 4.45342 21.0995 4.27873 19.9651C3.93356 17.7235 3.91813 15.4435 4.23296 13.1975L4.58235 10.705Z"
                              stroke={`#9399b1`}
                              strokeWidth="1.71429"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.9994 13.8667C13.5782 13.8667 14.8581 15.1466 14.8581 16.7255V21.9368H9.14062V16.7255C9.14062 15.1466 10.4205 13.8667 11.9994 13.8667Z"
                              stroke={`#9399b1`}
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : tab.name == "Journal" ? (
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_4687_10160)">
                              <path
                                d="M1.71854 19.1114C1.90236 20.757 3.21783 22.0718 4.86271 22.2621C6.72137 22.4771 8.64197 22.6891 10.607 22.6891C12.5721 22.6891 14.4927 22.4771 16.3514 22.2621C17.9962 22.0718 19.3118 20.757 19.4955 19.1114C19.7021 17.2615 19.9017 15.3502 19.9017 13.3946C19.9017 11.4391 19.7021 9.52777 19.4955 7.67792C19.3118 6.0323 17.9962 4.71746 16.3514 4.52719C14.4927 4.31219 12.5721 4.1001 10.607 4.1001C8.64197 4.1001 6.72137 4.31219 4.86271 4.52719C3.21783 4.71746 1.90236 6.0323 1.71854 7.67792C1.5119 9.52777 1.3125 11.4391 1.3125 13.3946C1.3125 15.3502 1.5119 17.2615 1.71854 19.1114Z"
                                fill="white"
                              />
                              <path
                                d="M9.2399 4.13184C7.74967 4.19895 6.28798 4.36212 4.86273 4.52698C3.21783 4.71725 1.90236 6.03209 1.71854 7.6777C1.5119 9.52755 1.3125 11.4389 1.3125 13.3944C1.3125 15.35 1.5119 17.2613 1.71854 19.1112C1.90236 20.7567 3.21783 22.0716 4.86271 22.2618C6.72137 22.4768 8.64197 22.689 10.607 22.689C12.5721 22.689 14.4927 22.4768 16.3514 22.2618C17.9962 22.0716 19.3118 20.7569 19.4955 19.1112C19.6442 17.7805 19.789 16.418 19.8586 15.0302"
                                stroke="#9399b1"
                                strokeWidth="1.71429"
                                strokeLinecap="round"
                              />
                              <path
                                d="M17.3296 2.23312L11.0126 9.40083L10.1472 13.4711C10.0079 14.126 10.6906 14.7457 11.3299 14.5447L15.3805 13.2713L21.9052 6.40578C22.9889 5.26549 22.7998 3.35828 21.4881 2.19803C20.207 1.06496 18.3453 1.08067 17.3296 2.23312Z"
                                fill="white"
                              />
                              <path
                                d="M17.3296 2.23312L11.0126 9.40083L10.1472 13.4711C10.0079 14.126 10.6906 14.7457 11.3299 14.5447L15.3805 13.2713L21.9052 6.40578C22.9889 5.26549 22.7998 3.35828 21.4881 2.19803C20.207 1.06496 18.3453 1.08067 17.3296 2.23312Z"
                                stroke="#9399b1"
                                strokeWidth="1.71429"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_4687_10160">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : tab.name == "Pods" ? (
                          <svg
                            id="Layer_1"
                            height="26"
                            width="26"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="m2,38v-12.5c0-6.2,2.3-12.2,6.4-16.6s9.8-6.9,15.6-6.9,11.4,2.5,15.6,6.9,6.4,10.4,6.4,16.6v12.5"
                              fill="none"
                              stroke="#999db3"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                            <path
                              d="m13,28H2v14c0,2.2,1.8,4,4,4h7v-18Z"
                              fill="none"
                              stroke="#999db3"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                            <path
                              d="m35,28h11v14c0,2.2-1.8,4-4,4h-7v-18Z"
                              fill="none"
                              stroke="#999db3"
                              stroke-linejoin="round"
                              stroke-width="4"
                            />
                          </svg>
                        ) : tab.name == "Explore" ? (
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_4687_1971)">
                              <g clipPath="url(#clip1_4687_1971)">
                                <path
                                  d="M22.2863 23.7144H13.7148"
                                  stroke="#9399b1"
                                  strokeWidth="1.71429"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13.7148 15.1426H22.2863"
                                  stroke="#9399b1"
                                  strokeWidth="1.71429"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13.7148 19.4287H22.2863"
                                  stroke="#9399b1"
                                  strokeWidth="1.71429"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M22.5798 8.59413C23.1256 9.6587 22.2964 10.8571 21.1 10.8571H14.843C13.6627 10.8571 12.8328 9.68728 13.3544 8.62847C14.4767 6.35018 15.9148 4.68474 18.0003 2.28564C20.0013 4.67712 21.4223 6.33662 22.5798 8.59413Z"
                                  fill="white"
                                />
                                <path
                                  d="M5.5719 24.1408C8.17455 24.1408 10.2844 22.0311 10.2844 19.4283C10.2844 16.8257 8.17455 14.7158 5.5719 14.7158C2.96924 14.7158 0.859375 16.8257 0.859375 19.4283C0.859375 22.0311 2.96924 24.1408 5.5719 24.1408Z"
                                  fill="white"
                                />
                                <path
                                  d="M1.46008 9.09683C1.5513 9.91972 2.21012 10.5783 3.03263 10.6729C3.85521 10.7675 4.70365 10.8571 5.57087 10.8571C6.43809 10.8571 7.28653 10.7675 8.10911 10.6729C8.93162 10.5783 9.59044 9.91972 9.68166 9.09683C9.7724 8.27832 9.85658 7.43416 9.85658 6.57136C9.85658 5.70854 9.7724 4.86439 9.68166 4.04589C9.59044 3.223 8.93162 2.56443 8.10911 2.46983C7.28653 2.37523 6.43809 2.28564 5.57087 2.28564C4.70365 2.28564 3.85521 2.37523 3.03263 2.46983C2.21012 2.56443 1.5513 3.223 1.46008 4.04589C1.36934 4.86439 1.28516 5.70854 1.28516 6.57136C1.28516 7.43416 1.36934 8.27832 1.46008 9.09683Z"
                                  fill="white"
                                />
                                <path
                                  d="M22.5798 8.59413C23.1256 9.6587 22.2964 10.8571 21.1 10.8571H14.843C13.6627 10.8571 12.8328 9.68728 13.3544 8.62847C14.4767 6.35018 15.9148 4.68474 18.0003 2.28564C20.0013 4.67712 21.4223 6.33662 22.5798 8.59413Z"
                                  stroke="#9399b1"
                                  strokeWidth="1.71429"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.5719 24.1408C8.17455 24.1408 10.2844 22.0311 10.2844 19.4283C10.2844 16.8257 8.17455 14.7158 5.5719 14.7158C2.96924 14.7158 0.859375 16.8257 0.859375 19.4283C0.859375 22.0311 2.96924 24.1408 5.5719 24.1408Z"
                                  stroke="#9399b1"
                                  strokeWidth="1.71429"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M1.46008 9.09683C1.5513 9.91972 2.21012 10.5783 3.03263 10.6729C3.85521 10.7675 4.70365 10.8571 5.57087 10.8571C6.43809 10.8571 7.28653 10.7675 8.10911 10.6729C8.93162 10.5783 9.59044 9.91972 9.68166 9.09683C9.7724 8.27832 9.85658 7.43416 9.85658 6.57136C9.85658 5.70854 9.7724 4.86439 9.68166 4.04589C9.59044 3.223 8.93162 2.56443 8.10911 2.46983C7.28653 2.37523 6.43809 2.28564 5.57087 2.28564C4.70365 2.28564 3.85521 2.37523 3.03263 2.46983C2.21012 2.56443 1.5513 3.223 1.46008 4.04589C1.36934 4.86439 1.28516 5.70854 1.28516 6.57136C1.28516 7.43416 1.36934 8.27832 1.46008 9.09683Z"
                                  stroke="#9399b1"
                                  strokeWidth="1.71429"
                                />
                              </g>
                            </g>
                            <defs>
                              <clipPath id="clip0_4687_1971">
                                <rect width="25" height="25" fill="white" />
                              </clipPath>
                              <clipPath id="clip1_4687_1971">
                                <rect
                                  width="24"
                                  height="24"
                                  fill="white"
                                  transform="translate(0 1)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : tab.name == "Restore" ? (
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.7713 11.6865C16.5476 9.57588 13.7155 11.5983 12.0007 13.3131C10.2859 11.5983 7.45386 9.57588 5.23007 11.6865C1.55697 15.1746 8.77 22.1169 12.0007 22.6492C15.2314 22.1169 22.4444 15.1746 18.7713 11.6865Z"
                              fill="white"
                            />
                            <path
                              d="M18.7713 11.6865C16.5476 9.57588 13.7155 11.5983 12.0007 13.3131C10.2859 11.5983 7.45386 9.57588 5.23007 11.6865C1.55697 15.1746 8.77 22.1169 12.0007 22.6492C15.2314 22.1169 22.4444 15.1746 18.7713 11.6865Z"
                              stroke="#9399b1"
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.79688 19.145L7.58737 18.3545L11.9999 13.3125L16.4124 18.3545L17.2029 19.145"
                              stroke="#9399b1"
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12.0008 8.14279C13.8944 8.14279 15.4294 6.60776 15.4294 4.71422C15.4294 2.82067 13.8944 1.28564 12.0008 1.28564C10.1073 1.28564 8.57227 2.82067 8.57227 4.71422C8.57227 6.60776 10.1073 8.14279 12.0008 8.14279Z"
                              fill="white"
                            />
                            <path
                              d="M12.0008 8.14279C13.8944 8.14279 15.4294 6.60776 15.4294 4.71422C15.4294 2.82067 13.8944 1.28564 12.0008 1.28564C10.1073 1.28564 8.57227 2.82067 8.57227 4.71422C8.57227 6.60776 10.1073 8.14279 12.0008 8.14279Z"
                              stroke="#9399b1"
                              strokeWidth="1.71429"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : tab.name == "Shuru" ? (
                          <svg
                            id="Layer_1"
                            height="2rem"
                            width="2rem"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 477.15 396.7"
                          >
                            <path
                              d="m41.12,218.3C28.12,90.9,129.42,19.4,238.32,19.4s210.2,71.5,197.2,198.9"
                              fill="#fff"
                              strokeWidth="0"
                            />
                            <path
                              d="m423.72,230.9c0,92.1-83,157.3-185.4,157.3S53.02,323,53.02,230.9,136.02,54.9,238.42,54.9s185.3,83.9,185.3,176h0Z"
                              fill="#fff"
                              strokeWidth="0"
                            />
                            <path
                              d="m423.72,230.9c0,92.1-83,157.3-185.4,157.3S53.02,323,53.02,230.9,136.02,54.9,238.42,54.9s185.3,83.9,185.3,176h0Z"
                              fill="none"
                              stroke="#999db3"
                              strokeMiterlimit="10"
                              strokeWidth="17"
                            />
                            <path
                              d="m32.22,207.4C19.22,80,129.42,8.5,238.32,8.5s220.3,71.5,207.3,198.9"
                              fill="none"
                              stroke="#999db3"
                              strokeMiterlimit="10"
                              strokeWidth="17"
                            />
                            <path
                              d="m238.32,34.8c-126.3,2.6-170.2,97.8-176,116.2-6,19.1-17.7,73.8,78.1-5.6,0,0-30.9,89.2,70.8,9,0,0-1.2,28.2,27.1,28.2s27.1-28.2,27.1-28.2c101.7,80.2,70.8-9,70.8-9,95.8,79.5,84.1,24.7,78.1,5.6-5.8-18.4-49.7-113.6-176-116.2h0Z"
                              fill="#fff"
                              strokeWidth="0"
                            />
                            <path
                              d="m238.32,34.8c-126.3,2.6-170.2,97.8-176,116.2-6,19.1-17.7,73.8,78.1-5.6,0,0-30.9,89.2,70.8,9,0,0-1.2,28.2,27.1,28.2s27.1-28.2,27.1-28.2c101.7,80.2,70.8-9,70.8-9,95.8,79.5,84.1,24.7,78.1,5.6-5.8-18.4-49.7-113.6-176-116.2h0Z"
                              fill="none"
                              stroke="#999db3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="17"
                            />
                            <path
                              d="m25.32,323.3c14.8.5,29.5-.8,44-3.9,2.3-.5,3.9-2.9,3.7-5.6-3.9-43.5-7.8-87-11.7-130.4-.2-2.7-2.2-4.8-4.6-4.9-14.8-.5-29.5.8-44,3.9-2.3.5-3.9,2.9-3.7,5.6,3.9,43.5,7.8,87,11.6,130.4.3,2.7,2.3,4.8,4.7,4.9Z"
                              fill="#fff"
                              strokeWidth="0"
                            />
                            <path
                              d="m25.32,323.3c14.8.5,29.5-.8,44-3.9,2.3-.5,3.9-2.9,3.7-5.6-3.9-43.5-7.8-87-11.7-130.4-.2-2.7-2.2-4.8-4.6-4.9-14.8-.5-29.5.8-44,3.9-2.3.5-3.9,2.9-3.7,5.6,3.9,43.5,7.8,87,11.6,130.4.3,2.7,2.3,4.8,4.7,4.9Z"
                              fill="none"
                              stroke="#999db3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="18"
                            />
                            <path
                              d="m452.42,323.3c-14.8.5-29.5-.8-44-3.9-2.3-.5-3.9-2.9-3.6-5.6,3.9-43.5,7.8-87,11.6-130.4.2-2.7,2.2-4.8,4.6-4.9,14.8-.5,29.5.8,44,3.9,2.3.5,3.9,2.9,3.6,5.6-3.9,43.5-7.8,87-11.6,130.4-.2,2.7-2.2,4.8-4.6,4.9Z"
                              fill="#fff"
                              strokeWidth="0"
                            />
                            <path
                              d="m452.42,323.3c-14.8.5-29.5-.8-44-3.9-2.3-.5-3.9-2.9-3.6-5.6,3.9-43.5,7.8-87,11.6-130.4.2-2.7,2.2-4.8,4.6-4.9,14.8-.5,29.5.8,44,3.9,2.3.5,3.9,2.9,3.6,5.6-3.9,43.5-7.8,87-11.6,130.4-.2,2.7-2.2,4.8-4.6,4.9Z"
                              fill="none"
                              stroke="#999db3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="17"
                            />
                            <path
                              d="m345.32,254c-7.3-34.8-50.3-34.8-57.5,0"
                              fill="none"
                              stroke="#999db3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="18"
                            />
                            <path
                              d="m188.92,254c-7.3-34.8-50.3-34.8-57.5,0"
                              fill="none"
                              stroke="#999db3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="18"
                            />
                            <path
                              d="m289.42,283c-22.7,38.4-78.3,38.4-101.1,0"
                              fill="none"
                              stroke="#999db3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="18"
                            />
                          </svg>
                        ) : null}

                        <p
                          className={`text-[12px] ${theme.shoorah_inactive_icons}`}
                        >
                          {tab.name}
                        </p>
                      </>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
