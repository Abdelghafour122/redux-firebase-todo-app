import React from "react";

type Props = {
  helperTextContent: string;
};

const InputHelperText = ({ helperTextContent }: Props) => {
  return (
    <p className="self-start italic font-semibold text-[14px] text-red-500">
      {helperTextContent}
    </p>
  );
};

export default InputHelperText;
