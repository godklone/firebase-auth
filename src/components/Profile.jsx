import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({title, }) => {
  const navigate = useNavigate();
  const dniRef = useRef();
  const namesRef = useRef();
  const lastNameRef = useRef();

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
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <form
        className="bg-white mt-5 px-5 py-5 rounded-md shadow-md"
      >
        {alert.message && <Alert typeAlert={alert.typeAlert} message={alert.message} />}
        <div>
          <label htmlFor="credential">Nombres</label>
          <input
            type="text"
            id="names"
            ref={namesRef}
            placeholder="Nombres"
            className="rounded-md border mt-2 p-2 w-full placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="lastName">Apellidos</label>
          <input
            type="text"
            id="lasName"
            ref={lastNameRef}
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
            Continuar
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

export default Profile