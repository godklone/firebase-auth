import { createContext, useMemo, useContext, useState, useEffect } from "react";
import { axiosClientLoyalty, config } from "../config/axiosClient";


const EmailContext = createContext({
  email: null,
  restore: false,
});

export const EmailProvider = (props) => {
  const [email, setEmail] = useState(null);
  const [restore, setRestore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    const isEmailRestore = async (e) => {
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
    isEmailRestore();
  }, [email])


  const value = useMemo(() => ({
    isLoading,
    login,
    email,
    restore,
    setRestore
  }), [email, setRestore, restore, isLoading, setIsLoading]);

  return (<EmailContext.Provider value={value} {...props} />);
}

export const useEmailRestore = () => {
  const context = useContext(EmailContext)
  if (!context) {
    throw new Error("useEmailRestore debe estar contenida en el provider EmailContext")
  }
  return context
}