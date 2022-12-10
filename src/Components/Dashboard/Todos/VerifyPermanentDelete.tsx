import React from "react";
import { useAppDispatch } from "../../../App/hooks";
import { permanentlyDeleteTodoThnuk } from "../../../Reducerss/todoSlice";

type Props = {
  id: string;
  handleCloseVerifyDeleteBackdrop: () => void;
};

const VerifyPermanentDelete = ({
  handleCloseVerifyDeleteBackdrop,
  id,
}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="backdrop">
      <section className="flex flex-col items-center justify-between gap-10 w-1/3 max-w-md min-h-max p-4 bg-neutral-900 rounded-md shadow-md">
        <h1 className="font-bold text-xl self-start">
          Delete the todo permanently?
        </h1>
        <div className="btn-holder self-end flex w-1/2 items-center justify-between">
          <button
            className="button"
            onClick={() => handleCloseVerifyDeleteBackdrop()}
          >
            Cancel
          </button>
          <button
            className="button"
            onClick={async () => {
              await dispatch(permanentlyDeleteTodoThnuk(id));
              handleCloseVerifyDeleteBackdrop();
            }}
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  );
};

export default VerifyPermanentDelete;
