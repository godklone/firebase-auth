import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import imageProfile from '../assets/img/profile.png'

const StateAccount = () => {
  const { webHook } = useAuth();
  const navigate = useNavigate();
  const username = "Nombre completo del usuario"

  const handleLastMovement = (e) => {
    e.preventDefault();
    console.log("Utimos movimientos")
    navigate("state-account/last-movement")
   
  }

  const handlePersonalData = (e) => {
    e.preventDefault();
    console.log("Datos Personales")
    navigate("state-account/personal-data")
  }

  return (
    <div
      className="flex justify-center flex-col py-10"
    >
      <div className="flex justify-end mb-4">
         <a
          className="bg-blue-600 py-2 px-4 text-white rounded-md font-bold"
         href={webHook} >
         Continuar al sitio Principal
       </a>
      </div>

      <div className="flex gap-3 items-center">
        <img
          src={imageProfile}
          alt="imagen del profile"
          width="100px"
          height="100px"
        />
        <label>
          {username}
        </label>
      </div>

      <div className="flex mt-5 gap-4  flex-col">
        <div className="border-b-2 border-gray-300 flex justify-between">
          <p className="px-4">Puntos acumulados</p>
          <p className="px-4">{3450}</p>
        </div>
        <div className="border-b-2 border-gray-300 flex justify-between">
          <p className="px-4">Puntos por vencer <br/><span>{"31/12/2045"}</span></p>
          <p className="px-4">{1340}</p>
        </div>
      
      </div>

      <div className="flex flex-col mt-5 bg-gray-500 text-white gap-2 rounded-md p-4 items-center">
        <p className="font-bold text-xl">Credencial Siempre Beneficios</p>
        <p className="font-bold text-xl">5987654</p>
        <p className="font-bold text-lg">Código seguridad: {123}</p>
      </div>

      <div className="flex w-full block flex-col mt-5 gap-4">
        <button
          onClick={handlePersonalData}
          className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
        >
          Datos Personales
        </button>

        <button
          onClick={handleLastMovement}
          className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
        >
          Ultimos Movimientos
        </button>
      </div>
    </div>
  )
}

export default StateAccount