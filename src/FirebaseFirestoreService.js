import firebase from "./FirebaseConfig";
import {
  addDoc,
  //doc,
  //getDoc,
  collection as firestoreCollection,
  getDocs,
  //   query,
  //   where,
  //   orderBy,
  //   limit,
  //   startAfter,
  //   getDocs,
  //   updateDoc,
  //   deleteDoc,
  //collection,
} from "firebase/firestore";

const firestore = firebase.firestore;

const createDocumentPost = (collection, document) => {
  return addDoc(firestoreCollection(firestore, collection), document);
};

const readDocumentsPost = ({ collection }) => {
  const collectionRef = firestoreCollection(firestore, collection);
  return getDocs(collectionRef);
};

const readDocumentsForms = ({ collection, folderId }) => {
  const collectionRefa = firestoreCollection(
    firestore,
    collection,
    folderId,
    "applyform"
  );
  return getDocs(collectionRefa);
};

const createDocumentForm = ({ collection, folderId, document }) => {
  // const docRef = doc(firestore, collection, folderId);
  // const colRef = collection(docRef, document);
  return addDoc(
    firestoreCollection(firestore, collection, folderId, "applyform"),
    document
  );
  // return addDoc(colRef);
};

// import { getFirestore, getDocs, collectionGroup } from "firebase/firestore"
// const db = getFirestore()

// const allPosts = await getDocs(collectionGroup(db, "posts"))

const FirebaseFirestoreService = {
  createDocumentPost,
  readDocumentsPost,
  createDocumentForm,
  readDocumentsForms,
};

export default FirebaseFirestoreService;
