// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { 
    getAuth, 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword, 
} from "firebase/auth";

import { 
    collection, 
    addDoc,
    getFirestore, 
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
  } from "firebase/firestore";

import { 
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

// Your web app's Firebase configuration for admin-panel-bc4fe project
const firebaseConfig = {
  apiKey: "AIzaSyC2m6SuIqywBD8IWM8z55Ncq8nrNi-WxBY",
  authDomain: "admin-panel-bc4fe.firebaseapp.com",
  projectId: "admin-panel-bc4fe",
  storageBucket: "admin-panel-bc4fe.appspot.com",
  messagingSenderId: "591879263166",
  appId: "1:591879263166:web:b008b648f3abb599e29fef",
  measurementId: "G-KX9BXDYYEG"
};

// Your web app's Firebase configuration for dairy-form-be0d0 project
const firebaseConfig2 = {
  apiKey: "AIzaSyAeCPLADrVHzQnY4y0J4WZf1WENr-h4C3A",
  authDomain: "dairy-form-be0d0.firebaseapp.com",
  projectId: "dairy-form-be0d0",
  storageBucket: "dairy-form-be0d0.appspot.com",
  messagingSenderId: "329746620632",
  appId: "1:329746620632:web:cbfa54193ee8e2b24db7ad",
  measurementId: "G-G578TLDQHP"
};

// Initialize Firebase for admin-panel-bc4fe project
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase for dairy-form-be0d0 project
const app2 = initializeApp(firebaseConfig2, "dairy-form-be0d0");
const analytics2 = getAnalytics(app2);

const db1 = getFirestore();
const db2 = getFirestore();

export {
    collection,
    addDoc,
    db1,
    getDocs,
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getAuth,
    onAuthStateChanged,
    updateDoc,
    deleteDoc,
    doc,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    db2,
    query,
}
