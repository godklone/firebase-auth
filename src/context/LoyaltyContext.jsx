import { createContext, useMemo, useContext, useState, useEffect } from "react";
import { axiosClientLoyalty, config } from "../config/axiosClient";
import { mapProfileData } from "../utils/MapProfileData";
import { useAuth } from "./AuthContext";
import { mapLastMovements, TAGS } from "../utils/mapLastMovements";


const LoyaltyContext = createContext();

export const LoyaltyProvider = (props) => {
  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [fidelizationData, setFidelizationData] = useState(null);
  const [transitProfile, setTransitProfile] = useState(null);
  const [lastMovents, setLastMovents] = useState(null);

  const { user, getToken } = useAuth();
  const maxRetryCount = import.meta.VITE_MAX_RETRY_COUNT;
  const maxWaitTime = import.meta.VITE_MAX_WAIT_TIME;

  useEffect(() => {
    if (user === null) {
      return;
    }
    profileDataLoader(user);
    setLoadingProfile(true);

  }, [user])

  const profileDataLoader = async (user) => {

    // setFidelizationData({
    //   fullName: "carlos",
    //   name: "carlos",
    //   surename: "Brito",
    //   identification: "95971507",
    //   birthday: formatDate("1975-01-03"),
    //   gender: JSON.stringify({
    //     "id": 2,
    //     "description": "Masculino"
    //   }),
    //   localization: null,
    //   fidelization: {
    //     accumulatedPoints: 1450,
    //     expirationPoints: 456,
    //     expirationDate: "22/11/2023",
    //     credencial: {
    //       number: 123456,
    //       code: 123,
    //       // identificacion: 95971507,
    //     },
    //   }
    // });

    if (user === null || loadingSpinner) {
      return;
    }
    const token = await getToken(user);
    try {

      setLoadingSpinner(true);
      const { data } = await axiosClientLoyalty(
        "/profile",
        {
          ...config(token)
        }
      )
      if (data?.status === "Error") {
        //throw data.message
      }
      const mappedData = mapProfileData(data);
      setFidelizationData(prevData => mappedData);
    } catch (error) {
      if(error.response.status ===409) {
        console.log(error.response.status)
      }
      // throw error;
    }
    finally {
      setLoadingProfile(false);
      setLoadingSpinner(false);
    }
  }

  const profileDataCreate = async (newProfile) => {
    if (user === null || loadingSpinner) {
      return;
    }
    try {
      const token = await getToken(user);
      const { data } = await axiosClientLoyalty.post(
        '/profile',
        newProfile,
        config(token)
      )
      setLoadingSpinner(true);
      const mappedData = mapProfileData(data);
      setFidelizationData(prevData => mappedData);
    } catch (error) {
      if (error?.response?.data?.status === "Error") {
        throw error?.response?.data?.message
      }
      throw error;
    } finally {
      setLoadingSpinner(false);
    }
  }

  const profileDataUpdate = async (dataProfile, retryCount = 0) => {
    if (user === null || loadingSpinner) {
      return;
    }
    try {
      const token = await getToken(user);
      setTransitProfile(dataProfile); //TODO: REVISAR ESTA ASIGNACION
      setLoadingSpinner(true);
      const { data } = await axiosClientLoyalty.put(
        '/profile',
        bindProfile,
        { timeout: maxWaitTime, ...config(token) }
      );
      if (data.status === "Error") {
        throw data.message
      }
      const mappedData = mapProfileData(data);
      setFidelizationData(prevData => mappedData);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("El recurso solicitado no fue encontrado.");
        throw error;
      } else if (retryCount < maxRetryCount) {
        await new Promise(resolve => setTimeout(resolve, (maxWaitTime / 4)));
        return makeRequest(bindProfile, retryCount + 1);
      } else {
        throw error;
      }
    }
    finally {
      setLoadingSpinner(false);
    }
  }

  const bindProfileDataUpdate = async (bindProfile, retryCount = 0) => {
    if (user === null || loadingSpinner) {
      return;
    }
    try {
      const token = await getToken(user);
      setTransitProfile(bindProfile); //TODO: REVISAR ESTA ASIGNACION
      setLoadingSpinner(true);

      const { data } = await axiosClientLoyalty.put(
        '/profile/bind',
        bindProfile,
        { timeout: maxWaitTime, ...config(token) }
      );
      if (data.status === "Error") {
        throw data.message
      }
      const mappedData = mapProfileData(data);
      setFidelizationData(prevData => mappedData);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("El recurso solicitado no fue encontrado.");
        throw error;
      } else if (retryCount < maxRetryCount) {
        await new Promise(resolve => setTimeout(resolve, (maxWaitTime / 4)));
        return makeRequest(bindProfile, retryCount + 1);
      } else {
        throw error;
      }
    }
    finally {
      setLoadingSpinner(false);
    }
  }


  const getLastMovements = async (retryCount = 0) => {
    if (user === null || loadingSpinner) {
      return;
    }
    try {
      const token = await getToken(user);
      // const movements = mapLastMovements(dataBD.DATA);

      setLoadingSpinner(true);
      const { data } = await axiosClientLoyalty(
        '/profile/lastmovements',
        { timeout: maxWaitTime, ...config(token) }
      );
      if (data.status === "Error") {
        throw data.message
      }
      const movements = mapLastMovements(data.data);
      setLastMovents({
        TAGS,
        movements
      })

    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("El recurso solicitado no fue encontrado.");
        throw error;
      } else if (retryCount < maxRetryCount) {
        await new Promise(resolve => setTimeout(resolve, (maxWaitTime / 4)));
        return makeRequest(bindProfile, retryCount + 1);
      } else {
        throw error;
      }
    }
    finally {
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
    bindProfileDataUpdate,
    lastMovents,
    getLastMovements
  }), [loadingProfile, transitProfile, fidelizationData, loadingSpinner, lastMovents]);

  return (<LoyaltyContext.Provider value={value} {...props} />);
}

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext)
  if (!context) {
    throw new Error("useLoyalty debe estar contenida en el provider loyalty")
  }
  return context
}