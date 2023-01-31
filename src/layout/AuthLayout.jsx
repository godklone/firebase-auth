import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5 p-5 md:mt-16  justify-center flex md:items-center gap-6">
        <div className="max-md:hidden">Parte del disenio</div>
        <div className="w-[32rem]">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AuthLayout