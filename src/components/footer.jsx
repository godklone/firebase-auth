import css from "../assets/styles/components/footer.module.scss";
import logo_mini from "../assets/img/logo_mini.png";

function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <div className={css.ssoFooter}>
      <div className={css.brand}>
        <img className={css.logo} src={logo_mini} alt="Logo de Siempremás" />
        <span className={css.copyright}>
          Todos los derechos reservados Siempremás {thisYear}
        </span>
      </div>
      <div className={css.toc}>
        <a href="#">Términos y condiciones</a>
      </div>
    </div>
  );
}

export default Footer;
