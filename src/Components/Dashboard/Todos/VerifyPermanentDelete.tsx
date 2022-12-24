import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { permanentlyDeleteTodoThnuk } from "../../../Reducerss/todoSlice";
import { checkIfLoading } from "../../../Utils/types";

type Props = {
  id: string;
  handleCloseVerifyDeleteBackdrop: () => void;
};

const VerifyPermanentDelete = ({
  handleCloseVerifyDeleteBackdrop,
  id,
}: Props) => {
  const dispatch = useAppDispatch();

  const permanentlyDeleteTodoThunkStatus = useAppSelector(
    (state) => state.todos.status.permanentlyDeleteTodoStatus
  );

  return (
    <div className="backdrop">
      <section className="flex flex-col items-center justify-between gap-10  min-h-max p-4 bg-neutral-900 rounded-md shadow-md">
        <h1 className="font-bold text-xl self-start">
          Delete the todo permanently?
        </h1>
        <div className="btn-holder self-end flex gap-2 w-min items-center justify-between">
          <button
            className="button"
            onClick={() => handleCloseVerifyDeleteBackdrop()}
          >
            Cancel
          </button>
          <button
            className="button flex items-center justify-between"
            disabled={checkIfLoading(permanentlyDeleteTodoThunkStatus)}
            onClick={async () => {
              await dispatch(permanentlyDeleteTodoThnuk(id));
              handleCloseVerifyDeleteBackdrop();
            }}
          >
            {checkIfLoading(permanentlyDeleteTodoThunkStatus) ? (
              <>
                Deleting&nbsp;
                <FaSpinner size={"1.3rem"} className="animate-spin" />
              </>
            ) : (
              <>Delete</>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default VerifyPermanentDelete;
