import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";

type Props = {
  messageContent: string;
};

const ErrorMessage = ({ messageContent }: Props) => {
  return (
    <div className="form-error-message w-60 md:w-80 lg:w-96">
      <FaRegTimesCircle size="1.5rem" />
      <p>{messageContent}</p>
    </div>
  );
};

export default ErrorMessage;
