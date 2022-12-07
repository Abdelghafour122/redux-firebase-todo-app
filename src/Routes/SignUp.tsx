import React, { ChangeEvent, useEffect, useState } from "react";
// import { useAuthentication } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Attribution from "../Components/Dashboard/Attribution";

import { useAppDispatch, useAppSelector } from "../App/hooks";
import {
  userSignUpThunk,
  EMAIL_REGEX,
  PWD_REGEX,
} from "../Reducerss/authSlice";
import InputHelperText from "../Components/Dashboard/Authentication/InputHelperText";
import PasswordGuide from "../Components/Dashboard/Authentication/PasswordGuide";
import { FaInfoCircle } from "react-icons/fa";
import PageTitle from "../Components/Dashboard/Authentication/PageTitle";
import ErrorMessage from "../Components/Dashboard/Authentication/ErrorMessage";
import { LoadingStatus, AuthUIMessages } from "../Utils/types";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authError = useAppSelector((state) => state.authentication.error);
  const authStatus = useAppSelector((state) => state.authentication.status);

  const [errormessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [openPasswordGuide, setOpenPasswordGuide] = useState(false);

  // setting the loading state based on the thunks status
  useEffect(() => {
    authStatus === LoadingStatus.pending ? setLoading(true) : setLoading(false);
    authStatus === LoadingStatus.failed
      ? setErrorMessage(authError as string)
      : setErrorMessage("");
  }, [authStatus]);

  useEffect(() => {
    setErrorMessage("");
  }, []);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(email, password, confirmPassword);
    if (password !== confirmPassword)
      return setErrorMessage(AuthUIMessages.passwordsDontMatch);
    if (validEmail && validPassword && passwordsMatch)
      return await dispatch(
        userSignUpThunk({
          email: email.trim(),
          password: password.trim(),
        })
      ).then((res) =>
        res.meta.requestStatus === "fulfilled"
          ? navigate("/dashboard")
          : res.meta.requestStatus === "rejected" &&
            setErrorMessage(AuthUIMessages.signUpFailed)
      );
  }

  return (
    <div className="sign-up h-full flex flex-col items-center justify-center">
      <section className="container">
        <PageTitle titleContent={"Sign Up"} />
        {errormessage !== "" && <ErrorMessage messageContent={errormessage} />}
        <form
          action=""
          className="flex flex-col items-center justify-center my-3 mx-auto gap-3 w-max md:w-80 lg:w-96"
          onSubmit={handleSubmit}
        >
          <div className="email flex flex-col justify-center items-center w-full">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(() => e.target.value);
                setValidEmail(
                  () =>
                    e.target.value.trim() !== "" &&
                    EMAIL_REGEX.test(e.target.value.trim())
                );
              }}
              required
            />
            {email !== "" && !validEmail && (
              <InputHelperText
                helperTextContent={AuthUIMessages.emailInvalid}
              />
            )}
          </div>
          <div className="password flex flex-col justify-center items-center w-full">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => {
                setPassword(() => e.target.value);
                setValidPassword(() => PWD_REGEX.test(e.target.value.trim()));
              }}
              required
            />
            {password !== "" && !validPassword ? (
              <>
                <div className="w-full flex items-center justify-between">
                  <InputHelperText
                    helperTextContent={AuthUIMessages.passwordInvalid}
                  />
                  <button
                    className="p-1 cursor-pointer"
                    onClick={() => {
                      setOpenPasswordGuide((prev) => !prev);
                    }}
                  >
                    <FaInfoCircle size="1.5rem" color="rgb(245 158 11)" />
                  </button>
                </div>
                {openPasswordGuide ? <PasswordGuide /> : null}
              </>
            ) : null}
          </div>
          <div className="passwordConfirm flex flex-col justify-center items-center w-full">
            <label htmlFor="passwordConfirm" className="form-label">
              Confirm Password:
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(() => e.target.value);
                setPasswordsMatch(() => e.target.value.trim() === password);
              }}
              required
            />
            {confirmPassword !== "" && !passwordsMatch && (
              <InputHelperText
                helperTextContent={AuthUIMessages.passwordsDontMatch}
              />
            )}
          </div>
          <button className="button" disabled={loading}>
            Sign Up
          </button>
        </form>
        <div className="note flex gap-5 text-lg font-medium items-center justify-center">
          <p>Already have an account?</p>
          <Link to="/signin" className="link">
            Sign In
          </Link>
        </div>
      </section>
      <Attribution />
    </div>
  );
};

export default SignUp;
