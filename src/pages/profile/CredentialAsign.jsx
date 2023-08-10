import { useNavigate } from 'react-router-dom';
import css from '../../assets/styles/pages/loginFlow.module.scss';
import { useLoyalty } from '../../context/LoyaltyContext';

const CredentialAssign = () => {
  const navigate = useNavigate();
  const { setTransitProfile } = useLoyalty();

  const handleAfiliate = (e) => {
    e.preventDefault();
    const addCfg = {
      newClient: true,
      transit: false,
    };
    setTransitProfile((prevValue) => ({ ...prevValue, ...addCfg }));
    navigate('profile/associate-transit-data');
  };

  const handleCardAssign = (e) => {
    e.preventDefault();
    navigate('profile');
  };

  return (
    <div className='container_aux'>
      <h4 className='heading'>Vincula tu credencial o asóciate gratis!</h4>
      <div className={css.content__credential__asign}>
        <div className={css.instructions}>
          <p>
            Si ya eres socio de <span>Siempre Beneficios,</span> ahora{' '}
            <span>WOW by Siempre</span> puedes vincular tu perfil con la cuenta
            de email que acabas de utilizar. Vincúlalo con tu N° de DNI o tu N°
            de credencial.
          </p>
          <p>
            {' '}
            La próxima vez que te loguees, lo harás con tu mail y podrás ver tus
            puntos e historial de compras.
          </p>
          <p>
            Si no eres socio de Siempre,
            <span> asóciate gratis!</span>
          </p>
        </div>

        <div className={css.contentBtn}>
          <button onClick={handleCardAssign} className='btn__primary'>
            Ya soy socio
          </button>

          <button onClick={handleAfiliate} className='btn__quaternary'>
            Quiero hacerme socio
          </button>
        </div>
      </div>
    </div>
  );
};

export default CredentialAssign;
