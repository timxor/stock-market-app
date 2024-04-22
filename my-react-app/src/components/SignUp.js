import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from "./firebase-config";
import { doc, setDoc } from 'firebase/firestore';
import '../App.css'; // Import your CSS file

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const history = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
            });

            console.log("User signed up successfully:", user);
            history('/login');
        } catch (error) {
            setError("Failed to create an account. Please try again.");
            console.log("Error signing up:", error);
        }
    }

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={signUp}>
                <h1 className="signup-heading">Sign Up</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                />
                <button type="submit" className="signup-button">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default SignUp;
