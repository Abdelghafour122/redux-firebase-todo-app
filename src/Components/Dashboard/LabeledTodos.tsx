import React from "react";
import { MdLabelOff } from "react-icons/md";
import LabeledTodosContainer from "./Containers/LabeledTodosContainer";
import EmptySection from "./Placeholders/EmptySection";

type Props = {
  id: string;
  name: string;
  count: number;
};

// THE ACTUAL COMPONENT
const LabeledTodos = ({ id, count, name }: Props) => {
  return (
    <div className="labeled-todos w-full h-full flex flex-wrap gap-2 justify-start mt-8">
      {count === 0 ? (
        <EmptySection
          message={"No todos with this label yet"}
          Icon={MdLabelOff}
        />
      ) : (
        <LabeledTodosContainer id={id} name={name} />
      )}
    </div>
  );
};

export default LabeledTodos;
