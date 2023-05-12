import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_fy0xCRjmzxvFDs_JZ6ME8y4K_dYPpHU",
  authDomain: "alegriatech-2bf22.firebaseapp.com",
  projectId: "alegriatech-2bf22",
  storageBucket: "alegriatech-2bf22.appspot.com",
  messagingSenderId: "109146808970",
  appId: "1:109146808970:web:a0b1fbabb3b78bc1ff0373",
  measurementId: "G-0R11TJNJG1",
};

const app = initializeApp(firebaseConfig);

export default app;
