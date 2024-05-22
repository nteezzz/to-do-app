// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC2Peen6EGllP22cyHsfDURf58upa5bgNo",
  authDomain: "to-do-app-e1e58.firebaseapp.com",
  projectId: "to-do-app-e1e58",
  storageBucket: "to-do-app-e1e58.appspot.com",
  messagingSenderId: "384559612987",
  appId: "1:384559612987:web:21e7bd15079249c0a8481e",
  measurementId: "G-LYKP6G2CRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);
