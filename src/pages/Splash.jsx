import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useNavigationMachine } from "../machines/machine";

const Splash = () => {
  const navigate = useNavigate();
  const [current, send] = useNavigationMachine()
  useEffect(()=>{
    const authToken=null;
    //verificar si el usuario esta logueado
     setTimeout(()=>{
      // send("")
      
      navigate('/signup');
     },3500)
  },[])
    return (
      <div>Splash........</div>
    )
  }

export default Splash