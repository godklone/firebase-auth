
const PasswordRestore = () => {
  const handleEvent = (event) => {
    event.preventDefault();
  }
  return (
    <div
      className="flex justify-center flex-col py-10"
    >
      <div className="">
        <h2 className="text-2xl font-bold mb-6"> Password Recuperado</h2>
        <p className="text-gray-800 text-xl mb-8">
          Ya te hemos enviado el email. Una vez que completes el proceso de recuperación de clave, puedes volver a ingresar en la app.</p>
      </div>

      <div
        className="bg-white mt-10 px-5 py-10 rounded-md shadow-md"
      >
        <div className="flex w-full block flex-col mt-5 gap-4">
          <button
            onClick={handleEvent}
            className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PasswordRestore