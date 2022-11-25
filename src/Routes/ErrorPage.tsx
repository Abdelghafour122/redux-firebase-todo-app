import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const ErrorPage = (props: Props) => {
  return (
    <div className="error-page">
      <div className="container">
        <div className="redirect flex flex-col items-center justify-center gap-4">
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
