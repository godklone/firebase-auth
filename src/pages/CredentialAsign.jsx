
const CredentialAssign = () => {

  const handleAfiliate = ()=>{

  }
  const handleCardAssign = ()=>{
    
  }
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

      <div className="flex w-full block flex-col mt-5 gap-4">
        <button
          onClick={handleCardAssign}
          className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
        >
         Si, quiero usar mi tarjeta de Siempre Beneficios
        </button>
        
        <button
          onClick={handleAfiliate}
          className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
        >
          Quiero afiliarme al plan de Siempre Beneficios
        </button>
      </div>
    </div >
  )
}

export default CredentialAssign