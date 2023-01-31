import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PasswordRestore from "../component/PasswordRestore";

const ForgotPasswd = () => {
  const emailRef = useRef();
  const [restore, setRestore] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const handleCancel = (e) => {
    e.preventDefault();
   
  };
  const handleEvent = (e) => {
    e.preventDefault(); 
    setRestore(true)
  };

  return (
    !restore
      ? (<div
        className="flex justify-center flex-col py-10"
      >
        <div className="">
          <h2>Recuperar Password</h2>
          <p>
            No te acordas del password?, no te preocupes te vamos a enviar un email con un link para que lo puedas resetear.
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

          <div className="flex w-full block flex-col mt-5 gap-4">

            <button
              onClick={handleEvent}
              className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
            >
              Recuperar
            </button>

            <button
              onClick={handleCancel}
              className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>)
      : <PasswordRestore />

  )
}

export default ForgotPasswd