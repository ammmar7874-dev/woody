import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCk0cvDdSMEkZfGr4-HftXk8-DyyrJlJuE",
    authDomain: "songaplayer-8287c.firebaseapp.com",
    projectId: "songaplayer-8287c",
    storageBucket: "songaplayer-8287c.firebasestorage.app",
    messagingSenderId: "820606920588",
    appId: "1:820606920588:web:8dfa97dbf5a0eab31118a9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
