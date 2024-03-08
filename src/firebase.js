// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU5ZuctFbsMXAAFTzxYjEC8KxGpbAnPbk",
  authDomain: "clinicalcontinuity.firebaseapp.com",
  projectId: "clinicalcontinuity",
  storageBucket: "clinicalcontinuity.appspot.com",
  messagingSenderId: "997578282193",
  appId: "1:997578282193:web:1a3473c9713b5650e761f0",
  measurementId: "G-WKL9E3ZSEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);