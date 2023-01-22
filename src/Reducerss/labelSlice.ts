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
  Label,
  LabelFuncsLoadingStatus,
  Labels,
  LoadingStatus,
  UpdateLabelCountParamsTypeRedux,
  UpdateLabelNameParamsTypeRedux,
} from "../Utils/types";

type labelsInitialStateType = {
  labelsList: Labels;
  status: LabelFuncsLoadingStatus;
  error: null | string;
};

const initialStatus: LabelFuncsLoadingStatus = {
  fetchLabelStatus: LoadingStatus.idle,
  addLabelStatus: LoadingStatus.idle,
  handleLabelStatus: { labelStatus: LoadingStatus.idle },
};

const labelsInitialState: labelsInitialStateType = {
  labelsList: [],
  status: initialStatus,
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
    return JSON.stringify(editLabelPayload);
  }
);

export const editLabelNameThunk = createAsyncThunk(
  "labels/editLabelName",
  async (editLabelPayload: UpdateLabelNameParamsTypeRedux) => {
    const editLabelDocRef = doc(todoDatabase, "labels", editLabelPayload.id);
    await updateDoc(editLabelDocRef, {
      name: editLabelPayload.name,
    });
    return JSON.stringify(editLabelPayload);
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
    return JSON.stringify(deleteLabelPayload.labelId);
  }
);

const labelSlice = createSlice({
  name: "label",
  initialState: labelsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLabelsThunk.pending, (state) => {
        state.status.fetchLabelStatus = LoadingStatus.pending;
      })
      .addCase(fetchLabelsThunk.fulfilled, (state, { payload }) => {
        state.status.fetchLabelStatus = LoadingStatus.succeeded;
        state.labelsList = JSON.parse(payload);
      })
      // .addCase(fetchLabelsThunk.rejected, (state) => {
      //   state.status.fetchLabelStatus = LoadingStatus.failed;
      // })
      .addCase(addLabelThunk.pending, (state) => {
        state.status.addLabelStatus = LoadingStatus.pending;
      })
      .addCase(addLabelThunk.fulfilled, (state, { payload }) => {
        state.status.addLabelStatus = LoadingStatus.succeeded;
        state.labelsList.push(JSON.parse(payload));
      })
      // .addCase(addLabelThunk.rejected, (state) => {
      //   state.status.addLabelStatus = LoadingStatus.failed;
      // })
      //EDIT LABEL COUNT
      .addCase(editLabelCountThunk.pending, (state, { meta }) => {
        // state.status.editLabelStatus = {
        //   labelId: meta.arg.id,
        //   labelStatus: LoadingStatus.pending,
        // };
        state.status.handleLabelStatus = {
          labelId: meta.arg.id,
          labelStatus: LoadingStatus.pending,
        };
      })
      .addCase(editLabelCountThunk.fulfilled, (state, { payload }) => {
        // state.status.editLabelStatus.labelStatus = LoadingStatus.succeeded;
        state.status.handleLabelStatus.labelStatus = LoadingStatus.succeeded;
        const parsedPayload: UpdateLabelCountParamsTypeRedux =
          JSON.parse(payload);

        // REPLACE WITH MAP
        const editedLabel = state.labelsList.find(
          (label) => label.id === parsedPayload.id
        );
        if (editedLabel !== undefined) editedLabel.count = parsedPayload.count;
      }) //EDIT LABEL NAME
      .addCase(editLabelNameThunk.pending, (state, { meta }) => {
        // state.status.editLabelStatus = {
        //   labelId: meta.arg.id,
        //   labelStatus: LoadingStatus.pending,
        // };
        state.status.handleLabelStatus = {
          labelId: meta.arg.id,
          labelStatus: LoadingStatus.pending,
        };
      })
      .addCase(editLabelNameThunk.fulfilled, (state, { payload }) => {
        state.status.handleLabelStatus.labelStatus = LoadingStatus.succeeded;
        const parsedPayload: UpdateLabelNameParamsTypeRedux =
          JSON.parse(payload);

        const editedLabel = state.labelsList.find(
          (label) => label.id === parsedPayload.id
        );
        if (editedLabel !== undefined) editedLabel.name = parsedPayload.name;
      })
      .addCase(deleteLabelThunk.pending, (state, { meta }) => {
        state.status.handleLabelStatus = {
          labelId: meta.arg.labelId,
          labelStatus: LoadingStatus.pending,
        };
      })
      .addCase(deleteLabelThunk.fulfilled, (state, { payload }) => {
        state.status.handleLabelStatus.labelStatus = LoadingStatus.succeeded;
        state.labelsList = state.labelsList.filter(
          (label) => label.id !== JSON.parse(payload)
        );
      });
  },
});

export default labelSlice.reducer;
export const {} = labelSlice.actions;
export const selectLabelsValue = (state: RootState) => state.labels;
