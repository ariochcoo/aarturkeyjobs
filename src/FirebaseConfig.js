import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyCWTruMf8JeSP9kbBpz6RD3QNFMsTG87iw",
  authDomain: "aarjapanturkey-4537c.firebaseapp.com",
  projectId: "aarjapanturkey-4537c",
  storageBucket: "aarjapanturkey-4537c.appspot.com",
  messagingSenderId: "205628069106",
  appId: "1:205628069106:web:523ee1f426897d2b7f2c6b",
  measurementId: "G-HLWN64H1QQ",
};
//Version 8
//const classicFirebaseApp = firebase.initializeApp(config);
//const auth = classicFirebaseApp.auth();
//const firestore = classicFirebaseApp.firestore();
//const storage = classicFirebaseApp.storage();

//version 9
const firebaseApp = initializeApp(config);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const firebaseConfig = {
  auth,
  firestore,
  storage,
};

export default firebaseConfig;
