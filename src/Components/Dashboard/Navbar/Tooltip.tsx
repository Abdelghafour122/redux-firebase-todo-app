import React from "react";

type Props = {
  tooltipContent: string;
};

const Tooltip = ({ tooltipContent }: Props) => {
  return <div className="navbar-tooltip">{tooltipContent}</div>;
};

export default Tooltip;
