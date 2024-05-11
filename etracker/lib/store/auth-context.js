"use client";
import { createContext } from "react";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

export const authContext = createContext({
    user: null,
    loading: false,
    googleLoginHandler: async () => { },
    logout: async () => { }
});

export default function AuthContextProvider({ children }) {
    const [user, loading] = useAuthState(auth);

    const googleProvider = new GoogleAuthProvider();

    const googleLoginHandler = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Error signing in with Google: ', error);
        }
    }

    const logout = async () => {
        try {
            signOut(auth);
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    }

    const values = { user, loading, googleLoginHandler, logout };

    return (
        <authContext.Provider value={values}>
            {children}
        </authContext.Provider>
    );
}