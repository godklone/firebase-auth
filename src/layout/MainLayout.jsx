import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "../components/SideBar"
import css from "../assets/styles/components/mainLayout.module.scss"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const MainLayout = (props) => {
  const { webHook } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!webHook) {
      navigate("404")
    }
  }, [])

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