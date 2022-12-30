import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.config';
export const AuthContext = createContext()
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // Create User
    const creatSignUp = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //update user
    const updateUser = (userInfo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, userInfo)
    }

    // login/signin
    const login = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //Google with login
    const googleSign = (provider)=>{
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    // logout
    const logout = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    // Get the currently signed user
    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unsubcribe()
        }
    },[])

    
    const authInfo = {creatSignUp, updateUser, login, googleSign, user, logout, loading}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;