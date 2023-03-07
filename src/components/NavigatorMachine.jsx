import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigationMachine } from '../machines/machine';

export default function NavigatorMachine() {
  const [current, send] = useNavigationMachine()
  const navigate = useNavigate();

  const objNavigate = {
    splash: ()=>navigate("/"),
    signup: ()=>navigate("/signup"),
    home: ()=>navigate("/home"),
    profile: ()=>navigate("/profile"),
  }
  useEffect(() => {
    console.log(current.value)
    // console.log(current.value)
    if(!current.value) {
      return;
    }
    log(current.value)
    objNavigate[current.value]();
      
  }, [current.value]);

  return null;
}