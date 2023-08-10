import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AffiliationFormFields } from '../../components/affiliationForm/AffiliationFormFields';
import { AffiliationTypeSelector } from '../../components/affiliationForm/AffiliationTypeSelector ';
import { useLoyalty } from '../../context/LoyaltyContext';

import {
  affiliationInitialValues,
  validationAffiliationSchema,
} from '../../validation';

import css from '../../assets/styles/pages/loginFlow.module.scss';

export const AffiliationPage = () => {
  const navigate = useNavigate();
  const { bindProfileDataUpdate, setTransitProfile, loadingSpinner } =
    useLoyalty();

  const handleConfirm = async (values) => {
    try {
      const bindProfile = {
        identification: values.dni.replace(/[\.,]/g, ''),
        credential: values.credentialNumber.replace(/ /g, ''),
        code: values.securityCode,
      };
      await bindProfileDataUpdate(bindProfile);
      await Swal.fire({
        icon: 'success',
        title: 'Felicidades!',
        text: 'Vinculación exitosa',
        showConfirmButton: true,
        confirmButtonText: 'Continuar',
      });

      navigate('associate-data/update-profile');
    } catch (error) {
      await Swal.fire({
        title: 'Ha ocurrido un error.',
        text: 'Puedes crearte un perfil nuevo',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'Salir',
      });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleTransitProfile = (e, values) => {
    e.preventDefault();
    if (loadingSpinner) {
      return;
    }
    const transitProfile = {
      transit: true,
      dni: values.dni,
      credential: values.credentialNumber,
      code: values.securityCode,
    };
    setTransitProfile(transitProfile);
    navigate('associate-transit-data');
  };

  const formik = useFormik({
    initialValues: {
      ...affiliationInitialValues,
      affiliationType: 'dni',
    },
    validationSchema: validationAffiliationSchema,
    onSubmit: handleConfirm,
  });

  return (
    <div className='container_aux'>
      <h4 className='heading'>Vincular mi cuenta con perfil wow</h4>
      <div className={css.content__affiliation}>
        <form onSubmit={formik.handleSubmit}>
          <div className={css.instructions}>
            <p>
              Puedes hacerlo de 3 formas: Si no recuerdas tu contraseña no te
              preocupes. Sigue estos simples pasos:
            </p>
            <ul className='parenthesis'>
              <li>
                Con tu numero de <span>DNI</span>
              </li>
              <li>
                Con tu <span>N° de Credencial y Cod. Seguridad</span>
              </li>
              <li>
                Solo <span>N° Credencial</span>, para credenciales con
                numeración
                {' <'}50.000.000
              </li>
            </ul>
          </div>
          <div className={css.information}>
            En caso de que seas socio y no puedas vincular tu perfil de
            fidelización debido a no tener tu n° credencial o figures con un DNI
            incorrecto, créate un perfil transitorio. Luego comunícate con
            nosotros para unificar tus perfiles (el transitorio y el que ya
            tenias) y asi recuperar tus puntos.
          </div>
          <h5 className='option'>Elige tu forma de vincularte:</h5>

          <div className={css.containerOptions}>
            <AffiliationTypeSelector formik={formik} />
            <AffiliationFormFields formik={formik} />
          </div>

          <div className={css.contentBtn}>
            <button
              type='submit'
              disabled={formik.isSubmitting}
              className='btn__primary'
            >
              Vincular
            </button>
            <button
              onClick={(e) => handleTransitProfile(e, formik.values)}
              className='btn__quaternary'
            >
              Crear un perfil transitorio
            </button>
            <button onClick={handleCancel} className='btn__tertiary'>
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
