import { Link } from "react-router-dom"
import css from "../assets/styles/pages/notFound.module.scss"
import pageNotFound from "../assets/img/404-page.png"
const NotFound = () => {
  return (
    <div className={css.content}>

      <img
        src={pageNotFound}
        alt="Not Found"
        width="300px"
        height="200px"
      />
      <p style={{ textAlign: "center" }}>
        <Link to="/">Salir del sitio </Link>
      </p>
    </div>
  )
}

export default NotFound