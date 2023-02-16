import React, { useState, useEffect, useRef } from "react";
import { FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { addLabelThunk } from "../../../Reducerss/labelSlice";
import { checkIfLoading } from "../../../Utils/types";
import LabelContentHolder from "./LabelContentHolder";

type Props = {
  handleCloseLabelsBackdrop: () => void;
};

const LabelFormBackdrop = ({ handleCloseLabelsBackdrop }: Props) => {
  const [label, setLabel] = useState("");
  const labelValid = useRef(true);
  const labelExists = useRef(false);
  const [listLimitReached, setListLimitReached] = useState(false);

  const dispatch = useAppDispatch();
  const labelsArray = useAppSelector((state) => state.labels.labelsList);
  const addLabelThunkStatus = useAppSelector(
    (state) => state.labels.status.addLabelStatus
  );

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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    labelsArray.every((l) => l.name !== label) === false
      ? (labelExists.current = true)
      : (labelExists.current = false);
    if (!labelExists.current && labelValid.current && label.trim().length > 0) {
      await dispatch(
        addLabelThunk({
          name: label.trim(),
          count: 0,
        })
      );
    }
    setLabel("");
  };

  return (
    <div className="backdrop">
      <div className="flex flex-col items-center justify-center w-10/12 sm:w-2/3 md:w-2/3 lg:w-2/5">
        <div className="w-full py-3 flex items-center justify-between">
          <p className="text-2xl font-semibold text-stone-50">Labels</p>
          <button
            className="p-2 rounded-full hover:bg-neutral-600 active:bg-neutral-500"
            onClick={handleCloseLabelsBackdrop}
          >
            <FaTimes
              className="text-stone-50 dark:text-stone-50"
              size="1.5rem"
            />
          </button>
        </div>
        <div className="flex flex-col gap-2 p-2 border-2 border-neutral-900 rounded-lg bg-neutral-300 dark:bg-neutral-700 w-full">
          <form action="" className="w-full" onSubmit={handleSubmit}>
            <div className="flex justify-between gap-2 w-full">
              <input
                type="text"
                placeholder="Add label"
                className={`placeholder:text-stone-200 dark:placeholder:text-stone-400 todo-form-input w-full flex-1 text-xl font-semibold ${
                  !labelValid.current
                    ? "text-red-700 dark:text-red-600 caret-red-700 dark:caret-red-600 border-red-700 dark:border-red-600 focus:border-red-600"
                    : ""
                } ${
                  listLimitReached
                    ? "text-amber-600 dark:text-amber-400 placeholder-amber-800 dark:placeholder-amber-600 border-amber-600 focus:border-amber-600 opacity-60 cursor-not-allowed"
                    : ""
                }`}
                value={label}
                disabled={
                  listLimitReached || checkIfLoading(addLabelThunkStatus)
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLabel(e.target.value)
                }
              />
              {/* MAYBE JUST CHANGE THE PLACEHOLDER INSTEAD OF SHOWING THE HELPER TEXT */}
              {/* IF LABELS LIMIT IS REACHED */}
              <button
                // className="rounded-sm hover:bg-neutral-500 active:bg-neutral-400 p-2 disabled:opacity-0 disabled:pointer-events-none transition-opacity duration-300"
                className="rounded-sm hover:bg-neutral-500 active:bg-neutral-400 disabled:bg-neutral-400 dark:disabled:bg-neutral-600 disabled:cursor-not-allowed p-2"
                onClick={handleSubmit}
                disabled={
                  !labelValid.current ||
                  label === "" ||
                  checkIfLoading(addLabelThunkStatus)
                }
              >
                {checkIfLoading(addLabelThunkStatus) ? (
                  <FaSpinner
                    size={"1.4rem"}
                    className="animate-spin text-stone-50 dark:text-stone-200"
                  />
                ) : (
                  <FaCheck
                    size={"1.4rem"}
                    className="text-stone-50 dark:text-stone-200"
                  />
                )}
              </button>
            </div>
          </form>
          {labelValid.current === false ? (
            <p className="-mt-2 text-red-700 dark:text-red-600 font-semibold">
              Label length should be below 20 letters!
            </p>
          ) : null}
          {listLimitReached === true ? (
            <p className="-mt-2 text-amber-600 dark:text-amber-400 font-semibold">
              Labels limit is reached.
            </p>
          ) : null}
          {labelExists.current ? (
            <p className="-mt-2 text-amber-600 dark:text-amber-400 font-semibold">
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
