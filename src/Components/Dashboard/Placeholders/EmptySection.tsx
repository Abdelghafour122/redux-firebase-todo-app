import React from "react";
import Message from "../Todos/Message";
import { IconType } from "react-icons";

type Props = {
  message: string;
  Icon: IconType;
};

const EmptySection = ({ Icon, message }: Props) => {
  return (
    <div className="h-full w-full flex flex-col text-zinc-500 items-center justify-start gap-10">
      <Message message={message} />
      <Icon color="rgb(113 113 122)" size={"15rem"} />
    </div>
  );
};

export default EmptySection;
