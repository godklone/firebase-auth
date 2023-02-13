import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"
import css from "../assets/styles/components/mainLayout.module.scss"
const MainLayout = (props) => {
  return (
    <>
      <main className={css.container}>
        <SideBar />
        <div className="w-[32rem]">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default MainLayout