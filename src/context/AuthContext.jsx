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
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileAssignment, setProfileAssignment] = useState(0);
  const [affiliate, setAffiliate] = useState(null);
  const [fidelizationData, setFidelizationData] = useState(null);
  const [transitProfile, setTransitProfile] = useState(null);

  const [webHook, setWebHook] = useState(null);
  const navigate = useNavigate();

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
    setFidelizationData(null);
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
      setIsLoading(false);
      await profileDataLoader(currentUser);
    });
    return () => unsubuscribe();
  }, [auth]);

  // useEffect(() => {
  //   console.log(auth.user)
  //   profileDataLoader(auth.user);
    
  // }, [auth.user]);


  const profileDataLoader = async (user) => {
    if (user === null) {
      return;
    }
    const token = await getToken(user);
    try {
      setLoadingProfile(true);
      const { data } = await axiosClientLoyalty("/profile", config(token))
      const mappedData = mapProfileData(data);
      setFidelizationData(prevData => mappedData);
      setAffiliate(prevValue => true)
      setProfileAssignment(200);
    } catch (error) {
      // setProfileAssignment(error?.response.status || 209);
    }
    finally{
      setLoadingProfile(false);
    }
  }

  const profileDataCreate = async (newProfile) => {
    if (user === null) {
      return;
    }
    try {
      const token = await getToken(user);
      const { data } = await axiosClientLoyalty.post('/profile', newProfile, config(token))
      console.log(data)
      const mappedData = mapProfileData(data);
      console.log(mappedData)
      setFidelizationData(prevData => mappedData);
    } catch (error) {
      throw error;
      // setProfileAssignment(error?.response.status || 209);
    }
  }

  const profileDataUpdate = async (bindProfile) => {
    if (user === null) {
      return;
    }
    try {
      const token = await getToken(user);
      setTransitProfile(bindProfile);
      const { data } = await axiosClientLoyalty.put('/bind', bindProfile, config(token))

      const mappedData = mapProfileData(data);
      setFidelizationData(prevData => mappedData);
    } catch (error) {
      throw error;
      // setProfileAssignment(error?.response.status || 209);
    }
  }
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
    profileAssignment,
    fidelizationData,
    webHook,
    setWebHook,
    affiliate,
    getPhotoUrl,
    profileDataCreate,
    profileDataUpdate,
    transitProfile,
    setTransitProfile,
    loadingProfile

  }), [user, isLoading, profileAssignment, webHook, affiliate, fidelizationData, transitProfile]);
  return (<AuthContext.Provider value={value} {...props} />);
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe estar contenida en el provider")
  }
  return context
}