// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "yemek-planlayici.firebaseapp.com",
  projectId: "yemek-planlayici",
  storageBucket: "yemek-planlayici.firebasestorage.app",
  messagingSenderId: "520677925467",
  appId: "1:520677925467:web:92e2b5fd9294763ff7d57e",
  measurementId: "G-NYBMQ10MK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};
