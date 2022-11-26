import { Labels, LabelsActions } from "../Utils/types";
import { labelsReducerActions } from "./labelsReducerActionsState";

export const labelsReducer = (
  state: Labels,
  { type, payload }: LabelsActions
): Labels => {
  switch (type) {
    case labelsReducerActions.FETCH_LABEL_ITEM:
      return [...(payload.fetchLabels as Labels)];

    case labelsReducerActions.ADD_LABEL_ITEM:
      return [
        ...state,
        {
          id: payload.id as string,
          name: payload.name as string,
          count: 0,
        },
      ];

    case labelsReducerActions.DELETE_LABEL_ITEM:
      return [...state.filter((label) => label.id !== payload.id)];

    case labelsReducerActions.EDIT_LABEL_ITEM:
      return [
        ...state.map((label) =>
          label.id === payload.id
            ? payload.case === "name"
              ? {
                  ...label,
                  name: payload.name as string,
                }
              : payload.case === "count"
              ? {
                  ...label,
                  count: payload.count as number,
                }
              : label
            : label
        ),
      ];

    default:
      return state;
  }
};
