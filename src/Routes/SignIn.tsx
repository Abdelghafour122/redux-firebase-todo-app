import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../Contexts/AuthContext";
import { VscError } from "react-icons/vsc";

import { FcGoogle } from "react-icons/fc";
import Attribution from "../Components/Dashboard/Attribution";

import { signInWithGoogleThunk, userSignInThunk } from "../Reducerss/authSlice";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { LoadingStatus, UIMessages } from "../Utils/types";
import PageTitle from "../Components/Dashboard/Authentication/PageTitle";
import ErrorMessage from "../Components/Dashboard/Authentication/ErrorMessage";
import InputHelperText from "../Components/Dashboard/Authentication/InputHelperText";

const SignIn = () => {
  const navigate = useNavigate();
  const { userSignIn, signInWithGoogle, EMAIL_REGEX } = useAuthentication();
  const dispatch = useAppDispatch();

  const authError = useAppSelector((state) => state.authentication.error);
  const authStatus = useAppSelector((state) => state.authentication.status);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errormessage, setErrorMessage] = useState("");

  const [validEmail, setValidEmail] = useState(true);
  const [emailFocus, setEmailFocus] = useState(false);

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
    if (emailRef.current?.value !== "" && passwordRef.current?.value !== "")
      await dispatch(
        userSignInThunk({
          email: emailRef.current?.value as string,
          password: passwordRef.current?.value as string,
        })
      ).then(
        (res) =>
          res.meta.requestStatus === "fulfilled" && navigate("/dashboard")
      );
    else setErrorMessage(UIMessages.signInWarning);
  }

  // async function handleGoogleSignIn() {
  //   try {
  //     setErrorMessage("");
  //     await signInWithGoogle();
  //     navigate("/dashboard");
  //   } catch (error) {
  //     setErrorMessage("An error has occurred, can't log in.");
  //   }
  // }

  // USE STATE INSTEAD OF REFS TO MAKE HELPER TEXT

  useEffect(() => {
    if (emailRef.current?.value !== "")
      setValidEmail(EMAIL_REGEX.test(emailRef.current?.value as string));
  }, [emailRef.current?.value, EMAIL_REGEX]);

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
            ref={emailRef}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            required
          />
          {emailFocus && !validEmail && (
            <InputHelperText helperTextContent={"Invalid Email Address"} />
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
            ref={passwordRef}
            required
          />
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
          // disabled={loadingRef.current}
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
        // disabled={loadingRef.current}
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
