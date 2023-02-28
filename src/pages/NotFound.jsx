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
      <p>Lo siento, la página que estás buscando no existe.</p>
    </div>
  )
}

export default NotFound