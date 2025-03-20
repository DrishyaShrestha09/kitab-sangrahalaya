import { createContext, useContext, useState } from "react";

import {  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();
export const useAuth = () =>{
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

// auth provider
export const AuthProvide = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // register a user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // Loign user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    // google sign
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    const value = {
        currentUser, 
        registerUser,
        loginUser,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}