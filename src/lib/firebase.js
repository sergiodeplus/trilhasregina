import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB3Bd_A9uo4YCDWr4KmAz2n1CNM6euoHXc",
    authDomain: "trilhas-digitais-34d81.firebaseapp.com",
    projectId: "trilhas-digitais-34d81",
    storageBucket: "trilhas-digitais-34d81.firebasestorage.app",
    messagingSenderId: "867614943352",
    appId: "1:867614943352:web:f59c5c6b70a346fe2fa58d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
