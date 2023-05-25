import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"
import css from "../assets/styles/components/mainLayout.module.scss"
import { FaWhatsapp } from 'react-icons/fa';


const MainLayout = (props) => {
  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <SideBar />
          <div className={css.content}>
            <Outlet />
          </div>
          <div className={css.whatsApp}>
            <a
              href="https://wa.me/+5492494629504"
              target="_blank"
              rel="noopener noreferrer"
              className={css.whatsappLink}
            >
              <FaWhatsapp size={40} className={css.whatsappIcon}/>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

export default MainLayout