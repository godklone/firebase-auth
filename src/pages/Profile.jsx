const Profile = () => {
  return (
    <div
      className="flex justify-center flex-col py-10"
    >
      <div className="">
        <h2>Vincular con mi credencial de Siempre Beneficios</h2>
        <p>
          Si ya tienes una tarjeta de Siempre Beneficios, puedes vincularla con la cuenta que estás creando en la app y acceder a todo tu historial de compras y puntos.
        </p>
      </div>

      <div className="flex  mt-5 gap-4">
        <div>
          <p className="w-2/3">Nro Credencial</p>
          <p className="w-1/3">Cod Seg</p>
        </div>
        <p>DNI</p>
      </div>
      <div className="flex w-full block flex-col mt-5 gap-4">
        <button
          onClick={handleCardAssign}
          className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
        >
          Continuar
        </button>

        <button
          onClick={handleAfiliate}
          className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
        >
          Crear un perfil en transito
        </button>
        <button
          onClick={handleAfiliate}
          className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default Profile