import React, { Fragment, useEffect, useRef, useState } from "react";
import { Api } from "../../api";
import {
  errorToast,
  getFileType,
  successToast,
} from "../../utils/helper";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { debounce } from "lodash";
import AddVali from "../../validation/AddGratitudeValidation";
import axios from "axios";
import Hero from "../reusable/hero";
import Navbar from "../layout/navbar";
import SideMenu from "../layout/sideMenu";
import Loader from "../../component/common/Loader";
import WordLimit from "../reusable/wordCounts";
import { useTheme } from "../context/themeContext";
import moment from "moment/moment";
import { useAudio } from "../context/audiobar";
import { Dialog, Transition } from "@headlessui/react";

export default function EditGoal() {
  const location = useLocation();
  let goal = location.state;
  const [text, setText] = useState(goal?.description);
  const [title, setTitle] = useState(goal?.title);
  const [preview, setPreview] = useState(goal?.imageUrl);
  const [goalduedate, setGoalduedate] = useState(
    goal?.dueDate ? goal.dueDate.slice(0, 10) : "",
  );
  const [isCompleted, setIsCompleted] = useState(goal?.isCompleted);
  const [image, setImage] = useState();
  const { theme } = useTheme();
  const history = useHistory();
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const { audioNav } = useAudio();
  const [checklist, setChecklist] = useState(goal?.checklist || []);
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const [itemCount, setItemCount] = useState(checklist[checklist.length - 1]?.id + 1);
  const [checklistItem, setChecklistItem] = useState({ id: itemCount, title: "", isCompleted: false });


  const debouncedDescription = debounce(async (value) => {
    setText(value);
  }, 10);

  const debouncedTitle = debounce(async (value) => {
    setTitle(value);
  }, 10);

  const handleTextArea = (e) => {
    setText(e.target.value);
    debouncedDescription(e.target.value);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    debouncedTitle(e.target.value);
  };

  const handleImageChange = (event) => {
    if (!event?.target?.files[0].name.match(/\.(jpg|jpeg|png)$/i)) {
      errorToast(
        `The specified file ${event?.target?.files[0].name} could not be uploaded. Please upload JPG, JPEG, PNG image.`,
      );
    } else if (event?.target?.files[0]?.size > 25500000) {
      errorToast(`File size should be less than 1MB`);
    } else {
      const file = event.target.files[0];
      if (file) {
        setImage(file);
        const objectUrl = URL.createObjectURL(event.target.files[0]);
        setPreview(objectUrl);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const form = {
      title: title,
      description: text,
      imageType: image ? getFileType(image) : null,
      dueDate: goalduedate,
    };
    const { isValid, errors } = AddVali(form);
    if (isValid) {
      setLoader(true);

      const payload = {
        goalId: goal.goalId,
        title: title,
        imageUrl: image ? getFileType(image) : "",
        isSaved: true,
        description: text,
        dueDate: goalduedate,
        isCompleted: isCompleted,
        isImageDeleted: !preview ? true : false,
        checklist: checklist
      };
      Api.addGoal(payload).then((res) => {
        if (res.status == 200) {
          if (res?.data?.meta?.uploadURL) {
            axios
              .put(res?.data?.meta?.uploadURL, image, {
                headers: {
                  "content-type": `${image?.type?.split("/")[0]}/${image?.name?.split(".")[1]
                    }`,
                },
              })
              .then((res) => {
                if (res.status == 200) {
                  setLoader(false);
                  setImage(null);
                  setPreview(null);
                  setText("");
                  setTitle("");
                  successToast("Goal is updated successfully !");
                  history.replace("/journal/goals");
                }
              })
              .catch((err) => {
                setLoader(false);
                setImage(null);
                setText("");
                setPreview(null);
                setTitle("");
                errorToast("Something went wrong with image upload !");
              });
          } else {
            if (res?.data?.meta?.code == 1) {
              setLoader(false);
              setImage(null);
              setText("");
              setPreview(null);
              setTitle("");
              successToast(res?.data?.meta?.message);
              history.replace("/journal/goals");
            } else {
              setLoader(false);
              setImage(null);
              setText("");
              setPreview(null);
              setTitle("");
              errorToast(res?.data?.meta?.message);
            }
          }
        }
      });
    }
    setError(errors);
    setLoader(false);
  };

  const handleClick = async () => {
    setText("");
    setImage(null);
    setPreview(null);
    setTitle("");
  };

  const handleDraft = async (e) => {
    e.preventDefault();
    setLoader(true);
    const form = {
      title: title,
      description: text,
      imageType: image ? getFileType(image) : null,
    };
    const { isValid, errors } = AddVali(form);
    if (isValid) {
      setLoader(true);

      const payload = {
        goalId: goal.goalId,
        title: title,
        imageUrl: image ? getFileType(image) : "",
        isSaved: false,
        dueDate: goalduedate,
        description: text,
        isCompleted: isCompleted,
        isImageDeleted: !preview ? true : false,
        checklist: checklist

      };

      Api.addGoal(payload).then((res) => {
        if (res.status == 200) {
          if (res?.data?.meta?.uploadURL) {
            axios
              .put(res?.data?.meta?.uploadURL, image, {
                headers: {
                  "content-type": `${image?.type?.split("/")[0]}/${image?.name?.split(".")[1]
                    }`,
                },
              })
              .then((res) => {
                if (res.status == 200) {
                  setLoader(false);
                  setImage(null);
                  setPreview(null);
                  setText("");
                  setTitle("");
                  successToast("Draft added successfully !");
                  history.replace("/journal/goals");
                }
              })
              .catch((err) => {
                setLoader(false);
                setImage(null);
                setText("");
                setPreview(null);
                setTitle("");
                errorToast("Something went wrong with image upload !");
              });
          } else {
            if (res?.data?.meta?.code == 1) {
              setLoader(false);
              setImage(null);
              setText("");
              setPreview(null);
              setTitle("");
              successToast(res?.data?.meta?.message);
              history.replace("/journal/goals");
            } else {
              setLoader(false);
              setImage(null);
              setText("");
              setPreview(null);
              setTitle("");
              errorToast(res?.data?.meta?.message);
            }
          }
        }
      });
    }
    setError(errors);
    setLoader(false);
  };

  const handleChecklistItemUpdate = (index) => {
    setChecklist((prevChecklist) => {
      if (index >= 0 && index < prevChecklist.length) {
        const newArray = [...prevChecklist];
        newArray[index].isCompleted = !newArray[index].isCompleted;
        return newArray;
      } else {
        console.error('Invalid index');
        return prevChecklist;
      }
    });
  };

  // useEffect(() => {
  //   if (isCompleted == true) {
  //     setOpen(true);
  //   } else {
  //     setOpen(false);
  //   }
  // }, [isCompleted]);

  const handleChecklist = async (e) => {
    e.preventDefault();
    if (checklistItem.title.trim() === '') {
      // Prevent adding empty checklist items
      return;
    }
    setChecklist((prevChecklist) => [...prevChecklist, checklistItem]);
    setItemCount(itemCount + 1);

    // Clear the input field
    setChecklistItem({ title: '', isCompleted: false, id: itemCount });
  }

  return (
    <div className={`w-full ${audioNav && `mb-[2rem]`} pb-[13vh] lg:pb-0`}>
      <Navbar />
      <Hero hideInfo={true} heading={`Edit Goal`} />
      <SideMenu />
      {loader && <Loader />}
      <div className="mx-auto w-full px-4 xl:w-[65%] xl:px-0">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="pt-[4rem] lg:py-[6rem]">
              <div className="flex flex-col justify-around gap-3">
                <div className="flex flex-col justify-around gap-5 sm:flex-row">
                  <div
                    className={`${!preview &&
                      `border-[3px] border-dashed ${theme.shoorah_border_5} ${theme.shoorah_bg_2}`
                      } relative flex h-36 w-36 cursor-pointer items-center justify-center gap-4 rounded-[2rem] xl:h-[12rem] xl:w-[16rem]`}
                  >
                    {!preview && (
                      <p className="absolute left-[10px] top-[-2.5rem] text-xl">
                        Add Image
                      </p>
                    )}
                    {!preview && (
                      <div
                        onClick={() => {
                          document.getElementById("file").click();
                        }}
                        className="flex h-[100%] w-[100%] items-center justify-center"
                      >
                        <label className="cursor-pointer">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="80"
                            height="80"
                            fill="currentColor"
                            className={`bi bi-plus-lg mx-auto ${theme.shoorah_text_5}`}
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                            />
                          </svg>
                        </label>
                        <input
                          type="file"
                          id="file"
                          className="hidden"
                          name="image"
                          accept="image/jpeg,image/jpg,image/png"
                          multiple={false}
                          data-original-title="upload photos"
                          onChange={handleImageChange}
                        />
                      </div>
                    )}
                    {preview && (
                      <div className="relative h-full w-full">
                        <img
                          src={preview}
                          className="h-[100%] w-[100%] rounded-3xl object-cover"
                        />
                        <div
                          onClick={() => {
                            setImage(null);
                            setPreview(null);
                          }}
                          className={`absolute right-[-0.5rem] top-0 ${theme.shoorah_text_5}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-x-circle-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex w-full flex-col gap-2 self-end">
                    <label htmlFor="title" className="mt-2 text-base lg:text-xl ">
                      Title
                    </label>
                    {/* <span className='absolute  pl-10 z-10 h-5 w-5'><img src={titleLogo} /></span> */}
                    <div className="relative w-full">
                      <div className="pointer-events-none absolute left-[-1.5rem] top-1/2 z-10 flex -translate-y-1/2 items-center pl-12 xl:top-[1.3rem] xl:translate-y-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z"
                            stroke={theme.shoorah_7}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.1248 12.8101H11.7373"
                            stroke={theme.shoorah_7}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.7275 12.8101H4.875"
                            stroke={theme.shoorah_7}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.125 9.99023H8.97754"
                            stroke={theme.shoorah_7}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.9525 9.99023H4.875"
                            stroke={theme.shoorah_7}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <input
                        id="title"
                        name="title"
                        value={title}
                        maxLength={50}
                        type="text"
                        onChange={handleChange}
                        placeholder="Enter Title..."
                        style={{
                          boxShadow:
                            "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                        }}
                        className={`P22Mackinac placeholder:P22Mackinac relative block w-[100%] appearance-none rounded-[3rem] border border-gray-300 px-4 py-2 pl-16 text-base placeholder-[#000] placeholder:text-lg placeholder:font-[500] placeholder:tracking-wider xl:py-5 xl:text-lg ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5}`}
                      />
                    </div>

                    <span
                      onClick={handleClick}
                      className="absolute right-[5px] top-[0.5rem] cursor-pointer text-black hover:scale-110"
                    >
                      {" "}
                      <svg
                        width="26"
                        height="20"
                        viewBox="0 0 18 22"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.5172 11.7795L16.26 11.8829L15.5172 11.7795ZM15.2549 13.6645L15.9977 13.7679L15.2549 13.6645ZM2.74514 13.6645L3.48798 13.5611L2.74514 13.6645ZM2.4828 11.7795L1.73996 11.8829L2.4828 11.7795ZM6.18365 20.7368L5.89206 21.4278L6.18365 20.7368ZM3.47508 17.5603L4.17907 17.3017L3.47508 17.5603ZM14.5249 17.5603L15.2289 17.819V17.819L14.5249 17.5603ZM11.8164 20.7368L11.5248 20.0458H11.5248L11.8164 20.7368ZM2.74664 7.92906C2.70746 7.5167 2.34142 7.21418 1.92906 7.25336C1.5167 7.29254 1.21418 7.65858 1.25336 8.07094L2.74664 7.92906ZM16.7466 8.07094C16.7858 7.65858 16.4833 7.29254 16.0709 7.25336C15.6586 7.21418 15.2925 7.5167 15.2534 7.92906L16.7466 8.07094ZM17 6.75C17.4142 6.75 17.75 6.41421 17.75 6C17.75 5.58579 17.4142 5.25 17 5.25V6.75ZM1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM13 6V6.75H13.75V6H13ZM5 6H4.25V6.75H5V6ZM14.7744 11.6761L14.512 13.5611L15.9977 13.7679L16.26 11.8829L14.7744 11.6761ZM3.48798 13.5611L3.22564 11.6761L1.73996 11.8829L2.0023 13.7679L3.48798 13.5611ZM9 20.25C7.47083 20.25 6.92544 20.2358 6.47524 20.0458L5.89206 21.4278C6.68914 21.7642 7.60558 21.75 9 21.75V20.25ZM2.0023 13.7679C2.282 15.7777 2.43406 16.9017 2.77109 17.819L4.17907 17.3017C3.91156 16.5736 3.77851 15.6488 3.48798 13.5611L2.0023 13.7679ZM6.47524 20.0458C5.55279 19.6566 4.69496 18.7058 4.17907 17.3017L2.77109 17.819C3.3857 19.4918 4.48205 20.8328 5.89206 21.4278L6.47524 20.0458ZM14.512 13.5611C14.2215 15.6488 14.0884 16.5736 13.8209 17.3017L15.2289 17.819C15.5659 16.9017 15.718 15.7777 15.9977 13.7679L14.512 13.5611ZM9 21.75C10.3944 21.75 11.3109 21.7642 12.1079 21.4278L11.5248 20.0458C11.0746 20.2358 10.5292 20.25 9 20.25V21.75ZM13.8209 17.3017C13.305 18.7058 12.4472 19.6566 11.5248 20.0458L12.1079 21.4278C13.5179 20.8328 14.6143 19.4918 15.2289 17.819L13.8209 17.3017ZM3.22564 11.6761C3.00352 10.08 2.83766 8.88703 2.74664 7.92906L1.25336 8.07094C1.34819 9.06897 1.51961 10.2995 1.73996 11.8829L3.22564 11.6761ZM16.26 11.8829C16.4804 10.2995 16.6518 9.06896 16.7466 8.07094L15.2534 7.92906C15.1623 8.88702 14.9965 10.08 14.7744 11.6761L16.26 11.8829ZM17 5.25H1V6.75H17V5.25ZM12.25 5V6H13.75V5H12.25ZM13 5.25H5V6.75H13V5.25ZM5.75 6V5H4.25V6H5.75ZM9 1.75C10.7949 1.75 12.25 3.20507 12.25 5H13.75C13.75 2.37665 11.6234 0.25 9 0.25V1.75ZM9 0.25C6.37665 0.25 4.25 2.37665 4.25 5H5.75C5.75 3.20507 7.20507 1.75 9 1.75V0.25Z" />
                      </svg>
                    </span>
                    <span className="absolute bottom-[-2rem] right-[5px] cursor-default grayscale">
                      <WordLimit words={title.length} limit={50} />
                    </span>

                    {error?.title && (
                      <span className={`error text-xs  text-[red]`}>
                        {error?.title}
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-[100%] ">
                  <label htmlFor="dueDate" className="mt-2 text-base lg:text-xl ">
                    Due Date :
                  </label>
                  <input
                    value={goalduedate}
                    type="date"
                    id="dueDate"
                    onChange={(e) => setGoalduedate(e.target.value)}
                    min={today}
                    className={`P22Mackinac placeholder:P22Mackinac my-2  block w-[100%] appearance-none rounded-[3rem] border border-gray-300 px-4 py-4 pl-12 placeholder-[#000] shadow-md placeholder:font-[600] ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5} sm:text-lg`}
                  />
                </div>

                <div className="w-[100%]">
                  <div className="relative flex flex-col gap-2">
                    <label htmlFor="description" className="mt-2 text-base lg:text-xl ">
                      Description
                    </label>
                    {/* <span className='absolute top-[4rem] z-10 left-[1rem] h-5 w-5'><img src={description} /></span> */}
                    <div className="relative w-full">
                      <div className="pointer-events-none absolute left-[-0.8rem] top-[1.8rem] z-10 flex items-center pl-10">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.5 7.5V11.25C16.5 15 15 16.5 11.25 16.5H6.75C3 16.5 1.5 15 1.5 11.25V6.75C1.5 3 3 1.5 6.75 1.5H10.5"
                            stroke={theme.shoorah_7}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.5 7.5H13.5C11.25 7.5 10.5 6.75 10.5 4.5V1.5L16.5 7.5Z"
                            stroke={theme.shoorah_7}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.25 9.75H9.75"
                            stroke={theme.shoorah_7}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.25 12.75H8.25"
                            stroke={theme.shoorah_7}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {/* <img src={theme.shoorah_description_icon} className='h-5 w-5' /> */}
                      </div>
                    </div>
                    <textarea
                      value={text}
                      id="description"
                      name="description"
                      maxLength={2000}
                      onChange={handleTextArea}
                      placeholder="Enter description..."
                      style={{
                        boxShadow:
                          "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
                      }}
                      className={`P22Mackinac placeholder:P22Mackinac h-[10rem] lg:h-[25rem] w-[100%] resize-none appearance-none break-all rounded-[2rem] border border-gray-300 px-4 py-2 pl-16 pt-5 placeholder-[#000] placeholder:text-lg placeholder:font-[500] placeholder:tracking-wider ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5} sm:text-lg`}
                    />
                    <span className="absolute bottom-[-2rem] right-[1rem] cursor-default grayscale">
                      <WordLimit words={text.length} limit={2000} />
                    </span>

                    {error?.description && (
                      <span className={`P22Mackinac error text-xs  text-[red]`}>
                        {error?.description}
                      </span>
                    )}
                  </div>

                  {checklist && checklist?.length == 0 ? null :
                    <div className="w-[100%] mt-[2rem] cursor-pointer">
                      <label
                        htmlFor="checklist"
                        className="mt-2 text-base lg:text-xl "
                      >
                        Checklist to Achieve
                      </label>
                      {checklist?.map((i, index) =>
                        <div key={i.id} className="w-full mt-5 relative">
                          <input
                            placeholder="Checklist"
                            type="text"
                            id="checklist"
                            defaultValue={i.title}
                            disabled
                            className={`P22Mackinac placeholder:P22Mackinac my-2 pr-[3rem] xl:pr-[6rem] block w-[100%] appearance-none rounded-3xl border border-gray-300 px-4 py-2 placeholder-[#000] shadow-md placeholder:font-[600] lg:pl-6 xl:py-4 ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5} text-base lg:text-lg`}
                          />

                          <div
                            onClick={(e) => handleChecklistItemUpdate(index)}
                            className={`absolute flex justify-center items-center outline-none  text-white top-[0.6rem] right-[1rem] xl:right-[2rem] w-[1.5rem] h-[1.5rem] xl:h-[2.5rem] xl:w-[2.5rem] rounded-[10px] xl:rounded-[17px] border ${theme.shoorah_border_5} ${i.isCompleted ? theme.shoorah_bg_5 : '#fff'}`}>
                            {i.isCompleted &&
                              <p className={`text-white`}>
                                <svg
                                  className="aspect-square h-[12px] w-[12px] xl:w-[20px] xl:h-[20px]"
                                  viewBox="0 0 18 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0.795365 11.3882L6.38386 17.4533C6.38386 17.4533 9.96556 6.85147 17.0165 1.5438"
                                    stroke='#fff'
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </p>
                            }

                          </div>
                        </div>
                      )}
                    </div>

                  }

                  <div className="w-full mt-5 flex flex-col justify-around gap-3 relative">
                    <input
                      placeholder="Add Step"
                      type="text"
                      id="checklist"
                      value={checklistItem.title}
                      onChange={(e) => setChecklistItem({ title: e.target.value, isCompleted: false, id: itemCount })}
                      className={`P22Mackinac placeholder:P22Mackinac my-2 pr-[3rem] xl:pr-[6rem]  block w-[100%] appearance-none rounded-3xl border border-gray-300 px-4 py-2 placeholder-gray-400 shadow-md  lg:pl-6 xl:py-4 ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5} text-base lg:text-lg`}
                    />

                    <button
                      onClick={(e) => {
                        handleChecklist(e);
                        setChecklistItem({ title: "", isCompleted: false })
                      }}
                      className={`absolute outline-none text-white top-[1rem] right-[1rem] xl:right-[2rem] w-[1.5rem] h-[1.5rem] xl:h-[2.5rem] xl:w-[2.5rem] rounded-full ${theme.shoorah_bg_5}`}>
                      +
                    </button>
                  </div>

                  <div className="mt-[1rem]  flex scale-105 items-center px-4 xl:mt-[2rem]  xl:px-0">
                    <input
                      id="isCompletedCheck"
                      checked={isCompleted}
                      onChange={() => {
                        if (isCompleted == false && checklist && checklist?.length > 0) {
                          setOpen(true)
                        } else {
                          setIsCompleted(!isCompleted);
                        }
                      }}
                      type="checkbox"
                      value=""
                      className={`h-4 w-4 xl:ml-5 cursor-pointer ${theme.shoorah_text_5} rounded border-gray-300 bg-gray-100 ${theme.shoorah_border_ring_focus_5} focus:ring-2 `}
                    />
                    <label
                      htmlFor="isCompletedCheck"
                      className="ml-2 P22Mackinac cursor-pointer text-base text-black lg:text-lg"
                    >
                      Mark goal as completed
                    </label>
                  </div>
                </div>

                <div className=" mt-8 flex w-full justify-around gap-[1rem] text-center sm:gap-[3rem] lg:gap-[8rem]">
                  <button
                    onClick={handleDraft}
                    className="P22Mackinac w-[50%] rounded-[3rem] border border-[gray] border-transparent bg-[#fff] py-3 text-lg font-medium text-[#000] shadow-sm hover:bg-[gray] hover:text-white focus:outline-none focus:ring-2 focus:ring-[gray] focus:ring-offset-2 sm:py-3 xl:text-xl"
                  >
                    Draft
                  </button>
                  <button
                    type="submit"
                    name="submit"
                    className={`w-[50%] border border-transparent ${theme.shoorah_bg_5} ${theme.shoorah_bg_hover_6} P22Mackinac rounded-[3rem] py-2 text-lg font-medium text-white shadow-sm focus:outline-none focus:ring-2 sm:py-3 xl:text-xl ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Transition.Root appear show={open} as={Fragment}>
        <Dialog as='div' className='relative z-20' initialFocus={modalRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed top-[30%] xl:top-0 inset-0 z-20 overflow-y-auto'>
            <div className='flex min-h-full items-start sm:items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                  <div className='bg-white px-4 pt-2 sm:pt-5 pb-4 sm:p-3 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>

                      <div className='mt-1 w-full text-center sm:mt-0 sm:ml-4 sm:text-left'>

                        <div className='relative flex flex-col justify-evenly items-center'>
                          <div className='items-center relative w-full'>
                            <p className='text-center my-2 lg:mb-4 P22Mackinac font-[500] text-xl md:text-3xl cursor-default'>Are you sure ?</p>
                            <p className='text-center my-3 lg:my-5 P22Mackinac font-[500] text-sm md:text-md cursor-default'>Your roadmap to reaching your goal remain partially uncharted!</p>
                            <p className='text-center my-3 lg:my-5 P22Mackinac font-[500] text-sm md:text-md cursor-default'>Their are still steps on your checklist awaiting completion</p>
                            <button onClick={() => {
                              setOpen(false);
                              setIsCompleted(false);
                            }} className={`text-white w-full mt-[0.5rem] py-1 xl:py-2 rounded-3xl P22Mackinac text-md ${theme.shoorah_bg_5} `}>Go Back</button>
                            <button onClick={() => {
                              setOpen(false);
                              setIsCompleted(true);
                            }} className={`w-full mt-[1rem] mb-[1.5rem] py-1 xl:py-2 rounded-3xl P22Mackinac text-md border ${theme.shoorah_border_7} ${theme.shoorah_text_7} `}>Mark goal as completed</button>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>



    </div>
  );
}
