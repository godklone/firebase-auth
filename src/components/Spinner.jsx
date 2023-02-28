import css from "../assets/styles/components/spinner.module.scss";
const Spinner = () => {
  return (
    <div className={css.content}>
      <div className={css.ldsGrid}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

  )
}

export default Spinner