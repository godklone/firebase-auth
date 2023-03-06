import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "../components/SideBar"
import css from "../assets/styles/components/mainLayout.module.scss"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useLoyalty } from "../context/LoyaltyContext";
import Spinner from "../components/Spinner";

const MainLayout = (props) => {
  const { webHook } = useAuth();
  const navigate = useNavigate();
  const { loadingSpinner } = useLoyalty();
  useEffect(() => {
    if (!webHook) {
      navigate("404")
    }
  }, [])

  if (loadingSpinner) {
    return <Spinner />
  }
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