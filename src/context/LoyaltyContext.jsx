import { createContext, useMemo, useContext, useState, useEffect } from "react";
import { axiosClientLoyalty, config } from "../config/axiosClient";
import { mapProfileData } from "../utils/MapProfileData";
import { useAuth } from "./AuthContext";

const LoyaltyContext = createContext();

export const LoyaltyProvider = (props) => {
  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [fidelizationData, setFidelizationData] = useState(null);
  const [transitProfile, setTransitProfile] = useState(null);
  const {user, getToken} = useAuth();

  useEffect(() => {
    if (user===null ) {
      return;
    }
    profileDataLoader(user);
    setLoadingProfile(true);
    
  }, [user])

  
  const profileDataLoader = async (user) => {
    if (user === null) {
      return;
    }
    const token = await getToken(user);
    try {
      setLoadingSpinner(true);
      const { data } = await axiosClientLoyalty("/profile", config(token))
      if(data.status==="Error"){
        throw data.message
      }
      const mappedData = mapProfileData(data);
      setFidelizationData(prevData => mappedData);
    } catch (error) {
      // throw error;
      // setProfileAssignment(error?.response.status || 209);
    }
    finally{
      setLoadingProfile(false);
      setLoadingSpinner(false);
    }
  }

  const profileDataCreate = async (newProfile) => {
    if (user === null) {
      return;
    }
    try {
      const token = await getToken(user);
      // setLoadingSpinner(true);
      const { data } = await axiosClientLoyalty.post('/profile', newProfile, config(token))
      if(data.status==="Error"){
        throw data.message
      }
      const mappedData = mapProfileData(data);
      setFidelizationData(prevData => mappedData);
    } catch (error) {
      throw error;
      // setProfileAssignment(error?.response.status || 209);
    }finally{
      setLoadingSpinner(false);
    }
  }

  const profileDataUpdate = async (bindProfile) => {
    if (user === null) {
      return;
    }
    try {
      const token = await getToken(user);
      setTransitProfile(bindProfile); //TODO: REVISAR ESTA ASIGNACION
      setLoadingSpinner(true);
      const { data } = await axiosClientLoyalty.put('/bind', bindProfile, config(token))
      if(data.status==="Error"){
        throw data.message
      }
      const mappedData = mapProfileData(data);
      setFidelizationData(prevData => mappedData);
    } catch (error) {
      throw error;
      // setProfileAssignment(error?.response.status || 209);
    }
    finally{
      setLoadingSpinner(false);
    }
  }
  
  const value = useMemo(() => ({
    loadingProfile,
    transitProfile, 
    fidelizationData,
    profileDataLoader,
    profileDataCreate,
    profileDataUpdate,
    loadingSpinner,
    setLoadingSpinner,
    setFidelizationData,
    setTransitProfile,
  }), [loadingProfile, transitProfile, fidelizationData, loadingSpinner]);

  return (<LoyaltyContext.Provider value={value} {...props} />);
}

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext)
  if (!context) {
    throw new Error("useLoyalty debe estar contenida en el provider loyalty")
  }
  return context
}