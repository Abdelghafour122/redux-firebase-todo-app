import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { editLabelCountThunk } from "../../../Reducerss/labelSlice";
import { permanentlyDeleteTodoThnuk } from "../../../Reducerss/todoSlice";
import { getSpecificLabelCount } from "../../../Utils/firestore";
import { checkIfLoading, Labels } from "../../../Utils/types";

type Props = {
  id: string;
  labelList: Labels;
  handleCloseVerifyDeleteBackdrop: () => void;
};

const VerifyPermanentDelete = ({
  handleCloseVerifyDeleteBackdrop,
  id,
  labelList,
}: Props) => {
  const dispatch = useAppDispatch();
  const globalLabelList = useAppSelector((state) => state.labels.labelsList);

  const permanentlyDeleteTodoThunkStatus = useAppSelector(
    (state) => state.todos.status.permanentlyDeleteTodoStatus
  );

  const handlePermanentDelete = async () => {
    globalLabelList.forEach(async (globalLabel) => {
      const mutualLabel = labelList.find(
        (localLabel) => localLabel.id === globalLabel.id
      );
      if (mutualLabel !== undefined) {
        const labelCount = await getSpecificLabelCount(mutualLabel.id);
        await dispatch(
          editLabelCountThunk({
            id: mutualLabel.id,
            count: (labelCount?.count - 1) as number,
          })
        );
      }
    });
    await dispatch(permanentlyDeleteTodoThnuk(id));
    return handleCloseVerifyDeleteBackdrop();
  };

  return (
    <div className="backdrop">
      <section className="flex flex-col items-center justify-between gap-10  min-h-max p-4 dark:bg-neutral-900 bg-neutral-400 rounded-md shadow-md">
        <h1 className="font-bold text-xl self-start text-stone-800 dark:text-stone-200">
          Delete the todo permanently?
        </h1>
        <div className="btn-holder self-end flex gap-2 w-min items-center justify-between">
          <button
            className="button"
            onClick={() => handleCloseVerifyDeleteBackdrop()}
            disabled={checkIfLoading(permanentlyDeleteTodoThunkStatus)}
          >
            Cancel
          </button>
          <button
            className="button flex items-center justify-between"
            disabled={checkIfLoading(permanentlyDeleteTodoThunkStatus)}
            onClick={handlePermanentDelete}
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
