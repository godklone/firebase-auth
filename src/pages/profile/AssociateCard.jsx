import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AssociateCard = () => {
  const navigate = useNavigate();
  const dniRef = useRef();
  const credentialRef = useRef();
  const codeRef = useRef();


  const handleConfirm = (e) => {
    e.preventDefault();
    console.log("Confirmando datos")
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1)
    console.log("Cancelar accion")
  }
  return (
    <div
      className="flex justify-center flex-col py-10"
    >
      <h2 className="text-2xl font-bold mb-6">Datos Personales</h2>
      {/* <p className="text-gray-800 text-xl mb-6"></p> */}

      <form
        className=""
      >
        {alert.message && <Alert typeAlert={alert.typeAlert} message={alert.message} />}
        <div>
          <label htmlFor="credential">Nro Credencial</label>
          <input
            type="text"
            id="credential"
            ref={credentialRef}
            placeholder="Nro Credencial"
            className="rounded-md border mt-2 p-2 w-full placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="code">Cod Seg</label>
          <input
            type="text"
            id="code"
            ref={codeRef}
            placeholder="Cod Seg"
            className="rounded-md border mt-2 p-2 w-full placeholder-gray-400"
          />
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
            Confirmar
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

export default AssociateCard