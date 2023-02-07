import { Navigate, Outlet } from "react-router-dom"
import SideBar from "../component/SideBar";
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = () => {
  const { token, loading } = useAuth();
  if (loading) return "cargando..."
 
  return (
    <>
      {!token
        ? <Navigate to="/login" />
        : (
          <main className="container mx-auto mt-5 p-5 md:mt-10  justify-center flex md:items-center gap-6">
            <SideBar />
            <div className="w-[32rem]">
              <Outlet />
            </div>
          </main>
        )
      }
    </>
  )
}

export default ProtectedRoute