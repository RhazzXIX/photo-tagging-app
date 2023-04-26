import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const fbAPP = initializeApp({
  apiKey: "AIzaSyD3iQ-Ymc_2B5SAPyYQdoOHKc12UH3p5tQ",
  authDomain: "photo-tagging-app-ee203.firebaseapp.com",
  projectId: "photo-tagging-app-ee203",
  storageBucket: "photo-tagging-app-ee203.appspot.com",
  messagingSenderId: "387871215062",
  appId: "1:387871215062:web:483ebb3230a6dbaa126877",
  measurementId: "G-JSFBSH54XH",
});

const storage = getStorage(fbAPP);

const database = getFirestore(fbAPP);

const auth = getAuth(fbAPP);

export { storage, database, auth };
