import { createContext, useMemo, useContext, useState, useEffect } from "react";


import { axiosClientLoyalty, config } from "../config/axiosClient";

import { mapProfileData } from "../utils/MapProfileData";



export const LoyaltyProvider = (props) => {

  const [isLoading, setIsLoading] = useState(true);

  const [profileAssignment, setProfileAssignment] = useState(0);
  const [affiliate, setAffiliate] = useState(null);
  const [fidelizationData, setFidelizationData] = useState(null);


  useEffect(() => {
    if (user===null ) {
      return;
    }
    profileDataLoader(user);
  }, [user])

  const profileDataLoader = async (user) => {
    if (user===null) {
      return;
    }
    const token = await getToken(user);
    try {
      const { data } = await axiosClientLoyalty("/profile", config(token))
      const mappedData = mapProfileData(data);
      setFidelizationData(prevData => mappedData);
      setAffiliate(prevValue => true)
      setProfileAssignment(200);
    } catch (error) {
      // setProfileAssignment(error?.response.status || 209);
    }
  }

  const profileDataCreate = async (newProfile) => {
    if (user===null ) {
      return;
    }
    const token = await getToken(user);
    try {
      const {data} =await axiosClientLoyalty.post('/profile',newProfile, config(token))
      console.log(data)
      // const mappedData = mapProfileData(data);
      // setFidelizationData(prevData => mappedData);
    } catch (error) {
      // setProfileAssignment(error?.response.status || 209);
    }
  }

  const profileDataUpdate = async (newProfile) => {
    if (user===null ) {
      return;
    }
    const token = await getToken(user);
    try {
      const {data} =await axiosClientLoyalty.patch('/profile',newProfile, config(token))
      console.log(data)
      // const mappedData = mapProfileData(data);
      // setFidelizationData(prevData => mappedData);
    } catch (error) {
      // setProfileAssignment(error?.response.status || 209);
    }
  }
  const getPhotoUrl = () => {
    return user.photoURL || "src/assets/img/profile.png";
  }

  const value = useMemo(() => ({
    
    profileAssignment,
    fidelizationData,
    affiliate,
    getPhotoUrl,
    profileDataCreate,
    profileDataUpdate
  }), [profileAssignment, affiliate, fidelizationData]);
  return (<LoyaltyContext.Provider value={value} {...props} />);
}

export const useLoyalty = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useLoyalty debe estar contenida en el provider")
  }
  return context
}