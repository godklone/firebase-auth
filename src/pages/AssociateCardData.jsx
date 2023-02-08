import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AssociateCardData = () => {
  const navigate = useNavigate();
  const { setAffiliate } = useAuth();
  const dniRef = useRef();
  const credentialRef = useRef();
  const codeRef = useRef();

  const handleConfirm = (e) => {
    e.preventDefault();
    console.log("Confirmando datos")
    navigate("continue-profile")
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1)
    console.log("Cancelar accion")
  }

  const handleTransitProfile = (e) => {
    e.preventDefault();
    //cambiar el state de un perdil de cuenta en transito para diferenciar 
    //de nuevo usuario y existente
    setAffiliate(true);
    navigate("associate-transit-data");
  }
  return (
    <div
      className="flex justify-center flex-col py-10"
    >
      <h2 className="text-2xl font-bold mb-6">Perfil de la cuenta</h2>
      <p className="text-gray-800 text-xl mb-6 leading-normal ">
        Debes completar los datos de tu tarjeta Siempre Beneficios, con el número de credencial y código de seguridad. También puedes usar tu DNI.
        En caso que seas un actual afiliado al plan de Beneficios Siempre, y no cuentas con tu credencial o tu DNI no corresponde a un perfil activo, puedes crear una perfil temporal, y luego presentandote en una sucursal puedes unificar los dos perfiles para recuperar todos los puntos
      </p>

      <form
        className="bg-white mt-5 px-5 py-5 rounded-md shadow-md"
      >
        {alert.message && <Alert typeAlert={alert.typeAlert} message={alert.message} />}
        <div className="flex gap-4 mb-4">
          <div className="w-3/4">
            <label htmlFor="credential">Nro Credencial</label>
            <input
              type="text"
              id="credential"
              ref={credentialRef}
              placeholder="Nro Credencial"
              className="rounded-md border mt-2 p-2 w-full placeholder-gray-400"
            />
          </div>

          <div className="w-1/4">
            <label htmlFor="code">Cod Seg</label>
            <input
              type="text"
              id="code"
              ref={codeRef}
              placeholder="Cod Seg"
              className="rounded-md border mt-2 p-2 w-full placeholder-gray-400"
            />
          </div>
        </div>
        <div>
          <label htmlFor="dni">DNI</label>
          <input
            type="text"
            id="dni"
            ref={dniRef}
            placeholder="DNI"
            className="rounded-md border mt-2 p-2 w-full placeholder-gray-400"
          />
        </div>


        <div className="flex w-full block flex-col mt-5 gap-4">
          <button
            onClick={handleConfirm}
            className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
          >
            Continuar
          </button>
          <button
            onClick={handleTransitProfile}
            className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
          >
            Crear un perfil en transito
          </button>
          <button
            onClick={handleCancel}
            className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AssociateCardData