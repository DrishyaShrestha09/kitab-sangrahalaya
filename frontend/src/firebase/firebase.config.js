// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwAOhzyJMOSp2W1z39aB9JHzguX7CEQow",
  authDomain: "book-store-mern-40a9d.firebaseapp.com",
  projectId: "book-store-mern-40a9d",
  storageBucket: "book-store-mern-40a9d.firebasestorage.app",
  messagingSenderId: "496713394062",
  appId: "1:496713394062:web:a3373fca0b8f88cb3566df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);