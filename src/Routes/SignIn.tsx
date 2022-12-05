import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../Contexts/AuthContext";

import { FcGoogle } from "react-icons/fc";
import Attribution from "../Components/Dashboard/Attribution";

import {
  signInWithGoogleThunk,
  userSignInThunk,
  EMAIL_REGEX,
  PWD_REGEX,
} from "../Reducerss/authSlice";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { LoadingStatus, UIMessages } from "../Utils/types";
import PageTitle from "../Components/Dashboard/Authentication/PageTitle";
import ErrorMessage from "../Components/Dashboard/Authentication/ErrorMessage";
import InputHelperText from "../Components/Dashboard/Authentication/InputHelperText";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authError = useAppSelector((state) => state.authentication.error);
  const authStatus = useAppSelector((state) => state.authentication.status);

  const [errormessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  const [loading, setLoading] = useState(authStatus === LoadingStatus.pending);
  console.log(authStatus);

  // setting the loading state based on the thunks status
  useEffect(() => {
    authStatus === LoadingStatus.pending ? setLoading(true) : setLoading(false);
    authStatus === LoadingStatus.failed
      ? setErrorMessage(authError as string)
      : setErrorMessage("");
  }, [authStatus]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (validEmail && validPassword)
      await dispatch(
        userSignInThunk({
          email: email.trim(),
          password: password.trim(),
        })
      ).then((res) =>
        res.meta.requestStatus === "fulfilled"
          ? navigate("/dashboard")
          : res.meta.requestStatus === "rejected" &&
            setErrorMessage(UIMessages.signInFailed)
      );
    else setErrorMessage(UIMessages.authWarning);
  }

  return (
    <div className="sign-in">
      <PageTitle titleContent={"Sign In"} />
      {errormessage !== "" && <ErrorMessage messageContent={errormessage} />}
      <form
        className="flex flex-col items-center justify-center my-3 mx-auto gap-3 w-max md:w-80 lg:w-96"
        action=""
      >
        <div className="email flex flex-col justify-center items-center w-full">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            id="email"
            className="form-input"
            type="email"
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
            <InputHelperText helperTextContent={UIMessages.emailInvalid} />
          )}
        </div>
        <div className="password flex flex-col justify-center items-center w-full">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            className="form-input"
            type="password"
            onChange={(e) => {
              setPassword(() => e.target.value);
            }}
            required
          />
          {password !== "" && !validPassword ? (
            <InputHelperText helperTextContent={"Invalid password"} />
          ) : null}
        </div>
        <div className="forgot-password">
          <Link className="link" to={"/forgottenpassword"}>
            Forgot your password?
          </Link>
        </div>
        <button
          className="button"
          type="submit"
          value="Sign In"
          onClick={handleSubmit}
          disabled={loading}
        >
          Sign In
        </button>
      </form>
      <div className="note flex gap-5 text-lg font-medium items-center justify-center">
        <p>Don't have an account?</p>
        <Link to="/signup" className="link hover:text-stone-400">
          Sign Up
        </Link>
      </div>
      <button
        onClick={async () => {
          await dispatch(signInWithGoogleThunk());
          navigate("/dashboard");
        }}
        disabled={loading}
        className="button flex justify-center items-center mt-3 mb-0 mx-auto"
      >
        <FcGoogle size="2rem" />
        Continue with Google
      </button>
      <Attribution />
    </div>
  );
};

export default SignIn;
