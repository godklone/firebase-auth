import { useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(null);

  const { login, logout, loginWithGoogle, user, token, signup } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError("");
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };



  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            {/* <Route path='forgoten-password' element={<ForgotenPassword />} /> */}
          </Route>
        </Routes>
  </BrowserRouter>

      // <div className="bg-gray-100 h-screen">
      //   {token ? (
      //     <div className="bg-gray-100 h-screen p-10">
      //       <p className="text-2xl font-bold">Hola, {user.displayName || user.email}</p>
      //       <button
      //         onClick={handleLogout}
      //         className="font-bold mt-4 bg-sky-700 hover:bg-sky-600 transition-colors rounded-md py-2 px-4 text-white"
      //       >
      //         Cerrar sesión
      //       </button>
      //     </div>
      //   ) : (
        
      //   )}
      //   {error && <p>{error}</p>}
      // </div>

  );
}

export default App;
