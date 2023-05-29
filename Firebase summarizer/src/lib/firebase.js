import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Import the functions you need from the SDKs you need

// import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChLxWj_-lZQyEQiuSQrrtp_Z8BkNkx9F8",
  authDomain: "summarize-3e9ea.firebaseapp.com",
  projectId: "summarize-3e9ea",
  storageBucket: "summarize-3e9ea.appspot.com",
  messagingSenderId: "251161734217",
  appId: "1:251161734217:web:7be2b36795f213cef8e398",
  measurementId: "G-ERRZ0PWJ9S"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app); 