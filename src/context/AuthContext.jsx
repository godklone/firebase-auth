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
  affiliate: null,
  webHook: null,
  setAuth: () => { },
  clearAuth: () => { },
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [profileAssignment, setProfileAssignment] = useState(0);
  const [affiliate, setAffiliate] = useState(false);
  const [fidelizationData, setFidelizationData] = useState(null);

  const [webHook, setWebHook] = useState(null);
  const navigate = useNavigate();

  const setAuth = () => {
    setUser(user);
  };

  const clearAuth = () => {
    setUser(null);
  };

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
    setProfileAssignment(null)
    setAffiliate(false)
    setFidelizationData(null)
  }

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  const getToken = async (user) => {
    if (!user) return null;
    const token = await user.getIdToken();
    return token;
  };


  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(prevUser => currentUser);
      setIsLoading(false);
      await profileDataLoader(currentUser);
    });
    return () => unsubuscribe();
  }, [auth]);


  useEffect(() => {
    const verifyLogin = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      };
      try {
        //Verificar contra el backend tooken guardado
        // navigate("/")
        true;
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    verifyLogin();
  }, []);

  useEffect(() => {
    if (!user | !webHook) {
      return;
    }

    profileDataLoader(user);
  }, [user])

  const profileDataLoader = async (user) => {
    if (!user) return;

    const token = await getToken(user)
    try {
      const { data } = await axiosClientLoyalty("/profile", config(token))
      const mappedData = mapProfileData(data);
      setFidelizationData(prevData => mappedData);
      setAffiliate(prevValue => true)
      setProfileAssignment(200);
    } catch (error) {
      const { status } = error?.response;
      setProfileAssignment(status);
    }
  }
  const getPhotoUrl = () => {
    return user.photoURL || "src/assets/img/profile.png";
  }

  const value = useMemo(() => ({
    isLoading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    user,
    profileAssignment,
    fidelizationData,
    webHook,
    setWebHook,
    affiliate,
    getPhotoUrl
  }), [auth, isLoading, profileAssignment, webHook, affiliate, fidelizationData]);
  return (<AuthContext.Provider value={value} {...props} />);
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe estar contenida en el provider")
  }
  return context
}