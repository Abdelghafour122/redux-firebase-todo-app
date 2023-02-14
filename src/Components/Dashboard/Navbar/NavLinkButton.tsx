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
      className={`navbar-select-link ${
        Props.selected ? "bg-stone-50 dark:bg-stone-500 rounded-[10px]" : ""
      }`}
      onClick={() => {
        Props.handleSelectNavButtons(Props.index);
        Props.onNavigate();
      }}
    >
      <Props.Icon className="text-orange-600 dark:text-orange-300 text-[1.7rem]" />
    </button>
  );
};

export default NavLinkButton;
