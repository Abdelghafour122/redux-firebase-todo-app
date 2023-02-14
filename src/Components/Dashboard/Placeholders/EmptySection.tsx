import React from "react";
import Message from "../Todos/Message";
import { IconType } from "react-icons";

type Props = {
  message: string;
  Icon: IconType;
};

const EmptySection = ({ Icon, message }: Props) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-start gap-10">
      <Message message={message} />
      <Icon className="text-stone-600 dark:text-stone-400 text-[10rem] md:text-[15rem]" />
    </div>
  );
};

export default EmptySection;
