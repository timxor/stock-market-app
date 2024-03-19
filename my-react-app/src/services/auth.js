import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../components/firebase-config'; // Import the auth object from firebaseConfig

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
};

const signUpWithEmailAndPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export { signInWithGoogle, signUpWithEmailAndPassword, signOutUser };
