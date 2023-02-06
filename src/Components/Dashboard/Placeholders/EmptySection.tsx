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
      <Icon color="rgb(87 83 78)" size={"15rem"} />
    </div>
  );
};

export default EmptySection;
