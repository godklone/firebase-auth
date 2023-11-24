import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import Footer from "../components/footer";
import Whatsapp from "../components/whatsapp";
import css from "../assets/styles/components/mainLayout.module.scss";

const MainLayout = (props) => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <main className={IsDashboard() === true ? css.mainDashboard : css.main}>
        <div className={css.container}>
          {IsDashboard() === false && <SideBar />}

          <div className={css.content}>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
      <Whatsapp />
    </>
  );
};

const IsDashboard = () => {
  const dashboardPages = ["/associate-data", "/associate-transit-data"];
  return dashboardPages.includes(location.pathname);
};

export default MainLayout;
