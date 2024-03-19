import React, { useState } from 'react';
import { auth } from "./firebase-config";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const history = useNavigate();

    const signIn = async (e) => {
      e.preventDefault();
      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log("User signed in successfully:", user);

          // Redirect to a different page after successful login
          history('/AddStock');
      } catch (error) {
          setError("Invalid email or password.");
          console.log("Error signing in:", error);
      }
  }
    return(
        <div className="sign-in-container">
            <form onSubmit={signIn}>
                <h1>Log In</h1>
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
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};
export default SignIn;