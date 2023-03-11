import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "../components/SideBar"
import css from "../assets/styles/components/mainLayout.module.scss"

const MainLayout = (props) => {

  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <SideBar />
          <div className={css.content}>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}

export default MainLayout