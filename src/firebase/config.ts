// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB1p8xY2t6U8l9uU28K8Z4cZAr8podXkJY",
  authDomain: "healtail.firebaseapp.com",
  projectId: "healtail",
  storageBucket: "healtail.firebasestorage.app",
  messagingSenderId: "661929596511",
  appId: "1:661929596511:web:9b35a373c4ddff047dadea",
  measurementId: "G-XNEGFJQGFB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // 👈 basic in-memory auth

export { app, auth };
