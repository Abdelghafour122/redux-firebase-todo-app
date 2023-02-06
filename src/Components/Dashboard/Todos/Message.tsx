import React from "react";

type Props = {
  message: string;
};

const Message = ({ message }: Props) => {
  return (
    <p className="self-center text-center text-xl text-stone-600 dark:text-stone-400">
      {message}
    </p>
  );
};

export default Message;
