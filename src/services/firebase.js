// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Suas configurações do Firebase aqui
  apiKey: "AIzaSyA0MEmxvMl-n-6daWmHA9XXM6sjHmBvcUQ",
  authDomain: "salaon-lingerie.firebaseapp.com",
  projectId: "salaon-lingerie",
  storageBucket: "salaon-lingerie.firebasestorage.app",
  messagingSenderId: "737931185396",
  appId: "1:737931185396:web:b98564f321043643eea2a1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);