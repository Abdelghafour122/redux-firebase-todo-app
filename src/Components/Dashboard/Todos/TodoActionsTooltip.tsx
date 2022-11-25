import React from "react";

type Props = {
  text: string;
};

const TodoActionsTooltip = ({ text }: Props) => {
  return <div className="todo-actions-tooltip">{text}</div>;
};

export default TodoActionsTooltip;
