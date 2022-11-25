import React from "react";

type Props = {
  header: string;
};

const LittleSectionHeader = ({ header }: Props) => {
  return <p className="section-small-header">{header}</p>;
};

export default LittleSectionHeader;
