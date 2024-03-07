import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDvPxr1ioDqcg07sOpiHdkv8kkyuae257Q",
  authDomain: "stock-market-app-2-6e4db.firebaseapp.com",
  projectId: "stock-market-app-2-6e4db",
  storageBucket: "stock-market-app-2-6e4db.appspot.com",
  messagingSenderId: "459098700699",
  appId: "1:459098700699:web:e222e7430d7b63106dbf3e",
  measurementId: "G-TNVTW7VZYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);