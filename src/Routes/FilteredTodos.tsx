import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTodoContext } from "../Contexts/TodoContext";
import { Label } from "../Utils/types";
import LabeledTodos from "./Dashboard/LabeledTodos";

// USED AS A ROUTE
const FilteredTodos = () => {
  const { labelsArray } = useTodoContext();
  const [selectedLabel, setSelectedLabel] = useState<Label>();

  let { labelId } = useParams();
  useEffect(() => {
    labelsArray.forEach(
      (label) => label.id === labelId && setSelectedLabel(() => label)
    );
  }, [labelId, labelsArray]);

  return (
    <div className="filtered-todos h-full w-full flex items-start justify-start">
      {selectedLabel === undefined ? (
        <p>No label has been set yet!</p>
      ) : (
        <LabeledTodos
          id={selectedLabel.id}
          name={selectedLabel.name}
          count={selectedLabel.count}
        />
      )}
    </div>
  );
};

export default FilteredTodos;
