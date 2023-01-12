import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5 p-5 md:mt-16  md:justify-center flex items-center gap-6">
        <div>Parte del disenio</div>
        <div className="">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AuthLayout