import { useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom";
// import { useNavigationMachine } from "../machines/machine";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const Splash = () => {
  const navigate = useNavigate();
  const { user, setWebHook, logout, isLoading } = useAuth();
  // const [current, send] = useNavigationMachine();
  const [searchParams,] = useSearchParams();


  useEffect(() => {
    const webhook = searchParams.get("webhook");
    if (!webhook) {
      signOut();
      navigate('/404');
    }
    setWebHook(webhook);

  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }
  }, [isLoading])

  const signOut = async () => {
    await logout();
  }

  // const validate = async (webhook) => {
  //   if (!webhook) {
  //     // send("404");
  //     await logout();
  //     navigate('/404');
  //   }
  //   setWebHook(webhook)
  //   if (user) {
  //     // send("HOME")
  //     navigate('/home');
  //   } else {
  //     // send("SIGNUP")
  //     navigate('/login');
  //   }
  // }

  return (
    <Spinner />
  )
}

export default Splash