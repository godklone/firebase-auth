import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useNavigationMachine } from "../machines/machine";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const Splash = () => {
  const navigate = useNavigate();
  const { token, setWebHook, logout, affiliate } = useAuth();
  const [current, send] = useNavigationMachine();
  const [searchParams,] = useSearchParams();
  const { value: page } = current;

  useEffect(() => {
    const webhook = searchParams.get("webhook");
    const idTimeOut = setTimeout(() => {
      validate(webhook)
    }, 2500)
    return () => clearTimeout(idTimeOut);
  }, [])

  const validate = (webhook) => {
    if (!webhook) {
      send("404");
      logout();      
      navigate('/404');
    }

    setWebHook(webhook)
    if (token && affiliate) {
      send("HOME")
      navigate('/home');
    } else {
      send("SIGNUP")
      navigate('login');
    }
  }

  return (
    <Spinner />
  )
}

export default Splash