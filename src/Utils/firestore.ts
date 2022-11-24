import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "../firebase";
import { Labels, Todos } from "./types";

export const todoDatabase = getFirestore(app);
const todosCollection = collection(todoDatabase, "todos");
const labelsCollection = collection(todoDatabase, "labels");

// TODOS FETCHING FUNCTION:
export const getTodosList = async () => {
  const result = await getDocs(todosCollection)
    .then(
      (res) =>
        [
          ...res.docs.map((data) => {
            let todosObjectProperties = data.data();
            return { id: data.id.toString(), ...todosObjectProperties };
          }),
        ] as Todos
    )
    .then((finalRes) => {
      return finalRes;
    });
  return result;
};

// LABELS FETCHING FUNCTION
export const getLabelsList = async () => {
  const result = await getDocs(labelsCollection)
    .then(
      (res) =>
        [
          ...res.docs.map((data) => {
            let labelsObjectProperties = data.data();
            return { id: data.id.toString(), ...labelsObjectProperties };
          }),
        ] as Labels
    )
    .then((finalRes) => finalRes);
  return result;
};

// FETCH A SECIFIC LABEL'S COUNT
export const getSpecificLabelCount = async (labelId: string) => {
  const labelRef = doc(todoDatabase, "labels", labelId);
  const res = await getDoc(labelRef).then((result) => {
    if (result.exists()) {
      return result.data();
    } else console.log("label not found in database");
  });
  return res;
};
