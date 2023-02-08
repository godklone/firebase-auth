import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  const [error, setError] = useState(null);

  const { user, token, signup } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.message);
    }
  };


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
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={rePasswordRef}
            // onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
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