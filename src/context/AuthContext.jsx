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


const AuthContext = createContext({
  user: null,
  isLoading: true,
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [profileAssignment, setProfileAssignment] = useState(null);
  const [affiliate, setAffiliate] = useState(false);
  const [splash, setSplash] = useState(false)
  const [webHook, setWebHook] = useState("");

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
    setToken(null);
  }

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubuscribe();
  }, [auth._id]);


  useEffect(() => {
    if (!user) {
      return;
    }
    setToken(user.accessToken)
  }, [user])


  useEffect(() => {
    const verifyLogin = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      };
      try {
        //Verificar contra el backend tooken guardado
        navigate("/")
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    verifyLogin();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    const isProfileAssignment = async (e) => {
      try {
        const { data } = await axiosClientLoyalty("/profile", config(token));
        console.log(data);
        setProfileAssignment(true);
      } catch (error) {
        const { status } = error?.response;
        console.log(error?.message);
        setProfileAssignment(false);
      }
    }
    isProfileAssignment();
  }, [token])


  const value = useMemo(() => ({
    isLoading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    user,
    token,
    profileAssignment,
    webHook,
    setWebHook,
    affiliate,
    setAffiliate,
    splash,
    setSplash
  }), [splash, auth, isLoading, token, profileAssignment, webHook, affiliate]);

  return (<AuthContext.Provider value={value} {...props} />);
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe estar contenida en el provider")
  }
  return context
}