import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const { login, loginWithGoogle } = useAuth();
  let [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("hook"))

  const handleLogin = async e => {
    e.preventDefault();
    setError("");
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.message);
    }
  };


  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      await loginWithGoogle();
      redirect("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="flex justify-center flex-col py-10"
    >
      <div className="">

        <h2>Bienvenido</h2>
        <p>
          Club Siempre Beneficios, si tienes una cuenta puedes Ingresar, o puedes crear una nueva cuenta. También puedes acceder con las redes sociales
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
        <div className="flex w-full block flex-col mt-5 gap-4">
          <button
            onClick={handleLogin}
            className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
          >
            Iniciar sesión
          </button>
          {/* <button
                onClick={handleRegister}
                className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
              >
                Registrarse
              </button> */}
          <button
            onClick={handleGoogleSignin}
            className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
          >
            Google login
          </button>
        </div>
      </form>
    </div>


  )
}

export default Login