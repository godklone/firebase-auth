import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLoyalty } from "../../context/LoyaltyContext";

import { BiLogOut } from 'react-icons/bi';
import css from '../../assets/styles/pages/stateAccount.module.scss';

const StateAccount = () => {
  const { webHook, getPhotoUrl, logout } = useAuth();
  const navigate = useNavigate();
  const {
    getLastMovements,
    setFidelizationData,
    fidelizationData,
    setLoadingSpinner,
    setTransitProfile
  } = useLoyalty();
  
  const {
    fullName,
    fidelization: {
      accumulatedPoints,
      expirationPoints,
      expirationDate,
      credencial,
    },
  } = fidelizationData;


  const handlePersonalData = (e) => {
    e.preventDefault();
    navigate('state-account/personal-data');
  };

  const handleLastMovement = async (e) => {
    e.preventDefault();
    await getLastMovements("11968864");
    navigate('last-movement');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoadingSpinner(true)
    setFidelizationData(null);
    setTransitProfile(null)
    await logout();
    navigate(`/ ${webHook}? "?webhook="${webHook}:""`)
  }

  return (
    <div className={css.content__account}>
      <div className={css.btnHeader}>
        {
          !!webHook && webHook !== "invalid" && <a className='btn__primary' href={webHook}>
            Continuar al sitio Principal
          </a>
        }
        <button className='btn_logout' onClick={handleLogout}>
          <BiLogOut />
        </button>
      </div>

      <div className={css.avatar}>
        <img src={getPhotoUrl()} alt='imagen del profile' />
        <span className={css.name}>{fullName}</span>
      </div>

      <div className={css.points}>
        <div className={css.acumulate}>
          <p className='paragraph'>Puntos acumulados</p>
          <p className='paragraph'>{accumulatedPoints}</p>
        </div>
        <div className={css.acumulate}>
          <p className='paragraph'>
            Puntos por vencer (<span>{expirationDate}</span>)
          </p>
          <p className='paragraph'>{expirationPoints}</p>
        </div>
      </div>

      <div className={css.credential}>
        <span className={css.title}>Siempre Beneficios</span>
        <span className={css.number}>N°: {credencial.number}</span>
        <span className={css.cod}>Cód. Seg: {credencial.code}</span>
      </div>
      <div className={css.conten__btn}>
        <button
          onClick={handlePersonalData}
          className="btn__primary"
        >
          Datos Personales
        </button>

        <button
          onClick={handleLastMovement}
          className="btn__secondary"
        >
          Ultimos Movimientos
        </button>
      </div>
    </div>
  );
};

export default StateAccount;
