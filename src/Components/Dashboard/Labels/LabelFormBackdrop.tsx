import React, { useState, useEffect, useRef } from "react";
import { MdOutlineDone } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useTodoContext } from "../../../Contexts/TodoContext";
import LabelContentHolder from "./LabelContentHolder";

type Props = {
  handleCloseLabelsBackdrop: () => void;
};

const LabelFormBackdrop = ({ handleCloseLabelsBackdrop }: Props) => {
  const { addLabel, labelsArray, fetchLabels } = useTodoContext();
  const [label, setLabel] = useState("");
  const labelValid = useRef(true);
  const labelExists = useRef(false);
  const [listLimitReached, setListLimitReached] = useState(false);

  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  useEffect(() => {
    if (labelsArray.length >= 5) setListLimitReached(true);
    else if (labelsArray.length < 5) setListLimitReached(false);
  }, [labelsArray]);

  useEffect(() => {
    label.trim().length >= 20
      ? (labelValid.current = false)
      : (labelValid.current = true);
    labelExists.current = false;
  }, [label, labelsArray]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    labelsArray.every((l) => l.name !== label) === false
      ? (labelExists.current = true)
      : (labelExists.current = false);
    if (!labelExists.current && labelValid.current && label.trim().length > 0) {
      addLabel({
        name: label.trim(),
        count: 0,
      });
    }
    setLabel("");
  };

  return (
    <div className="backdrop">
      <div className="flex flex-col items-center justify-center basis-2/4">
        <div className="w-full py-3 flex items-center justify-between">
          <p className="text-2xl font-semibold text-stone-50 ">Labels</p>
          <button
            className="p-2 rounded-full hover:bg-neutral-600 active:bg-neutral-500"
            onClick={handleCloseLabelsBackdrop}
          >
            {/* <VscChromeClose color="rgb(231 229 228)" size="1.5rem" /> */}
            <FaTimes color="rgb(231 229 228)" size="1.5rem" />
          </button>
        </div>
        <div className="flex flex-col gap-2 p-2 border-2 border-neutral-900 rounded-lg bg-neutral-700 w-full">
          <form action="" className="w-full" onSubmit={handleSubmit}>
            <div className="flex gap-2 w-full">
              <input
                type="text"
                placeholder="Add label"
                className={`todo-form-input flex-1 text-xl font-semibold ${
                  !labelValid.current &&
                  "text-red-600 caret-red-600 border-red-600 focus:border-red-600"
                } ${
                  listLimitReached &&
                  "text-amber-600 placeholder-amber-600 border-amber-600 focus:border-amber-600 opacity-60 cursor-not-allowed"
                }`}
                value={label}
                disabled={listLimitReached}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLabel(e.target.value)
                }
              />
              <button
                className="rounded-sm hover:bg-neutral-500 active:bg-neutral-400 p-2 disabled:opacity-0 disabled:pointer-events-none transition-opacity duration-300"
                onClick={handleSubmit}
                disabled={!labelValid.current || label === ""}
              >
                {/* <MdOutlineDone size={"1.4rem"} /> */}
                <FaCheck size={"1.4rem"} color="rgb(231 229 228)" />
              </button>
            </div>
          </form>
          {labelValid.current === false ? (
            <p className="-mt-2 text-red-600 font-semibold">
              Label length should be below 20 letters!
            </p>
          ) : null}
          {listLimitReached === true ? (
            <p className="-mt-2 text-amber-400 font-semibold">
              Labels limit is reached.
            </p>
          ) : null}
          {labelExists.current ? (
            <p className="-mt-2 text-amber-400 font-semibold">
              Label already exists.
            </p>
          ) : null}
          <LabelContentHolder />
        </div>
      </div>
    </div>
  );
};

export default LabelFormBackdrop;
