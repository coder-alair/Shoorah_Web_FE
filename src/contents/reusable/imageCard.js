import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import bin from "../../assets/images/bin.png";
import ConfirmPopup from "../../component/common/modals/ConfirmPopup";
import { useTheme } from "../context/themeContext";
import AddVali from "../../validation/AddGratitudeValidation";
import { errorToast, successToast } from "../../utils/helper";
import axios from "axios";
import { Api } from "../../api";

const ImageCard = ({
  goal,
  note,
  title,
  image,
  date,
  data,
  id,
  handleDel,
  del,
  url,
  setRefresh,
  refresh,
}) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const { theme } = useTheme();
  const [isCompleted, setIsCompleted] = useState(false);
  date = new Date(date).toUTCString().split(",")[1]?.trim().slice(0, 11);

  const handleConfirm = () => {
    setShow(!show);
  };

  const handleClick = () => {
    history.push(url, data);
  };

  const handleDelete = () => {
    handleDel(id);
    setRefresh(refresh + 1);
  };

  const handleGoal = async () => {
    const form = {
      title: goal.title,
      description: goal.description,
      checklist: goal.checklist,
      // imageType: image ? getFileType(image) : null,
    };
    if (true) {

      const payload = {
        goalId: data.goalId,
        title: data.title,
        // imageUrl: image ? getFileType(image) : null,
        isSaved: true,
        dueDate: data.dueDate,
        description: data.description,
        isImageDeleted: false,
        isCompleted: data.isCompleted ? false : true,
        checklist: data.checklist,
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
                  setRefresh(refresh + 1);

                  // history.replace("/journal/goals");
                }
              })
              .catch((err) => {
                setRefresh(refresh + 1);

                errorToast("Something went wrong with image upload !");
              });
          } else {
            if (res?.data?.meta?.code == 1) {
              setRefresh(refresh + 1);

              successToast(res?.data?.meta?.message);
              // history.replace("/journal/goals");
            } else {
              setRefresh(refresh + 1);

              errorToast(res?.data?.meta?.message);
            }
          }
        }
      });
    }
  };



  return (
    <div className=" mt-5 w-full cursor-default xl:mt-10">
      <div
        style={{
          boxShadow:
            "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
        }}
        className="flex h-28 w-full justify-around gap-2 overflow-hidden rounded-2xl border bg-white xl:h-[12.5rem] xl:gap-8 xl:rounded-[3rem]"
      >
        {note == true ? null : (
          <div
            className=" w-[40%] overflow-hidden xl:w-[18rem]"
            // onClick={handleClick}
          >
            {image && (
              <img
                src={image}
                className="h-[100%] w-[100%] cursor-default object-cover object-center"
              />
            )}
            {!image && (
              <img
                src={theme.shoorah_light_gradient}
                className={`cover	 h-full w-full cursor-default object-cover `}
              />
            )}
          </div>
        )}
        <div
          className={`w-full ${note ? ` ml-4 xl:ml-[3rem]` : `ml-3`
            } relative flex flex-col justify-around pb-4 pt-0 xl:py-0 `}
        >
          <div className="">
            <p className="P22Mackinac flex gap-5 cursor-default text-base font-[500] xl:text-3xl">
              {title} <span onClick={handleClick} className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil h-[14px] w-[14px] md:w-[24px] md:h-[24px]" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>
                  </span>
            </p>
          </div>
          {note && (
            <div>
              <p className="P22Mackinac cursor-default text-lg text-gray-500">
                {data?.description}
              </p>
            </div>
          )}

          {goal && (
            <div>
              <p className="P22Mackinac cursor-default text-sm text-gray-500 xl:text-lg">
                {data?.daysRemaining > 0
                  ? `Days Remaining : ` + data.daysRemaining
                  : data.daysRemaining < 0
                    ? `Days Remaining : Expired`
                    : null}
              </p>
            </div>
          )}

          <div >
            <p className="P22Mackinac cursor-default text-sm text-gray-500 xl:text-2xl">
              <span className="P22Mackinac text-sm font-[500] text-black xl:text-2xl">
                Created On :{" "}
              </span>
              {date}
            </p>
          </div>

          {del && (
            <span
              onClick={handleConfirm}
              className="absolute right-4 top-2 z-10 cursor-pointer text-[red] hover:scale-110 xl:right-[2rem] xl:top-[1rem]"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 18 22"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.5172 11.7795L16.26 11.8829L15.5172 11.7795ZM15.2549 13.6645L15.9977 13.7679L15.2549 13.6645ZM2.74514 13.6645L3.48798 13.5611L2.74514 13.6645ZM2.4828 11.7795L1.73996 11.8829L2.4828 11.7795ZM6.18365 20.7368L5.89206 21.4278L6.18365 20.7368ZM3.47508 17.5603L4.17907 17.3017L3.47508 17.5603ZM14.5249 17.5603L15.2289 17.819V17.819L14.5249 17.5603ZM11.8164 20.7368L11.5248 20.0458H11.5248L11.8164 20.7368ZM2.74664 7.92906C2.70746 7.5167 2.34142 7.21418 1.92906 7.25336C1.5167 7.29254 1.21418 7.65858 1.25336 8.07094L2.74664 7.92906ZM16.7466 8.07094C16.7858 7.65858 16.4833 7.29254 16.0709 7.25336C15.6586 7.21418 15.2925 7.5167 15.2534 7.92906L16.7466 8.07094ZM17 6.75C17.4142 6.75 17.75 6.41421 17.75 6C17.75 5.58579 17.4142 5.25 17 5.25V6.75ZM1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM13 6V6.75H13.75V6H13ZM5 6H4.25V6.75H5V6ZM14.7744 11.6761L14.512 13.5611L15.9977 13.7679L16.26 11.8829L14.7744 11.6761ZM3.48798 13.5611L3.22564 11.6761L1.73996 11.8829L2.0023 13.7679L3.48798 13.5611ZM9 20.25C7.47083 20.25 6.92544 20.2358 6.47524 20.0458L5.89206 21.4278C6.68914 21.7642 7.60558 21.75 9 21.75V20.25ZM2.0023 13.7679C2.282 15.7777 2.43406 16.9017 2.77109 17.819L4.17907 17.3017C3.91156 16.5736 3.77851 15.6488 3.48798 13.5611L2.0023 13.7679ZM6.47524 20.0458C5.55279 19.6566 4.69496 18.7058 4.17907 17.3017L2.77109 17.819C3.3857 19.4918 4.48205 20.8328 5.89206 21.4278L6.47524 20.0458ZM14.512 13.5611C14.2215 15.6488 14.0884 16.5736 13.8209 17.3017L15.2289 17.819C15.5659 16.9017 15.718 15.7777 15.9977 13.7679L14.512 13.5611ZM9 21.75C10.3944 21.75 11.3109 21.7642 12.1079 21.4278L11.5248 20.0458C11.0746 20.2358 10.5292 20.25 9 20.25V21.75ZM13.8209 17.3017C13.305 18.7058 12.4472 19.6566 11.5248 20.0458L12.1079 21.4278C13.5179 20.8328 14.6143 19.4918 15.2289 17.819L13.8209 17.3017ZM3.22564 11.6761C3.00352 10.08 2.83766 8.88703 2.74664 7.92906L1.25336 8.07094C1.34819 9.06897 1.51961 10.2995 1.73996 11.8829L3.22564 11.6761ZM16.26 11.8829C16.4804 10.2995 16.6518 9.06896 16.7466 8.07094L15.2534 7.92906C15.1623 8.88702 14.9965 10.08 14.7744 11.6761L16.26 11.8829ZM17 5.25H1V6.75H17V5.25ZM12.25 5V6H13.75V5H12.25ZM13 5.25H5V6.75H13V5.25ZM5.75 6V5H4.25V6H5.75ZM9 1.75C10.7949 1.75 12.25 3.20507 12.25 5H13.75C13.75 2.37665 11.6234 0.25 9 0.25V1.75ZM9 0.25C6.37665 0.25 4.25 2.37665 4.25 5H5.75C5.75 3.20507 7.20507 1.75 9 1.75V0.25Z" />
              </svg>

              <ConfirmPopup
                open={show}
                setOpen={setShow}
                message={"Are you sure you want to Delete ?"}
                setAccepted={(e) => handleDelete(e)}
                handleNo={() => {
                  setShow(false);
                }}
              />
            </span>
          )}

          {goal &&
            <div className="absolute bottom-[3px] left-[-14px] md:left-auto right-auto md:bottom-[1.2rem] md:right-[2.5rem] mt-[1rem] xl:ml-5 flex scale-105 items-center px-4  xl:px-0 ">
              <input
                id="checked-checkbox"
                defaultChecked={data.isCompleted}
                onChange={() => { setIsCompleted(!data.isCompleted); handleGoal() }}
                type="checkbox"
                value=""
                className={`h-2 w-2 lg:h-4 lg:w-4 cursor-pointer ${theme.shoorah_text_5} border-gray-300 bg-gray-100 ${theme.shoorah_border_ring_focus_5} focus:ring-2 `}
              />
              <label
                className="ml-2 P22Mackinac cursor-pointer text-[8px] lg:text-base text-black lg:text-lg"
              >
                Mark goal as completed
              </label>
            </div>

          }
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
