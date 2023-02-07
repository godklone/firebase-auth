import { useState } from "react"

const useError = () => {
  const [alert, setAlert] = useState({
    typeAlert:"",
    message:""
  })
  return [alert, setAlert]
}

export default useError