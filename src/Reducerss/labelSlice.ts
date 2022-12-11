import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { RootState } from "../App/store";
import {
  getLabelsList,
  labelsCollection,
  todoDatabase,
} from "../Utils/firestore";
import {
  AddLabelParamsType,
  DeleteLabelParamsType,
  Labels,
  LoadingStatus,
  UpdateLabelCountParamsTypeRedux,
  UpdateLabelNameParamsTypeRedux,
} from "../Utils/types";

// const labelsInitialState: Labels = [];

type labelsInitialStateType = {
  labelsList: Labels;
  status: LoadingStatus;
  error: null | string;
};

const labelsInitialState: labelsInitialStateType = {
  labelsList: [],
  status: LoadingStatus.pending,
  error: null,
};

export const fetchLabelsThunk = createAsyncThunk(
  "labels/fetchLabels",
  async () => {
    const fetchedLabels = await getLabelsList();
    return JSON.stringify(fetchedLabels);
  }
);

export const addLabelThunk = createAsyncThunk(
  "labels/addLabel",
  async (addLabelPayload: AddLabelParamsType) => {
    let documentId = "";
    await addDoc(labelsCollection, addLabelPayload).then(
      (doc) => (documentId = doc.id)
    );
    return JSON.stringify({ ...addLabelPayload, id: documentId });
  }
);

export const editLabelCountThunk = createAsyncThunk(
  "labels/editLabelCount",
  async (editLabelPayload: UpdateLabelCountParamsTypeRedux) => {
    const editLabelDocRef = doc(todoDatabase, "labels", editLabelPayload.id);
    await updateDoc(editLabelDocRef, {
      count: editLabelPayload.count,
    });
  }
);

export const editLabelNameThunk = createAsyncThunk(
  "labels/editLabelCount",
  async (editLabelPayload: UpdateLabelNameParamsTypeRedux) => {
    const editLabelDocRef = doc(todoDatabase, "labels", editLabelPayload.id);
    await updateDoc(editLabelDocRef, {
      name: editLabelPayload.name,
    });
  }
);

export const deleteLabelThunk = createAsyncThunk(
  "labels/deleteLabel",
  async (deleteLabelPayload: DeleteLabelParamsType) => {
    const deleteLabelDocRef = doc(
      todoDatabase,
      "labels",
      deleteLabelPayload.labelId
    );
    await deleteDoc(deleteLabelDocRef);
    return JSON.stringify(deleteLabelPayload);
  }
);

const labelSlice = createSlice({
  name: "label",
  initialState: labelsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLabelsThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(fetchLabelsThunk.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.succeeded;
        state.labelsList = JSON.parse(payload);
      })
      .addCase(fetchLabelsThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
      })
      .addCase(addLabelThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(addLabelThunk.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.succeeded;
        state.labelsList.push(JSON.parse(payload));
      })
      .addCase(addLabelThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
      });
  },
});

export default labelSlice.reducer;
export const {} = labelSlice.actions;
export const selectLabelsValue = (state: RootState) => state.labels;
