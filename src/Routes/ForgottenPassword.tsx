import React, { useState, useRef, useEffect } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { LoadingStatus, AuthUIMessages } from "../Utils/types";
import { resetPasswordThunk } from "../Reducerss/authSlice";
import ErrorMessage from "../Components/Dashboard/Authentication/ErrorMessage";
import InfoMessage from "../Components/Dashboard/Authentication/InfoMessage";
import SuccessMessage from "../Components/Dashboard/Authentication/SuccessMessage";

function ForgottenPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authError = useAppSelector((state) => state.authentication.error);
  const authStatus = useAppSelector((state) => state.authentication.status);

  const emailRef = useRef<HTMLInputElement | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (emailRef.current?.value.trim() !== "")
      return await dispatch(
        resetPasswordThunk(emailRef.current?.value.trim() as string)
      ).then((res) =>
        res.meta.requestStatus === "fulfilled"
          ? setErrorMessage(AuthUIMessages.resetPasswordSucceeded)
          : res.meta.requestStatus === "rejected" &&
            setErrorMessage(AuthUIMessages.resetPasswordFailed)
      );
  }

  useEffect(() => {
    authStatus === LoadingStatus.pending ? setLoading(true) : setLoading(false);
    authStatus === LoadingStatus.failed
      ? setErrorMessage(authError as string)
      : setErrorMessage("");
  }, [authStatus]);

  useEffect(() => {
    setErrorMessage("");
  }, []);

  return (
    <div className="forgotten-password h-full flex flex-col items-center justify-center">
      <section className="container">
        <h2 className="form-title">Reset your password</h2>
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
              ref={emailRef}
              required
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            Reset password
          </button>
        </form>
        <button
          className="flex items-center justify-center gap-2 w-max mt-3 mb-0 mx-auto text-lg font-semibold underline text-stone-300"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeftSquareFill size="1.5em" color="#e7e5e4" />
          Go Back
        </button>
      </section>
    </div>
  );
}

export default ForgottenPassword;
