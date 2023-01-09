import { useRef, useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";

function App() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(null);

  const { login, logout, loginWithGoogle, user, token, signup} = useAuth();

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

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      await loginWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  };
 
  return (
    <div className="bg-gray-100 h-screen">
      {token ? (
        <div className="bg-gray-100 h-screen p-10">
          <p className="text-2xl font-bold">Hola, {user.displayName ||user.email}</p>
          <button
            onClick={handleLogout}
            className="font-bold mt-4 bg-sky-700 hover:bg-sky-600 transition-colors rounded-md py-2 px-4 text-white"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div
          className="flex justify-center"
        >
          <form
            className="bg-white mt-10 px-5 py-10 w-90 rounded-md shadow-md"
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
              <button
                onClick={handleRegister}
                className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
              >
                Registrarse
              </button>
              <button
                onClick={handleGoogleSignin}
                className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
              >
                Google login
              </button>
            </div>
          </form>

        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
