import React, { useState } from 'react';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
            .then((userCredentials) => {
                console.log(userCredentials);
            }).catch((error) => {
                console.log(error);
            })
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