import { getAuth, updateProfile, User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { app } from "../firebase";
import { Labels, Todos } from "./types";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

export const todoDatabase = getFirestore(app);
export const todosCollection = collection(todoDatabase, "todos");
export const labelsCollection = collection(todoDatabase, "labels");

const databaseAuth = getAuth();

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

// FORMAT THE DATE FOR THE DETAILED TODO
export const formatDate = (fetchedDate: Timestamp) => {
  return new Timestamp(fetchedDate.seconds, fetchedDate.nanoseconds)
    .toDate()
    .toLocaleString("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    });
};

const storage = getStorage();

// // UPLOAD A NEW USER IMAGE FILE
// export const uploadUserImageFile = async (imgFile: File) => {
//   const storageRef = ref(storage, `images/${imgFile.name}`);
//   uploadBytes(storageRef, imgFile)
//     .then((snapshot) => {
//       changeUserImage(snapshot.metadata.fullPath);
//     })
//     .then(() => console.log("new user data", databaseAuth.currentUser))
//     .catch((err) => console.error("error while uploading img", err));
// };

// // UPDATE USER'S IMAGE
// export const changeUserImage = async (newImgFullPath: string) => {
//   return await updateProfile(databaseAuth.currentUser as User, {
//     photoURL: newImgFullPath,
//   })
//     .then(() => console.log("done setting new img"))
//     .catch((err) => console.error("some error here: ", err));
// };

// // GET USER IMAGES
// export const getUserImage = async (imgUrl: string) => {
//   const storageRef = ref(storage, imgUrl);
//   return getDownloadURL(storageRef).then((res) => res);
// };
