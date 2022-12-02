import React from "react";

type Props = {
  titleContent: string;
};

const PageTitle = ({ titleContent }: Props) => {
  return <h2 className="form-title">{titleContent}</h2>;
};

export default PageTitle;
