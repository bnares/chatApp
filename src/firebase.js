// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZGFHNlED-xqss15P9WG6SZm6RF_uG8cE",
  authDomain: "chat-b128c.firebaseapp.com",
  projectId: "chat-b128c",
  storageBucket: "chat-b128c.appspot.com",
  messagingSenderId: "373416932756",
  appId: "1:373416932756:web:d1eca04789783fe9228b81"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// Create a root reference
export const storage = getStorage();
export const db = getFirestore(app);