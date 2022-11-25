import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../Contexts/AuthContext";
import { VscError } from "react-icons/vsc";

import { FcGoogle } from "react-icons/fc";
import Attribution from "../Components/Dashboard/Attribution";

const SignIn = () => {
  const navigate = useNavigate();
  const { userSignIn, signInWithGoogle, EMAIL_REGEX } = useAuthentication();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const [validEmail, setValidEmail] = useState(true);
  const [emailFocus, setEmailFocus] = useState(false);

  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [errormessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      setErrorMessage("");
      setLoading(true);
      if (
        emailRef.current?.value !== undefined &&
        passwordRef.current?.value !== undefined
      )
        await userSignIn(emailRef.current?.value, passwordRef.current?.value);
      navigate("/dashboard");
    } catch {
      setErrorMessage("An error has occurred, can't log in.");
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setErrorMessage("");
      setLoading(true);
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("An error has occurred, can't log in.");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (emailRef.current?.value !== undefined && emailRef.current?.value !== "")
      setValidEmail(EMAIL_REGEX.test(emailRef.current?.value));
  }, [emailRef.current?.value, EMAIL_REGEX]);

  return (
    <div className="sign-in">
      <h2 className="form-title">Sign In</h2>
      {errormessage !== "" && (
        <div className="form-error-message w-60 md:w-80 lg:w-96">
          <VscError size="1.5rem" />
          <p>{errormessage}</p>
        </div>
      )}
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
          {emailFocus && !validEmail && <p>Invalid Email Address</p>}
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
        onClick={handleGoogleSignIn}
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
