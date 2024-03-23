import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for redirection
import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from "./firebase-config"; // Import Firestore db
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // State for error message
    const history = useNavigate(); // useHistory hook for redirection

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create a document in Firestore for the user
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                // Add more user-specific data as needed
            });

            console.log("User signed up successfully:", user);
            
            // Redirect to login page after successful signup
            history('/login');
        } catch (error) {
            // Set error message
            setError("Failed to create an account. Please try again.");
            console.log("Error signing up:", error);
        }
    }

    return(
        <div className="sign-in-container">
            <form onSubmit={signUp}>
                <h1>Sign Up</h1>
                <input type="email" 
                    placeholder="Enter Your Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" 
                    placeholder="Enter Your Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="auth-button" type="submit">Sign up</button> {/* Apply "auth-button" class */}
                {/* Display error message if error exists */}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};


export default SignUp;
