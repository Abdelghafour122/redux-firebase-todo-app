import React from "react";

type Props = {
  helperText: string;
  error: boolean;
};

const LabelHelperText = ({ helperText, error }: Props) => {
  return (
    <div
      className={`${
        error
          ? "text-red-600 font-semibold"
          : "text-stone-700 dark:text-stone-400"
      } font-medium text-xs w-full`}
    >
      {helperText}
    </div>
  );
};

export default LabelHelperText;
