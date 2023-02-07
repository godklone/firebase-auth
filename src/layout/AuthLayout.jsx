import { Outlet } from "react-router-dom"
import SideBar from "../component/SideBar"

const AuthLayout = (props) => {
  return (
    <>
      <main className="container mx-auto mt-5 p-5 md:mt-10  justify-center flex md:items-center gap-6">
        <SideBar />
        <div className="w-[32rem]">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AuthLayout