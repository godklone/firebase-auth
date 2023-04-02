import { createContext, useMemo, useContext, useState, useEffect } from "react";
import pictureProfile from "../assets/img/profile.png"

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
import { getFirebaseAuthError } from "../utils/mapFirebaseError";

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
    try {
      setIsLoading(true);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(getFirebaseAuthError(error.code))
    }
    finally{
      setIsLoading(false);
    }
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
    return await sendPasswordResetEmail(auth, email);
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
  }, []);


  const getPhotoUrl = () => {
    
    return user.photoURL || pictureProfile;
  }

  const value = useMemo(() => ({
    isLoading,
    user,
    signup,
    signIn,
    loginWithGoogle,
    logout,
    resetPassword,
    setWebHook,
    getPhotoUrl,
    getToken,
    webHook

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
    throw new Error("useAuth debe estar contenida en AuthProvider")
  }
  return context
}