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
    apiKey: "AIzaSyDWakjRI544cJfkyw7-d6XVCIsTDEZ4edE",
    authDomain: "dairy-a3046.firebaseapp.com",
    projectId: "dairy-a3046",
    storageBucket: "dairy-a3046.appspot.com",
    messagingSenderId: "266228402163",
    appId: "1:266228402163:web:8766e028f5efd59c48b486",
    measurementId: "G-WHWD7RMG6L"
};

// Your web app's Firebase configuration for dairy-form-be0d0 project
const firebaseConfig2 = {
    apiKey: "AIzaSyC_OV7ZXL4F2em764Eectob8hn6xRKlIzk",
    authDomain: "admin-295de.firebaseapp.com",
    projectId: "admin-295de",
    storageBucket: "admin-295de.appspot.com",
    messagingSenderId: "805185465764",
    appId: "1:805185465764:web:02ff6fa40c800cda472531",
    measurementId: "G-YT3VB63TGN"
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
