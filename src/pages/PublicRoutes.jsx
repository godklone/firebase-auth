import { Routes, Route } from "react-router-dom"
import ForgotPasswd from "./ForgotPasswd"
import Register from "./Register"
import Signup from "./Signup"

const PublicRoutes = () => {
  return (
      <Routes >
        <Route index element={<Signup />} />
        <Route path='register' element={<Register />} />
        <Route path="forgoten-password" element={<ForgotPasswd />} />
      </Routes>
  )
}

export default PublicRoutes