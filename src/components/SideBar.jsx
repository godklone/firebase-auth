import css from "../assets/styles/components/sidebar.module.scss";
import logo from "../assets/img/logo.png";

const SideBar = () => {
  return (
    <aside className={css.sidebar}>
      <img src={logo} alt="Siempremás" className={css.logo} />
    </aside>
  );
};

export default SideBar;
