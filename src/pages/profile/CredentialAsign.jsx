import { useNavigate } from 'react-router-dom';
import css from '../../assets/styles/pages/credentialAsign.module.scss';
import { useLoyalty } from '../../context/LoyaltyContext';

const CredentialAssign = () => {
  const navigate = useNavigate();
  const {  setTransitProfile } = useLoyalty();

  const handleAfiliate = (e) => {
    e.preventDefault();
    const addCfg = {
      newClient:true, 
      transit:false
    }
    setTransitProfile(prevValue=>({...prevValue, ...addCfg }))
    navigate('profile/associate-transit-data');
  };

  const handleCardAssign = (e) => {
    e.preventDefault();
    navigate('profile');
  };

  return (
    <div className='content__general'>
      <h4 className='heading'>
        Vincular con mi credencial de Siempre Beneficios
      </h4>
      <p className='paragraph'>
        Si ya tienes una tarjeta de Siempre Beneficios, puedes vincularla con la
        cuenta que estás creando en la app y acceder a todo tu historial de
        compras y puntos.
      </p>

      <div className={css.contentBtn}>
        <button onClick={handleCardAssign} className='btn__tertiary'>
          Si, quiero usar mi tarjeta de Siempre Beneficios
        </button>

        <button onClick={handleAfiliate} className='btn__tertiary'>
          Quiero afiliarme al plan de Siempre Beneficios
        </button>
      </div>
    </div>
  );
};

export default CredentialAssign;
