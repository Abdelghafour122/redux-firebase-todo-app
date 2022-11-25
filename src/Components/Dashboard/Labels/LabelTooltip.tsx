import React from "react";

type Props = {
  tooltipContent: string;
};

const LabelTooltip = ({ tooltipContent }: Props) => {
  return <div className="label-tooltip">{tooltipContent}</div>;
};

export default LabelTooltip;
