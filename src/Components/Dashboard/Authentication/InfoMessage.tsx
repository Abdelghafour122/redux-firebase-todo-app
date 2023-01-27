import React from "react";

type Props = {
  text?: string;
};

const InfoMessage = ({ text }: Props) => {
  return (
    <div className="form-info-message w-60 md:w-80 lg:w-96">
      <p>
        {text?.trim()
          ? text
          : "If you have an account, you will recieve an email to reset your password in your inbox."}
      </p>
    </div>
  );
};

export default InfoMessage;
