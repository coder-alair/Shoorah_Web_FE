import React, { useState } from "react";
import { Api } from "../api";
import Loader from "../component/common/Loader";
import { errorToast, successToast } from "../utils/helper";
import changePassValidations from "../validation/changePassValidations";
import CommonInput from "../component/common/Input/CommonInput";
import PrimaryButton from "../component/common/Buttons/PrimaryButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ChangePassword() {
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const history = useHistory();
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setError((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));

    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = changePassValidations(form);
    if (isValid) {
      setLoader(true);
      const payload = {
        oldPassword: form.password,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      };
      const response = await Api.changePassword(payload);
      if (response?.data?.meta?.code === 1) {
        setForm({
          password: "",
          newPassword: "",
          confirmPassword: "",
        });
        setLoader(false);
        successToast(response?.data?.meta?.message);
        history.push("/home");
      } else if (response?.data?.meta?.code === 0) {
        setLoader(false);
        errorToast(response?.data?.meta?.message);
      }
    }
    setError(errors);
    setLoader(false);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {loader && <Loader />}
      <div className="mt-5 flex-col flex-wrap gap-4 rounded-[10px] bg-white px-4 py-10 xl:flex">
        {/* <div className='text-[28px] font-bold'>Change Password</div> */}
        <div className="mt-5 w-full sm:w-[430px]">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <CommonInput
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                label="Enter old password"
                error={error.password}
                classNames="px-4 py-2 sm:px-5 sm:py-3 "
                isRequired
                placeholder="Please enter your old password"
                isIcon
              />
              <CommonInput
                id="newPassword"
                name="newPassword"
                type="password"
                value={form.newPassword}
                onChange={handleChange}
                label="Enter new password"
                classNames="px-4 py-2 sm:px-5 sm:py-3"
                error={error.newPassword}
                isRequired
                placeholder="Please enter new password"
                isIcon
              />
              <CommonInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                label="Confirm new password"
                error={error.confirmPassword}
                classNames="px-4 py-2 sm:px-5 sm:py-3"
                placeholder="Please re-enter new password"
                isRequired
                isIcon
              />
              <div className="text-end">
                <PrimaryButton btnText={"Save"} btnType="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
