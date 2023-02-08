import { useState } from "react"
  const defaultState = {
    typeAlert: "",
    message: ""
  }
const useError = () => {
  const [alert, setAlert] = useState(defaultState);
  const resetAlert = ()=> setAlert(prev=>defaultState);
  return [alert, setAlert, resetAlert]
}

export default useError