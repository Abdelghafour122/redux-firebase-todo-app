import { Labels } from "../Utils/types";

export const labelsInitialState = { labelsList: [] as Labels };

export const labelsReducerActions = {
  FETCH_LABEL_ITEM: "FETCH_LABEL_ITEM",
  ADD_LABEL_ITEM: "ADD_LABEL_ITEM",
  DELETE_LABEL_ITEM: "REMOVE_LABEL_ITEM",
  EDIT_LABEL_ITEM: "EDIT_LABEL_ITEM",
};
