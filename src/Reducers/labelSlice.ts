import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../App/store";
import { getLabelsList } from "../Utils/firestore";
import { Labels } from "../Utils/types";

const labelsInitialState: Labels = [];

export const fetchLabelsThunk = createAsyncThunk(
  "labels/fetchLabels",
  async () => {
    const fetchedLabels = await getLabelsList();
    return fetchedLabels;
  }
);

const labelSlice = createSlice({
  name: "label",
  initialState: labelsInitialState,
  reducers: {
    addLabel: () => {},
    deleteLabel: () => {},
    editLabel: () => {},
  },
});

export default labelSlice.reducer;
export const { addLabel, deleteLabel, editLabel } = labelSlice.actions;
export const selectLabelsValue = (state: RootState) => state.labels;
