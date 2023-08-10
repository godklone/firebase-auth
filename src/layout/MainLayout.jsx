import { Outlet, useLocation } from 'react-router-dom';
import SideBar from '../components/SideBar';
import css from '../assets/styles/components/mainLayout.module.scss';

const MainLayout = (props) => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <main className={ProfileClass()}>
        <div className={css.container}>
          {location.pathname !== '/home' && <SideBar />}

          <div className={css.content}>
            <Outlet />
          </div>
        </div>

        {/* <Whatsapp /> */}
      </main>
    </>
  );
};

const ProfileClass = () => {
  const pages = ['/home'];
  return pages.includes(location.pathname) ? css.mainDashboard : css.main;
};
export default MainLayout;
