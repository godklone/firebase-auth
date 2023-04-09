import { useNavigate } from "react-router-dom";
import { useLoyalty } from "../../context/LoyaltyContext";

import css from '../../assets/styles/pages/lastMovements.module.scss';



function LastMovement() {
  const navigate = useNavigate();
  const {lastMovents:{TAGS, movements}}= useLoyalty();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className={css.main}>
      <div className={css.container}>
        <div className={css.content}>
          <h2 className={css.title}>Ultimos Movimientos</h2>
          <ul className={css.list}>
            <li className={`${css.row} ${css.rowHeader}`}>
              {TAGS.map((tag) => (
                <div className={`${css.cell} ${css.headerCell}`} key={tag}>
                  {tag.toUpperCase()}
                </div>
              ))}
            </li>
            {movements.map((movement) => (
              <li className={css.row} key={movement.comprobante}>
                {TAGS.map((tag) => (
                  <div className={`${css.cell} ${css.cellValue}`} key={tag}>
                    {movement[tag.toLowerCase()]}
                  </div>
                ))}
              </li>
            ))}
          </ul>
          <div className={css.contentBtn}>
            <button
              onClick={handleBack}
              className="btn__primary"
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastMovement;
