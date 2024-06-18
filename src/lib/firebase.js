import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "react-chat-app-7b68f.firebaseapp.com",
  projectId: "react-chat-app-7b68f",
  storageBucket: "react-chat-app-7b68f.appspot.com",
  messagingSenderId: "98019645722",
  appId: "1:98019645722:web:405b4010c29e3caddcf4a3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()