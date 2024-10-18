import { Transition } from "@headlessui/react";
import { Menu } from "antd";
import React, { Fragment } from "react";
import { useTheme } from "../context/themeContext";

const SeletModal = ({ show, setShow }) => {
  const { theme } = useTheme();
  return (
    <div className={`z-40 flex items-center justify-between px-4 py-2`}>
      <div className="flex">
        <Menu as="div">
          <div className="flex">
            <Menu.Button className="absolute bottom-[2rem]  right-[2rem] z-20 cursor-pointer text-white hover:scale-110">
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.2"
                  viewBox="0 0 44 42"
                  width="44"
                  height="42"
                >
                  <defs>
                    <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
                      <path d="m-999-838h1125v2250h-1125z" />
                    </clipPath>
                    <image
                      width="44"
                      height="42"
                      id="img1"
                      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAqCAMAAAD/A0kuAAAAAXNSR0IB2cksfwAAAchQTFRF////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////IqesbAAAAJh0Uk5TAC5sh5B+TxEBY93/+qsvD7nlnXh0jMj+jgbJ7mEEHZT8w+QkOujBBemIQ/uplT3rAgPtKEu4TgrQOb4T/RUrdcctH/BXHNm839XPOEb2tlSomNau50iFztQjlmUSUdyNplZTVfLXDbSXhLHvHvE/ZPMXzeog9UTguyXjqnKJXTHL7Ae/Mp5Ksgl2paQMkwj3owtYxMxMDossepdHAAAB70lEQVR4nI3V+zsUURgH8Fcqq++wKnZbrJa1sim7KlacIbely6qwGyqpUIqU5NaFbsitovLvdnayTDNnxnl/OHPO+3yemXMfIrtIO5R++MjRDFvzLxyZx6CFkpV9kHXmAMdPnMzNc7nhPuWxt/koKPRq1aLTPhQ77W2Jf69VGkDZGUlL5C9HUNYSnUWFX9YSncN5aUuVCIVlLVVdwEVZS+TCJWlL1agxpiJWlmpx2WjrrGw9g2qyoQahpUZcMdsmsW1uQausbYui3SFp/R24qkrapgCuydrrLYbtbGNvxNAZkbQ3FdzySNpMhttV+oTaZWlzgfT/5oy6gZ640CaARkPqTvJ26O0z0XA/2F1D7h5j9wcA9sCQ9wxCeWh8wSPkEz0eAoZH9OnIE8TMnXuKUV56nwHPx/azzjKMl5pHMYAX2nOC4eWrVFKdxOs0s53Cm91Jn/YhsDunfJvNiE7BBDpT1Ro3ZrXK3Dy62gSW3uLdXv098IE/FkJYVEU2/BG6vkUR+0SV4/gsvjW/oFy3nlMMX5diWF4RWvqGVX1zEEzBmldsaRaF+431eD9f+Q2Hhd38jqIUDLp8yV3yw4LyM4MoLyPTCQ36XMH4T0vLx1ewNbqtcMg4XLeGyXBsJ7/MfuX9tvvFpOJPYnlHChL9Bd/oVVdokpHwAAAAAElFTkSuQmCC"
                    />
                  </defs>
                  <style />
                  <g clip-path="url(#cp1)">
                    <use href="#img1" x="0" y="0" />
                  </g>
                </svg>
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            show={show}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              style={{
                borderRadius: "3rem 1rem 3rem 3rem",
                boxShadow:
                  "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
              }}
              className="absolute bottom-[-20rem] right-[2.5rem] z-30 h-[20rem] w-[30rem] origin-top-right bg-white ring-1 ring-shoorah-primary ring-opacity-5 focus:outline-none"
            >
              <div className="z-30 flex h-full w-full flex-col justify-evenly px-[2rem]">
                <span
                  onClick={() => {
                    setShow(false);
                  }}
                  className="absolute right-[2rem] top-[1rem] z-10 cursor-pointer text-[red] hover:scale-110"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 18 22"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.5172 11.7795L16.26 11.8829L15.5172 11.7795ZM15.2549 13.6645L15.9977 13.7679L15.2549 13.6645ZM2.74514 13.6645L3.48798 13.5611L2.74514 13.6645ZM2.4828 11.7795L1.73996 11.8829L2.4828 11.7795ZM6.18365 20.7368L5.89206 21.4278L6.18365 20.7368ZM3.47508 17.5603L4.17907 17.3017L3.47508 17.5603ZM14.5249 17.5603L15.2289 17.819V17.819L14.5249 17.5603ZM11.8164 20.7368L11.5248 20.0458H11.5248L11.8164 20.7368ZM2.74664 7.92906C2.70746 7.5167 2.34142 7.21418 1.92906 7.25336C1.5167 7.29254 1.21418 7.65858 1.25336 8.07094L2.74664 7.92906ZM16.7466 8.07094C16.7858 7.65858 16.4833 7.29254 16.0709 7.25336C15.6586 7.21418 15.2925 7.5167 15.2534 7.92906L16.7466 8.07094ZM17 6.75C17.4142 6.75 17.75 6.41421 17.75 6C17.75 5.58579 17.4142 5.25 17 5.25V6.75ZM1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM13 6V6.75H13.75V6H13ZM5 6H4.25V6.75H5V6ZM14.7744 11.6761L14.512 13.5611L15.9977 13.7679L16.26 11.8829L14.7744 11.6761ZM3.48798 13.5611L3.22564 11.6761L1.73996 11.8829L2.0023 13.7679L3.48798 13.5611ZM9 20.25C7.47083 20.25 6.92544 20.2358 6.47524 20.0458L5.89206 21.4278C6.68914 21.7642 7.60558 21.75 9 21.75V20.25ZM2.0023 13.7679C2.282 15.7777 2.43406 16.9017 2.77109 17.819L4.17907 17.3017C3.91156 16.5736 3.77851 15.6488 3.48798 13.5611L2.0023 13.7679ZM6.47524 20.0458C5.55279 19.6566 4.69496 18.7058 4.17907 17.3017L2.77109 17.819C3.3857 19.4918 4.48205 20.8328 5.89206 21.4278L6.47524 20.0458ZM14.512 13.5611C14.2215 15.6488 14.0884 16.5736 13.8209 17.3017L15.2289 17.819C15.5659 16.9017 15.718 15.7777 15.9977 13.7679L14.512 13.5611ZM9 21.75C10.3944 21.75 11.3109 21.7642 12.1079 21.4278L11.5248 20.0458C11.0746 20.2358 10.5292 20.25 9 20.25V21.75ZM13.8209 17.3017C13.305 18.7058 12.4472 19.6566 11.5248 20.0458L12.1079 21.4278C13.5179 20.8328 14.6143 19.4918 15.2289 17.819L13.8209 17.3017ZM3.22564 11.6761C3.00352 10.08 2.83766 8.88703 2.74664 7.92906L1.25336 8.07094C1.34819 9.06897 1.51961 10.2995 1.73996 11.8829L3.22564 11.6761ZM16.26 11.8829C16.4804 10.2995 16.6518 9.06896 16.7466 8.07094L15.2534 7.92906C15.1623 8.88702 14.9965 10.08 14.7744 11.6761L16.26 11.8829ZM17 5.25H1V6.75H17V5.25ZM12.25 5V6H13.75V5H12.25ZM13 5.25H5V6.75H13V5.25ZM5.75 6V5H4.25V6H5.75ZM9 1.75C10.7949 1.75 12.25 3.20507 12.25 5H13.75C13.75 2.37665 11.6234 0.25 9 0.25V1.75ZM9 0.25C6.37665 0.25 4.25 2.37665 4.25 5H5.75C5.75 3.20507 7.20507 1.75 9 1.75V0.25Z" />
                  </svg>
                </span>

                <p className="P22Mackinac mt-[1.5rem] text-2xl">
                  Edit Custom Affirmation
                </p>
                <form className="z-30 mt-[1rem] w-full">
                  <input
                    id="title"
                    name="title"
                    maxLength={100}
                    type="text"
                    onKeyDown={(e) => {
                      // e.preventDefault();
                      e.stopPropagation();
                    }}
                    placeholder="Enter your own Affirmation..."
                    className={`P22Mackinac placeholder:P22Mackinac relative block w-[100%] resize-none appearance-none py-5 pl-2 text-lg placeholder-[#000] placeholder:text-lg placeholder:font-[500] placeholder:tracking-wider ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5}`}
                  />
                  <div className=" z-30 mt-1 mt-[3rem] flex w-[100%] w-full flex-col justify-around gap-10 xl:flex-row  ">
                    <button
                      className={`w-[50%] cursor-pointer border border-transparent bg-[#fff] ${theme.shoorah_bg_hover_6}  P22Mackinac rounded-[3rem] py-3 text-xl font-medium text-[#000] shadow-sm hover:text-white  focus:outline-none ${theme.shoorah_border_5} `}
                    >
                      Draft
                    </button>
                    <button
                      type="submit"
                      name="submit"
                      className={`w-[50%] cursor-pointer border border-transparent ${theme.shoorah_bg_5} ${theme.shoorah_bg_hover_6} P22Mackinac rounded-[3rem] py-3 text-xl font-medium text-white shadow-sm  focus:outline-none focus:ring-2 ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default SeletModal;
