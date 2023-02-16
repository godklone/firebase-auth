import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useNavigationMachine } from "../machines/machine";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const Splash = () => {
  const navigate = useNavigate();
  const { token, setWebHook, logout, setSplash, splash, affiliate } = useAuth();
  const [ current, send ] = useNavigationMachine();
  const [ searchParams, ] = useSearchParams();
  const { value: page } = current;

  useEffect(()=>{
    const webHook = searchParams.get("webhook");
    if(!webHook ){
      // hago un logout para quitar el ultimo logueo del navegador actual
      logout();
      navigate('/404');
      return;
    }
    setSplash(prev=>true)
    return ()=> setWebHook(webHook)
  } ,[])


  useEffect(() => {
    if(splash){
      validate()
      return;
    }
    
    const idTimeOut = setTimeout(() => {
      validate()
    }, 2500)
    return ()=>clearTimeout(idTimeOut);
  }, [token, affiliate, splash])

const validate = ()=>{
  if(token && affiliate){
    send("HOME")
    navigate('/home');
  }else{
    send("SIGNUP")
    navigate('login');
  }
}
  return (
   <Spinner />
  )
}

export default Splash