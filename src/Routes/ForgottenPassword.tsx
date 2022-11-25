import React, { useState, useRef } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Contexts/AuthContext";

function ForgottenPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuthentication();

  const emailRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      setMessage("");
      setLoading(true);
      if (emailRef.current?.value !== undefined)
        await resetPassword(emailRef.current?.value);
      setMessage("Instructions to reset your password are in your inbox!");
    } catch {
      setMessage("An error has occurred, can't reset the password.");
    }
    setLoading(false);
  }

  return (
    <div className="forgotten-password">
      <div className="container">
        <h2 className="form-title">Reset your password</h2>
        <div className="form-info-message w-60 md:w-80 lg:w-96 ">
          <AiOutlineInfoCircle size="2rem" />
          <p className="text-sm font-medium text-left">
            If you have an account, you will recieve an email to reset your
            password in your inbox.
          </p>
        </div>
        <form
          className="flex flex-col items-center justify-center my-3 mx-auto gap-3 w-max md:w-80 lg:w-96"
          action=""
        >
          {message !== "" && <p>{message}</p>}
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
          <button
            type="submit"
            className="button"
            disabled={loading}
            onClick={handleSubmit}
          >
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
      </div>
    </div>
  );
}

export default ForgottenPassword;
