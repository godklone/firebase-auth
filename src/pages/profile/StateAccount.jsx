import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import css from '../../assets/styles/pages/stateAccount.module.scss';
import { useLoyalty } from "../../context/LoyaltyContext";

const StateAccount = () => {
  const { webHook, getPhotoUrl, logout } = useAuth();
  const {setFidelizationData, fidelizationData, setLoadingSpinner } = useLoyalty();
  const navigate = useNavigate();

  const {
    fullName,
    fidelization: {
      accumulatedPoints,
      expirationPoints,
      expirationDate,
      credencial,
    },
  } = fidelizationData;

  const handleLastMovement = (e) => {
    e.preventDefault();
    navigate('state-account/last-movement');
  };

  const handlePersonalData = (e) => {
    e.preventDefault();
    navigate('state-account/personal-data');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoadingSpinner(true)
    setFidelizationData(null);
    await logout();
    navigate(`/?webhook=${webHook}`)
   
  }

  return (
    <div className={css.content__account}>
      <div className={css.btnHeader}>
        <a className='btn__primary' href={webHook}>
          Continuar al sitio Principal
        </a>
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
    </div>
  );
};

export default StateAccount;
