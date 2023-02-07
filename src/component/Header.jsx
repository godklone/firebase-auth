import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-white py-5 px-4 border-b">
      <div className="md:flex md:justify-between ">
        <h1 className="text-center text-4xl text-sky-700 font-black">UpTask</h1>
        <input 
          type="search" 
          placeholder="Busqueda avanzada..."
          className="px-4 py-2 rounded-md w-96 block"
         />
         <div className="flex items-center gap-4">
          <Link to="/projects" className="text-xl font-bold">Projects</Link>
          <button className="bg-sky-600 py-2 px-3 rounded-md text-white font-bold text-sm">Logout</button>
         </div>

      </div>
    </header>
  )
}

export default Header