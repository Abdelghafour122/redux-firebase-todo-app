import React, { useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { EditTodoParamsType } from "../../Utils/types";
import { useTodoContext } from "../../Contexts/TodoContext";
import { Timestamp } from "firebase/firestore";
import { FaTimes } from "react-icons/fa";

type Props = {
  handleCloseEditTodoBackdrop: () => void;
  todoInfo: EditTodoParamsType;
};

const EditTodoBackdrop = ({ handleCloseEditTodoBackdrop, todoInfo }: Props) => {
  const { editTodoItem } = useTodoContext();
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // use try/catch when firebase backend gets involved

    if (
      (editedTodoContent !== "" && editedTodoContent !== todoInfo.content) ||
      (editedTodoTitle !== "" && editedTodoTitle !== todoInfo.title)
    ) {
      editTodoItem({
        id: todoInfo.id,
        title: editedTodoTitle,
        content: editedTodoContent,
        date: Timestamp.now(),
      });
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
            {/* <VscChromeClose color="rgb(231 229 228)" size="1.5rem" /> */}
            <FaTimes color="rgb(231 229 228)" size="1.5rem" />
          </button>
        </div>
        <form
          action=""
          className="flex flex-col gap-4 p-2 border-2 border-neutral-900 rounded-lg bg-neutral-700 w-full"
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
          <button className="button" disabled={buttonDisabled}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTodoBackdrop;
