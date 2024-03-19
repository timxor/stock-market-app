import React, { useState } from 'react';
import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from "./firebase-config"; // Import Firestore db
import { doc, setDoc } from 'firebase/firestore';
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const signUp = async (e) => {
      e.preventDefault();
      try {
          const userCredential = await createUserWithEmailAndPassword(auth,email,password);
          const user = userCredential.user;

          // Create a document in Firestore for the user
          await setDoc(doc(db, 'users', user.uid), {
              email: user.email,
              // Add more user-specific data as needed
          });

          console.log("User signed up successfully:", user);
      } catch (error) {
          console.log("Error signing up:", error);
      }
  }
    return(
        <div className="sign-in-container">
            <form onSubmit={signUp}>
                <h1>Sign Up</h1>
                <input type="email" 
                    placeholder="Enter Your Email" 
                    value={(email)} 
                    onChange={(e) => setEmail(e.target.value)}
                    
                ></input>
                <input type="password" 
                    placeholder="Enter Your Password" 
                    value={(password)} 
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};
export default SignUp;