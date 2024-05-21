// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "it-guru-blog.firebaseapp.com",
  projectId: "it-guru-blog",
  storageBucket: "it-guru-blog.appspot.com",
  messagingSenderId: "162331569884",
  appId: "1:162331569884:web:1ea2d07fba1a2ca016ce19"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);