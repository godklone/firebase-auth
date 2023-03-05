import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import css from '../../assets/styles/pages/stateAccount.module.scss';

const StateAccount = () => {
  const { fidelizationData, webHook, getPhotoUrl, logout } = useAuth();
  const navigate = useNavigate();

  const { fullName,
    fidelization: {
      accumulatedPoints,
      expirationPoints,
      expirationDate,
      credencial }
  } = fidelizationData;

  const handleLastMovement = (e) => {
    e.preventDefault();
    navigate("state-account/last-movement")
  }

  const handlePersonalData = (e) => {
    e.preventDefault();
    navigate("state-account/personal-data")
  }

  return (
    <div
      className={css.content__account}
    >
      <div className="">
        <a
          className=""
          href={webHook} >
          Continuar al sitio Principal
        </a>

        {/* <a
          className=""
          href="#"
          onClick={logout}
          >
          Logout
        </a> */}
      </div>

      <div className={css.avatar}>
        <img
          
          src={getPhotoUrl()}
          alt="imagen del profile"
        />

        <h6>
          {fullName}
        </h6>
      </div>

      <div className={css.points}>
        <div className={css.acumulate}>
          <p className="px-4">Puntos acumulados</p>
          <p className="px-4">{accumulatedPoints}</p>
        </div>
        <div className={css.acumulate}>
          <p className="px-4">Puntos por vencer <br /><span>{expirationDate}</span></p>
          <p className="px-4">{expirationPoints}</p>
        </div>

      </div>

      <div className={css.credential}>
        <p className="font-bold text-xl">Credencial Siempre Beneficios</p>
        <p className="font-bold text-xl">{credencial.number}</p>
        <p className="font-bold text-lg">Código seguridad: {credencial.code}</p>
      </div>

      <div className={css.groupBtn}>
        <button
          onClick={handlePersonalData}
          className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
        >
          Datos Personales
        </button>

        <button
          onClick={handleLastMovement}
          className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
        >
          Ultimos Movimientos
        </button>
      </div>
    </div>
  )
}

export default StateAccount