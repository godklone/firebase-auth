import css from "../assets/styles/components/toolbar.module.scss";
import logo from "../assets/img/logo.png";

const Toolbar = () => {
  return (
    <nav className={css.dashboard_toolbar}>
      <div className={css.container}>
        <div className={css.brand}>
          <img src={logo} alt="Siempremás" className={css.logo} />
        </div>

        <div className={css.menu}>
          <a href="#">Regresar a la tienda</a>
          <a href="#">Inicio</a>
          <a href="#">Historial de puntos</a>
          <a href="#">Mis datos</a>
          <a href="#"></a>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
