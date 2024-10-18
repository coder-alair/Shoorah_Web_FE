import React, { useState, useEffect, Fragment, useRef } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import shoorahLogo from "../../../assets/images/shoorah_logo.png";
import { getJWTToken } from "../../../utils/helper";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "../../context/themeContext";
import TransactionModal from "./transactionModal";

import googleLogo from "../../../assets/images/google-pay.svg";
import appleLogo from "../../../assets/images/apple-pay.svg";
import acceptedCardsLogo from "../../../assets/images/accepted-card-logos.svg";
import { Api } from "../../../api";

export default function CheckoutForm({
  clientSecret,
  open,
  setOpen,
  plan,
  setTransactionModal,
  setTransaction,
  selectedPlan,
}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  // const [clientSecret, setClientSecret] = useState('');
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");

  const [paymentRedirectUrl, setPaymentRedirectUrl] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { theme } = useTheme();
  const cancelButtonRef = useRef();

  const [userDiscountValue, setUserDiscountValue] = useState("");
  const [isValidCoupon, setIsValidCoupon] = useState(false);

  // useEffect(() => {
  //     // Create PaymentIntent as soon as the page loads

  // }, []);
  useEffect(async () => {
    let userData = localStorage.getItem("userData");
    let data = JSON.parse(userData);
    setProcessing(true);
    await Api.getUserProfile(data.id)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setEmail(res?.data?.data?.email);
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });

    await Api.buySubscription({
      type: plan?.stripeId,
    }).then((res) => {
      if (res?.data?.meta?.code == 1) {
        setPaymentRedirectUrl(res?.data?.data?.url);
      }
    });
    setProcessing(false);
  }, [selectedPlan, plan]);

  const cardStyle = {
    style: {
      base: {
        color: "white",
        fontFamily: "P22Mackinac",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#fff",
        },
        iconColor: "#fff",
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  useEffect(() => {
    setError(null);
  }, [open]);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    // const payload = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //   },
    // });

    // if (payload.error) {
    //   setError(`Payment failed ${payload.error.message}`);
    //   setProcessing(false);
    //   setTransaction(payload.error);
    //   setTransactionModal(true);
    //   setOpen(false);
    // } else {
    //   setError(null);
    //   setProcessing(false);
    //   setTransaction(payload.paymentIntent);
    //   setTransactionModal(true);
    //   setOpen(false);
    // }
  };

  const handleUpiPay = async (e) => {
    //
  };

  const checkDiscount = (value) => {
    setIsValidCoupon(false);

    if (value?.toUpperCase() == "FREE20") {
      setIsValidCoupon(true);
    }
  };

  return (
    <Transition.Root appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-3 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-center sm:mt-0  sm:text-left">
                      <div className="relative flex flex-col items-center justify-evenly">
                        <div className="relative w-full items-center">
                          <p className="P22Mackinac my-2 cursor-default text-center text-lg font-[500]  xl:text-2xl">
                            Shoorah Subscription Payment
                          </p>
                          <hr className="w-full" />
                          <div
                            onClick={() => setOpen(false)}
                            className="absolute -top-4 right-0 cursor-pointer hover:scale-105 xl:right-[1rem] xl:top-[0.5rem]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              className="bi bi-x-lg h-4 w-4 xl:h-6 xl:w-6"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                          </div>
                          {/* <hr className="w-full" /> */}
                        </div>

                        <div className="P22Mackinac my-5  w-full text-center text-lg tracking-wide">
                          <form
                            id="payment-form border"
                            className=" flex flex-col justify-center"
                            onSubmit={handleSubmit}
                          >
                            <div className=" flex w-full flex-col items-center justify-around gap-4">
                              <div className=" P22Mackinac text-sm text-gray-400">
                                Account Email: {email}
                              </div>
                              <div className="my-2 flex flex-col text-center">
                                <p className=" P22Mackinac text-3xl  font-medium">
                                  {plan && plan.text}
                                </p>
                                {isValidCoupon ? (
                                  <p className="P22Mackinac mt-2 text-xl">
                                    Total:{" "}
                                    <span className="P22Mackinac text-3xl font-medium">
                                      £<span>25</span>
                                      <span className="ml-1 text-lg text-gray-400 line-through">
                                        {plan && plan.price}
                                      </span>
                                    </span>
                                  </p>
                                ) : (
                                  <p className="P22Mackinac mt-2 text-xl">
                                    Total:{" "}
                                    <span className="P22Mackinac text-3xl font-medium">
                                      £{plan && plan.price}
                                    </span>
                                  </p>
                                )}

                                {isValidCoupon && (
                                  <p
                                    className={`${theme.shoorah_text_5} P22Mackinac text-base font-semibold`}
                                  >
                                    Congratulations! You have got{" "}
                                    <span className="text-xl"> 20%</span> off
                                  </p>
                                )}
                              </div>
                            </div>
                            {/* <div className="mt-8 flex w-full flex-col items-center justify-center"> */}
                            <div className="hidden">
                              <label className="P22Mackinac text-center">
                                Having Dicount Coupon?
                              </label>

                              <input
                                type="text"
                                placeholder="Enter Coupon"
                                value={userDiscountValue}
                                onChange={(e) => {
                                  setUserDiscountValue(e.target.value);
                                  checkDiscount(e.target.value);
                                }}
                                className={`P22Mackinac mt-2 flex w-1/2 appearance-none items-center gap-x-3 text-center text-lg font-semibold uppercase focus:outline-none ${theme.shoorah_bg_5} cursor-pointer rounded-full px-3 py-2  text-white`}
                              />
                            </div>
                            {/* upi options */}
                            {/* <div className=" mt-6 flex justify-center gap-10 font-medium capitalize text-white "> */}
                            <div className="hidden">
                              <div
                                id="applePay"
                                onClick={handleUpiPay}
                                className={` flex items-center gap-x-3 ${theme.shoorah_bg_5} cursor-pointer rounded-full px-3  py-2`}
                              >
                                <img
                                  className="h-6 w-6"
                                  src={appleLogo}
                                  alt="apple pay"
                                />
                                <span>Pay</span>
                              </div>
                              <div
                                id="googlePay"
                                onClick={handleUpiPay}
                                className={` flex items-center gap-x-3 ${theme.shoorah_bg_5} cursor-pointer rounded-full px-3  py-2`}
                              >
                                <img
                                  className="h-6 w-6"
                                  src={googleLogo}
                                  alt="apple pay"
                                />
                                <span>Pay</span>
                              </div>
                            </div>
                            {/* hr */}
                            {/* <div className="mx-auto my-6 grid w-[12rem] grid-cols-3 items-center  justify-center  "> */}
                            <div className="hidden ">
                              <div className="h-[1px] rounded-full bg-gray-400/30"></div>
                              <p className="P22Mackinac text-xl font-medium">
                                or
                              </p>
                              <div className="h-[1px] rounded-full bg-gray-400/30"></div>
                            </div>
                            {/* <div className="mb-2 flex justify-end px-8 "> */}
                            <div className="hidden ">
                              <img
                                className="w-1/3"
                                src={acceptedCardsLogo}
                                alt="accepted cards"
                              />
                            </div>
                            <div
                              // className={`${theme.shoorah_bg_5} mx-auto w-[95%]  rounded-full px-3 py-2`}
                              className={`hidden`}
                            >
                              <CardElement
                                id="card-element border"
                                options={cardStyle}
                                onChange={handleChange}
                              />
                            </div>
                            <a
                              disabled={processing}
                              href={paymentRedirectUrl}
                              id="submit"
                              className={` ${theme.shoorah_bg_5} P22Mackinac mx-auto mt-[2rem] w-[70%]  rounded-[3rem] p-3 text-xl text-white  `}
                            >
                              <span id="button-text" className="P22Mackinac">
                                {processing ? (
                                  <div className="spinner" id="spinner"></div>
                                ) : (
                                  "Pay now"
                                )}
                              </span>
                            </a>
                            {/* Show any error that happens when processing the payment */}
                            {error && (
                              <div
                                className="card-error text-[red]"
                                role="alert"
                              >
                                {error}
                              </div>
                            )}
                            {/* Show a success message upon completion */}
                            <p
                              className={
                                succeeded
                                  ? "result-message"
                                  : "result-message hidden"
                              }
                            >
                              Payment succeeded, see the result in your
                              <a
                                href={`https://dashboard.stripe.com/test/payments`}
                              >
                                {" "}
                                Stripe dashboard.
                              </a>{" "}
                              Refresh the page to pay again.
                            </p>
                          </form>
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
  );
}
