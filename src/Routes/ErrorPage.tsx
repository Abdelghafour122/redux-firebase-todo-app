import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-page h-full w-full bg-neutral-200 dark:bg-neutral-600">
      <div className="container h-full w-full">
        <div className="redirect flex flex-col items-center justify-center gap-4 h-full w-full">
          <h2 className="form-title">An error has occured!</h2>
          <p className="text-lg font-medium text-center">
            Something has gone wrong, try refreshing or go back to Homepage.
          </p>
          <Link className="link" to="/">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
