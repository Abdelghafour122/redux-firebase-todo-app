import React, { useState, useRef, useEffect } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { LoadingStatus, AuthUIMessages, checkIfLoading } from "../Utils/types";
import { resetPasswordThunk } from "../Reducerss/authSlice";
import ErrorMessage from "../Components/Dashboard/Authentication/ErrorMessage";
import InfoMessage from "../Components/Dashboard/Authentication/InfoMessage";
import SuccessMessage from "../Components/Dashboard/Authentication/SuccessMessage";
import ColorThemeButton from "../Components/Dashboard/ColorThemeButton";
import { FaSpinner } from "react-icons/fa";
import Attribution from "../Components/Dashboard/Attribution";

function ForgottenPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authError = useAppSelector((state) => state.authentication.error);
  const authStatus = useAppSelector((state) => state.authentication.status);

  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (email !== "")
      return await dispatch(resetPasswordThunk(email as string)).then((res) =>
        res.meta.requestStatus === "fulfilled"
          ? setErrorMessage(AuthUIMessages.resetPasswordSucceeded)
          : res.meta.requestStatus === "rejected" &&
            setErrorMessage(AuthUIMessages.resetPasswordFailed)
      );
  }

  useEffect(() => {
    authStatus === LoadingStatus.failed
      ? setErrorMessage(authError as string)
      : setErrorMessage("");
  }, [authStatus]);

  useEffect(() => {
    setErrorMessage("");
  }, []);

  return (
    <div className="forgotten-password h-full flex flex-col items-center justify-center relative">
      <div className="btn-holder absolute top-2 right-2">
        <ColorThemeButton />
      </div>
      <section className="container">
        <h2 className="form-title text-5xl">Reset your password</h2>
        <InfoMessage />
        <form
          className="flex flex-col items-center justify-center my-7 mx-auto gap-3 w-max md:w-80 lg:w-96"
          action=""
          onSubmit={handleSubmit}
        >
          {errorMessage !== "" &&
            (Object.is(AuthUIMessages.resetPasswordSucceeded, errorMessage) ? (
              <SuccessMessage
                messageContent={AuthUIMessages.resetPasswordSucceeded}
              />
            ) : (
              <ErrorMessage messageContent={errorMessage} />
            ))}
          <div className="email flex flex-col justify-center items-center w-full">
            <label htmlFor="email-address" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email-address"
              className="form-input"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value.trim())}
            />
          </div>
          <button
            type="submit"
            className="button flex align-center justify-center"
            disabled={checkIfLoading(authStatus)}
          >
            {checkIfLoading(authStatus) ? (
              <>
                Please wait &nbsp;
                <FaSpinner
                  className="animate-spin text-stone-100 dark:text-stone-900"
                  size="1.5rem"
                />
              </>
            ) : (
              "Reset password"
            )}
          </button>
        </form>
        <button
          className="flex items-center justify-center gap-2 w-max mt-3 mb-0 mx-auto text-lg font-semibold underline text-stone-800 dark:text-stone-300"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeftSquareFill
            size="1.5em"
            className="dark:text-stone-300 text-stone-800"
          />
          Go Back
        </button>
      </section>
      <Attribution />
    </div>
  );
}

export default ForgottenPassword;
