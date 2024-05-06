// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA71-VMlojv2bH2gRg1vp0MrvLt62y0RdU",
  authDomain: "sample-project-b6505.firebaseapp.com",
  databaseURL: "https://sample-project-b6505-default-rtdb.firebaseio.com",
  projectId: "sample-project-b6505",
  storageBucket: "sample-project-b6505.appspot.com",
  messagingSenderId: "707674305404",
  appId: "1:707674305404:web:1f730f084f624a79c6eaf9",
  measurementId: "G-S6NZFEYW3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};