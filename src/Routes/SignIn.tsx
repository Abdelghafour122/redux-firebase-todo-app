import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import Attribution from "../Components/Dashboard/Attribution";

import {
  signInWithGoogleThunk,
  userSignInThunk,
  EMAIL_REGEX,
} from "../Reducerss/authSlice";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { LoadingStatus, AuthUIMessages, checkIfLoading } from "../Utils/types";
import PageTitle from "../Components/Dashboard/Authentication/PageTitle";
import ErrorMessage from "../Components/Dashboard/Authentication/ErrorMessage";
import InputHelperText from "../Components/Dashboard/Authentication/InputHelperText";
import InfoMessage from "../Components/Dashboard/Authentication/InfoMessage";
import ColorThemeButton from "../Components/Dashboard/ColorThemeButton";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authError = useAppSelector((state) => state.authentication.error);
  const authStatus = useAppSelector((state) => state.authentication.status);

  const [errormessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(authStatus === LoadingStatus.pending);

  // setting the loading state based on the thunks status
  useEffect(() => {
    setLoading(() => checkIfLoading(authStatus));

    if (authStatus === LoadingStatus.pending)
      setErrorMessage(AuthUIMessages.signInPending);

    authStatus === LoadingStatus.failed
      ? setErrorMessage(authError as string)
      : setErrorMessage("");
  }, [authStatus, authError]);

  useEffect(() => {
    setErrorMessage("");
  }, []);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (validEmail && password !== "") {
      await dispatch(
        userSignInThunk({
          email: email.trim(),
          password: password.trim(),
        })
      ).then((res) =>
        res.meta.requestStatus === "fulfilled"
          ? navigate("/dashboard")
          : res.meta.requestStatus === "rejected" &&
            setErrorMessage(AuthUIMessages.signInFailed)
      );
    }
    setPassword("");
  }

  return (
    <div className="sign-in h-full flex flex-col items-center justify-center relative">
      <div className="btn-holder absolute top-2 right-2">
        <ColorThemeButton />
      </div>
      <section className="container">
        <PageTitle titleContent={"Sign In"} />
        {errormessage !== "" && <ErrorMessage messageContent={errormessage} />}
        {loading ? <InfoMessage text={AuthUIMessages.signInPending} /> : null}
        <form
          className="flex flex-col items-center justify-center my-3 mx-auto gap-3 w-max md:w-80 lg:w-96"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="email flex flex-col justify-center items-center w-full">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              className="form-input"
              type="email"
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
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(() => e.target.value);
              }}
              required
            />
          </div>
          <div className="forgot-password">
            <Link
              className={`link hover:text-stone-400 ${
                checkIfLoading(authStatus)
                  ? "pointer-events-none"
                  : "pointer-events-auto"
              }`}
              to={"/forgottenpassword"}
            >
              Forgot your password?
            </Link>
          </div>
          <button
            className="button"
            type="submit"
            value="Sign In"
            disabled={loading}
          >
            Sign In
          </button>
        </form>
        <div className="note mt-7 flex gap-5 text-lg font-medium items-center justify-center">
          <p>Don't have an account?</p>
          <Link
            to="/signup"
            className={`link hover:text-stone-400 ${
              checkIfLoading(authStatus)
                ? "pointer-events-none"
                : "pointer-events-auto"
            }`}
          >
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
          <FcGoogle className="text-[2rem]" />
          Continue with Google
        </button>
      </section>
      <Attribution />
    </div>
  );
};

export default SignIn;
