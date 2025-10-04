// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzufkMncBzjZfk7jzVugiNP8keXB1m0f0",
  authDomain: "revents-4309e.firebaseapp.com",
  projectId: "revents-4309e",
  storageBucket: "revents-4309e.firebasestorage.app",
  messagingSenderId: "636821717535",
  appId: "1:636821717535:web:8252e5803b897f02c88b2a",
  measurementId: "G-9WQKE9G7L7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

