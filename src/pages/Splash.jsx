import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useNavigationMachine } from "../machines/machine";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../component/Spinner";

const Splash = () => {
  const navigate = useNavigate();
  const { token, setWebHook, logout } = useAuth();
  const [ current, send ] = useNavigationMachine();
  const [ searchParams, ] = useSearchParams();
  const { value: page } = current;

  useEffect(()=>{
    const webHook = searchParams.get("webhook");
    logout()
    if(!webHook ){
      return;
    }
    return ()=> setWebHook(webHook)
  } ,[])

  const handleEstate = (e) => {
    e.preventDefault();
    send("HOME");
  }
  const handleEstate2 = (e) => {
    e.preventDefault();
    send("LOGOUT");
  }

  useEffect(() => {
    const idTimeOut = setTimeout(() => {
      if(token){
        send("HOME")
        navigate('/home');
      }else{
        send("SIGNUP")
        navigate('login');
      }
    }, 2500)
    return ()=>clearTimeout(idTimeOut);
  }, [token])

  return (
   <Spinner />
  )
}

export default Splash