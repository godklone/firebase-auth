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
          <div className={css.tableContainer}>
            <table className={css.table}>
              <thead className={css.header}>
                <tr className={css.row}>
                  {TAGS.map((tag) => (
                    <th className={css.cell} key={tag}>
                      {tag.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={css.body}>
                {movements.map((movement) => (
                  <tr className={css.row} key={movement.comprobante}>
                    {TAGS.map((tag) => (
                      <td className={css.cell} key={tag}>
                        {movement[tag.toLowerCase()]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
