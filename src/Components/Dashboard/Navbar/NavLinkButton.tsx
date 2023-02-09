import React from "react";
import { IconType } from "react-icons";

type Props = {
  selected: boolean;
  handleSelectNavButtons: (i: number) => void;
  onNavigate: () => void;
  index: number;
  Icon: IconType;
};

const NavLinkButton = (Props: Props) => {
  return (
    <button
      className={`p-3 bg-stone-300 dark:bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] dark:hover:bg-stone-600 active:bg-stone-200 dark:active:bg-stone-500 ${
        Props.selected ? "bg-stone-50 dark:bg-stone-500 rounded-[10px]" : ""
      }`}
      onClick={() => {
        Props.handleSelectNavButtons(Props.index);
        Props.onNavigate();
      }}
    >
      <Props.Icon
        className="text-orange-600 dark:text-orange-300"
        size={"1.7rem"}
      />
    </button>
  );
};

export default NavLinkButton;
