import React from "react";

const PasswordGuide = () => {
  return (
    <div className="bg-amber-500 rounded-md my-0 mx-auto p-1 w-60 md:w-80 lg:w-96">
      <ul className="flex flex-col items-start justify-start gap-3">
        <li className="text-[14px] leading-none">
          <p>Passwords should be between 6 and 24 length</p>
        </li>
        <li className="text-[14px] leading-none">
          <p>Should contain uppercase and lowercase letters</p>
        </li>
        <li className="text-[14px] leading-none">
          <p>Should contain at least one number</p>
        </li>
        <li className="text-[14px] leading-none">
          <p>Should contain at least one symbol from: @$!%*?&</p>
        </li>
      </ul>
    </div>
  );
};

export default PasswordGuide;
