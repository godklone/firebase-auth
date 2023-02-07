import { useNavigate } from "react-router-dom";

const LastMovement = () => {
  const navigate = useNavigate()
  const handleBack =(e)=>{
    e.preventDefault();
    console.log("regresar a state account")
    navigate(-1);
  }
  
  return (
    <div
      className="flex justify-center flex-col py-10"
    >
      <h2>Ultimos Movimientos</h2>
     
      <div className="flex  mt-5 gap-4">
        <p>Listado aqui</p>
      </div>
      
      <div className="flex w-full block flex-col mt-5 gap-4">
    
        <button
          onClick={handleBack}
          className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
        >
          Regresar
        </button>
      </div>
    </div>
  )
}

export default LastMovement