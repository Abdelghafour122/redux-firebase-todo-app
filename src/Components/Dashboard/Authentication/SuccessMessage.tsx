import React from "react";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  messageContent: string;
};

const SuccessMessage = ({ messageContent }: Props) => {
  return (
    <div className="form-success-message w-60 md:w-80 lg:w-96">
      <FaCheckCircle className="text-[1.5rem]" />
      <p>{messageContent}</p>
    </div>
  );
};

export default SuccessMessage;
