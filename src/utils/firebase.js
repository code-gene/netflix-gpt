// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU3mNygiKHF3_3aqRB82rCOOpITgLWGv4",
  authDomain: "netflixgpt-a476c.firebaseapp.com",
  projectId: "netflixgpt-a476c",
  storageBucket: "netflixgpt-a476c.appspot.com",
  messagingSenderId: "556827035731",
  appId: "1:556827035731:web:e193e7c613a2eb668b1ea6",
  measurementId: "G-6W8QZCSDYJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
