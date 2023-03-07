import { createContext, useMemo, useContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../config/firebase";
import { axiosClientLoyalty, config } from "../config/axiosClient";
import { useNavigate } from "react-router-dom";
import { mapProfileData } from "../utils/MapProfileData";

const AuthContext = createContext({
  user: null,
  isLoading: true,
  webHook: null,
  setAuth: () => { },
  clearAuth: () => { },
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [webHook, setWebHook] = useState(null);
  // const navigate = useNavigate();
  const spinnerTimer = import.meta.VITE_TIMER_SPINNER || 1000
  const setAuth = () => {
    setUser(user);
  };

  const clearAuth = () => {
    setUser(null);
  };

  const signup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
    //verificar
  };

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  }

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleProvider);
  };

  const resetPassword = async (email) => {
    return await sendPasswordResetEmail(email);
  }

  const getToken = async (user) => {
    if (!user) return null;
    const token = await user.getIdToken();
    return token;
  };

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(prevUser => currentUser);
      setTimeout(() => {
        setIsLoading(false);
      }, spinnerTimer);
    });
    return () => unsubuscribe();
  }, [auth]);


  const getPhotoUrl = () => {
    return user.photoURL || "src/assets/img/profile.png";
  }

  const value = useMemo(() => ({
    isLoading,
    signup,
    signIn,
    loginWithGoogle,
    logout,
    resetPassword,
    user,
    webHook,
    setWebHook,
    getPhotoUrl,
    getToken

  }), [
    user, 
    isLoading, 
    webHook, 
  ]);
  return (<AuthContext.Provider value={value} {...props} />);
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe estar contenida en el provider")
  }
  return context
}