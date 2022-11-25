import React from "react";

type Props = {
  text: string;
  handleCloseSnackbar: () => void;
};

const Snackbar = ({ text, handleCloseSnackbar }: Props) => {
  return (
    <div className="tooltip p-3 rounded-lg absolute bottom-5 left-5 bg-white">
      <p className="font-medium text-stone-700">{text}</p>
    </div>
  );
};

export default Snackbar;
