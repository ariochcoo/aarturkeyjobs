import firebase from "./FirebaseConfig";
import {
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // sendPasswordResetEmail,
  // signInWithPopup,
  // GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const auth = firebase.auth;

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
  return auth.signOut();
};

const subscribeToAuthChanges = (handleAuthChange) => {
  onAuthStateChanged(auth, (user) => {
    handleAuthChange(user);
  });
};

const FirebaseAuthService = {
  loginUser,
  logoutUser,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
