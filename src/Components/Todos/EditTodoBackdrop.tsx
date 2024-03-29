import React, { useEffect, useState } from "react";
import { EditTodoParamsType, checkIfLoading } from "../../Utils/types";
import { Timestamp } from "firebase/firestore";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { editTodoThunk } from "../../Reducerss/todoSlice";

type Props = {
  handleCloseEditTodoBackdrop: () => void;
  todoInfo: EditTodoParamsType;
};

const EditTodoBackdrop = ({ handleCloseEditTodoBackdrop, todoInfo }: Props) => {
  const dispatch = useAppDispatch();
  const editTodoThunkStatus = useAppSelector(
    (state) => state.todos.status.editTodoStatus
  );

  const [editedTodoTitle, setEditedTodoTitle] = useState<string>(
    todoInfo.title
  );
  const [editedTodoContent, setEditedTodoContent] = useState<string>(
    todoInfo.content
  );

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    (editedTodoContent !== "" && editedTodoContent !== todoInfo.content) ||
    (editedTodoTitle !== "" && editedTodoTitle !== todoInfo.title)
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  }, [editedTodoContent, editedTodoTitle, todoInfo.title, todoInfo.content]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (
      (editedTodoContent !== "" && editedTodoContent !== todoInfo.content) ||
      (editedTodoTitle !== "" && editedTodoTitle !== todoInfo.title)
    ) {
      await dispatch(
        editTodoThunk({
          id: todoInfo.id,
          title: editedTodoTitle,
          content: editedTodoContent,
          date: Timestamp.now(),
        })
      );

      // set a success message
      handleCloseEditTodoBackdrop();
    } else if (editedTodoContent === "" || editedTodoTitle === "") {
      // set an error message
      console.log("can't leave the fields blank!");
    }
  };
  return (
    <div className="edit-todo backdrop">
      <div className="flex flex-col items-center justify-center basis-2/4">
        <div className="w-full py-3 flex items-center justify-between">
          <p className="text-2xl font-semibold text-stone-200 ">
            Edit the todo
          </p>
          <button
            className="p-2 rounded-full hover:bg-neutral-600 active:bg-neutral-500"
            onClick={handleCloseEditTodoBackdrop}
          >
            <FaTimes color="rgb(231 229 228)" className="text-[1.5rem]" />
          </button>
        </div>
        <form
          action=""
          className="flex flex-col gap-4 p-2 border-2 border-neutral-900 rounded-lg bg-neutral-300 dark:bg-neutral-700 w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="todo-form-input text-xl font-semibold"
            placeholder="Don't leave the title blank"
            value={editedTodoTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditedTodoTitle(e.target.value)
            }
          />
          <textarea
            rows={5}
            className="todo-form-input resize-none"
            placeholder="Don't leave the content blank"
            value={editedTodoContent}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEditedTodoContent(e.target.value)
            }
          />
          <button
            className="button flex align-center justify-center"
            disabled={buttonDisabled || checkIfLoading(editTodoThunkStatus)}
          >
            {checkIfLoading(editTodoThunkStatus) ? (
              <>
                Updating &nbsp;
                <FaSpinner className="animate-spin text-stone-100 dark:text-stone-900 text-[1.5rem]" />
              </>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTodoBackdrop;
