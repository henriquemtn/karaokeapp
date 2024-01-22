// src/components/AuthScreen.tsx
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

const AuthScreen: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
    
          // Se não estiver logado, navegue para a página de login
          if (!user) {
            navigate("/login");
          }
        });
    
        return () => unsubscribe();
      }, [navigate]);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out:");
        }
    };


        return (
            <div>
                {!user ? (
                    // Conteúdo quando não estiver logado
                    <div>
                        <h2>You are not logged in</h2>
                        <Register />
                    </div>
                ) : (
                    // Conteúdo quando estiver logado
                    <div>
                        <h2>Welcome, {user.email}!</h2>
                        <button onClick={handleSignOut}>Sign Out</button>


                    </div>
                    
                )}
            </div>
        );
    };

    export default AuthScreen;
