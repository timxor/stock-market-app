// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgDpsAdofWkA9t-sw9QC_nrOQi7GuAneU",
  authDomain: "stockapp-ebbaf.firebaseapp.com",
  projectId: "stockapp-ebbaf",
  storageBucket: "stockapp-ebbaf.appspot.com",
  messagingSenderId: "1025307316182",
  appId: "1:1025307316182:web:a4a49be5e759019cfd9e77",
  measurementId: "G-CF8PDN9RC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);