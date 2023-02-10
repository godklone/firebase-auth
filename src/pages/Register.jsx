import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";
import { validEmail, validPassword } from "../helpers";
import useError from "../hooks/useError";
import { useNavigationMachine } from "../machines/machine";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const navigate = useNavigate();

  const [current, send] = useNavigationMachine()
  const [error, setError] = useState(null);
  const { user, token, signup } = useAuth();
  const [alert, setAlert, resetAlert] = useError();

  const handleRegister = async (e) => {
    e.preventDefault();
    resetAlert();
    if (!validEmail.test(emailRef.current.value)) {
      setAlert(prevAlert => ({ typeAlert: "error", message: "Please enter a valid email" }))
      return;
    }

    if (!validPassword.test(passwordRef.current.value)) {
      setAlert(prevAlert => ({ typeAlert: "error", message: "el password debe contener letras mayusculas, minusculas y caracteres numericos. La longitud debe tener entre 6 a 15 caracteres. " }))
      return;
    }

    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      send("home");
      navigate("/home")
    } catch (error) {
      setError(error.message);
    }
    setError("");
  };

  const verifyPasswd = () => {
    if (!validPassword.test(passwordRef.current.value)) {
      setAlert(prevAlert => (
        {
          typeAlert: "error",
          message: "La contrasenia debe contener letras mayusculas, minusculas y caracteres numericos. La longitud debe tener entre 6 a 15 caracteres."
        }))
      return;
    }
  }

  const verifyRePasswd = () => {
    if (passwordRef !== rePasswordRef) {
      setAlert(prevAlert => (
        {
          typeAlert: "error",
          message: "Ambos password deben ser iguales"
        }))
      return;
    }
  }

  const verifyEmail = () => {
    if (!validEmail.test(emailRef.current.value)) {
      setAlert(prevAlert => ({ typeAlert: "error", message: "Please enter a valid email" }))
      return;
    }
  }

  return (
    <div
      className="flex justify-center flex-col py-10"
    >
      <div className="">
        <h2>Crear Cuenta</h2>
        <p className="text-gray-800 text-xl mb-8">
          Vamos a crear una cuenta con un email y clave. Estas serán tus credenciales para ingresar.
        </p>
      </div>

      <form
        className="bg-white mt-10 px-5 py-10 rounded-md shadow-md"
      >
        {alert.message && <Alert typeAlert={alert.typeAlert} message={alert.message} />}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            // value={email}
            ref={emailRef}
            onBlur={verifyEmail}
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
            onBlur={verifyPasswd}
            // onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="rounded-md border mt-2 p-2 w-full placeholder-gray-400"
          />
        </div>
        <div className="">
          <label htmlFor="repassword">Verificar Password</label>
          <input
            type="password"
            id="repassword"
            ref={rePasswordRef}
            onBlur={verifyRePasswd}
            placeholder="Verifica tu Password"
            className="rounded-md border mt-2 p-2 w-full placeholder-gray-400"
          />
        </div>

        <div className="flex w-full block flex-col mt-5 gap-4">
          <button
            onClick={handleRegister}
            className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
          >
            Continuar
          </button>

          <p>
            Ya tenes una cuenta creada? <Link to="/login">Ingresar</Link>
          </p>
          <p className="text-gray-800 text-xl mb-8">
            Al registra una cuenta, estás de acuerdo con nuestros Terminos de Servicios y Políticas de privacidad
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register