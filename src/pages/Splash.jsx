import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
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
    let webhook = searchParams.get("webhook");
    if (!webhook) {
      signOut();
    } else {
      try {
        const newUrl = new URL(`${webhook}`);
      } catch (e) {
        webhook = "invalid"
        navigate('/404');
      } finally {
        setWebHook(webhook);
      }
    }

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

  return (
    <Spinner />
  )
}

export default Splash