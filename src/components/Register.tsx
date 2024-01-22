// src/components/Register.tsx
import React, { useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
  
    const handleRegister = async () => {
      try {
        const authInstance = getAuth();
  
        const userCredential = await createUserWithEmailAndPassword(
          authInstance,
          email,
          password
        );
  
        const uid = userCredential.user.uid;
  
        await addDoc(collection(firestore, "users"), {
          uid,
          email,
          displayName,
        });
  
        console.log("User registered successfully:", userCredential.user);
      } catch (error) {
        console.error("Error registering user:");
      }
    };
  
    const handleGoogleLogin = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
  
        const user = result.user;
        console.log("Google login successful:", user);
      } catch (error) {
        console.error("Error with Google login:");
      }
    };
  
    return (
      <div>
        <h2>Register</h2>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Display Name:</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
  
        <h2>Login with Google</h2>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    );
  };
  
  export default Register;