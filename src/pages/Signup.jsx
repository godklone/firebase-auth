import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../component/Alert";
import { useAuth } from "../context/AuthContext";
import { validEmail } from "../helpers";
import useError from "../hooks/useError";
import { useNavigationMachine } from "../machines/machine";

const Signup = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, loginWithGoogle} = useAuth();
  const [current, send] = useNavigationMachine()
  const [alert, setAlert] = useError();

  const handleLogin = async e => {
    e.preventDefault();
    
    if(!validEmail.test(emailRef.current.value)){
      setAlert(prevAlert=>({typeAlert:"error", message:"Please enter a valid email"}))
      return;
    }

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      send("home");
      navigate("/home")
    } catch (error) {
      setAlert(prevAlert=>({typeAlert:"error", message:error.message}))
    }
  };


  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      await loginWithGoogle();
      navigate("/home");
 
      //determinar si el perfil de la cuenta esta asignada a
      //si esta mostrar la pagina de 
  
    } catch (error) {
      setAlert(prevAlert=>({typeAlert:"error", message:error.message}))
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("register")
    console.log("register ...")
  }


  
  return (
    <div
      className="flex justify-center flex-col py-5"
    >
      <div className="">
        <h2>Bienvenido</h2>
        <p>
          Club Siempre Beneficios, si tienes una cuenta puedes Ingresar, o puedes crear una nueva cuenta. También puedes acceder con las redes sociales
        </p>
      </div>

      <form
        className="bg-white mt-5 px-5 py-5 rounded-md shadow-md"
      >
         {alert.message && <Alert typeAlert ={alert.typeAlert} message ={alert.message}/>}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            // value={email}
            ref={emailRef}
            // onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-md border mt-2 p-2 w-full placeholder-gray-400"
          />

        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            // onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="rounded-md border mt-2 p-2 w-full placeholder-gray-400"
          />
        </div>
        <div className="flex w-full block flex-col mt-5 gap-4">
          <p
            className="text-muted text-right"><Link to="forgoten-password">Olvide el password</Link></p>
          <button
            onClick={handleLogin}
            className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
          >
            Continuar
          </button>
          {/* <button
                onClick={handleRegister}
                className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
              >
                Registrarse
              </button> */}
          <button
            onClick={handleGoogleSignin}
            className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
          >
            Ingresar con Google
          </button>
          <button
            onClick={handleGoogleSignin}
            className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
          >
            Ingresar con Facebook
          </button>
          <button
            onClick={handleRegister}
            className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
          >
            Crear una cuenta
          </button>
        </div>
      </form>
    </div>


  )
}

export default Signup