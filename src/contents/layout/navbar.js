import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import logo from "../../assets/images/shoorahLogoLarge.png";
import { Menu, Transition } from "@headlessui/react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SidebarContext } from "../../context/SidebarContext";
import {
  cleanLocalStorage,
  errorToast,
  getDeviceToken,
  getLocalStorageItem,
} from "../../utils/helper";
import { Api } from "../../api";
import { useTheme } from "../context/themeContext";
import { useAuth } from "../context/user";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ user }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const { theme } = useTheme();
  const sidebarRef = useRef(null);
  let [userData, setUserData] = useState();

  const handleLogout = async () => {
    cleanLocalStorage();
    history.push("/login");
  };

  const handleClick = () => {
    setShow(!show);
  };

  const handleDocumentClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div className="flex h-[4.5rem] sm:h-[6rem] w-screen items-center bg-white">
      <div className="flex w-full justify-between px-[0.5rem] lg:pb-[1rem] lg:pt-[1rem] xl:justify-between">
        {/* Mobile View Hamburger */}
        {/* <div className="mt-2 flex xl:hidden">
          <div onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-list "
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
          <Transition
            show={show}
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <nav
              ref={sidebarRef}
              id="sidenav-1"
              className={`absolute left-0 top-0 z-[1035] h-full w-[50vw] py-[5vh] ${theme.shoorah_text_4} ${theme.sidebarBg} -translate-x-full overflow-hidden bg-[#fff] shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0`}
              data-te-sidenav-init
              data-te-sidenav-hidden="false"
              data-te-sidenav-position="absolute"
            >
              <ul
                className="relative m-0 list-none px-[0.2rem]"
                data-te-sidenav-menu-ref
              >
                <li className="relative">
                  <a
                    href="/home"
                    className="mb-4 flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:text-inherit focus:outline-none active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none"
                    data-te-sidenav-link-ref
                  >
                    <span>
                      <img src={logo} className="w-[20rem]" />
                    </span>
                  </a>
                </li>
                <li className="relative">
                  <a
                    href="/home"
                    className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[1rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none"
                    data-te-sidenav-link-ref
                  >
                    <span>Home</span>
                  </a>
                </li>
                <li className="relative">
                  <a
                    href="/account"
                    className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[1rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none"
                    data-te-sidenav-link-ref
                  >
                    <span>My Account</span>
                  </a>
                </li>
              </ul>
            </nav>
          </Transition>
        </div> */}
        <div
          onClick={() => history.push("/home")}
          className="flex cursor-pointer items-center justify-center"
        >
          <img src={logo} className=" ml-2 w-[10rem] md:w-[14rem] py-2 xl:px-2 xl:py-5" />
        </div>

        {/* Web View */}
        <div className="hidden items-center justify-center px-3 sm:gap-10 lg:gap-10 xl:flex">
          <div className="mr-7 flex gap-14">
            <a
              onClick={() => history.push("/home")}
              className="cursor-pointer text-lg"
            >
              Home
            </a>
            <a
              onClick={() => history.push("/account")}
              className="cursor-pointer text-lg "
            >
              My account
            </a>
          </div>
          <div
            onClick={() => history.push("/me")}
            className={` relative cursor-pointer overflow-hidden rounded-full ${theme.shoorah_bg_4}  flex h-[4rem] w-[4rem] items-center justify-center`}
          >
            <Menu as="div">
              <div
                className="flex cursor-pointer"
                onClick={() => history.push("/me")}
              >
                <Menu.Button className="w-full justify-center rounded-full text-sm font-medium text-gray-700 focus:outline-none">
                  <div className="h-full w-full rounded-full text-lg text-white">
                    <img src={theme.shuruMe} className="full w-full" />
                  </div>
                </Menu.Button>
              </div>
            </Menu>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:gap-15 items-center justify-center sm:gap-10 xl:hidden">
          <div
            onClick={() => history.push("/me")}
            className={`relative cursor-pointer rounded-full ${theme.shoorah_bg_4} flex h-[2.5rem] w-[2.5rem] items-center justify-center outline-none`}
          >
            <Menu as="div">
              <div className="flex">
                <Menu.Button className="w-full justify-center rounded-full text-sm font-medium text-gray-700 focus:outline-none">
                  <div className="h-full w-full rounded-full text-lg text-white">
                    <img src={theme.shuruMe} className="full w-full" />
                  </div>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-[-15px] top-[60px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-shoorah-primary ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/change-password"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm",
                          )}
                        >
                          Change Password
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm",
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      {/* <div className="w-fit border border-[#e0e0e0]"></div> */}
    </div>
  );
};

export default Navbar;
