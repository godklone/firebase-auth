import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"
import css from "../assets/styles/components/mainLayout.module.scss"
const MainLayout = (props) => {
  return (
    <>
      <main className={css.container}>
        <SideBar />
        <div className={css.innerContent}>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default MainLayout