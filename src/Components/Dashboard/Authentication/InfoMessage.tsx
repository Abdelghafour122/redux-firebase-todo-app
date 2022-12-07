import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const InfoMessage = () => {
  return (
    <div className="form-info-message w-60 md:w-80 lg:w-96">
      <AiOutlineInfoCircle size="2.2rem" />
      <p>
        If you have an account, you will recieve an email to reset your password
        in your inbox.
      </p>
    </div>
  );
};

export default InfoMessage;
