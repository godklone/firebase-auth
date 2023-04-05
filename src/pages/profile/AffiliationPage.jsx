import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AffiliationFormFields } from '../../components/affiliationForm/AffiliationFormFields';
import { AffiliationTypeSelector } from '../../components/affiliationForm/AffiliationTypeSelector ';
import { useLoyalty } from '../../context/LoyaltyContext';
import CarouselText from '../../components/CarouselText ';

import { affiliationInitialValues, validationAffiliationSchema } from '../../validation'

import css from '../../assets/styles/pages/profile.module.scss'

export const AffiliationPage = () => {
  const navigate = useNavigate();
  const { bindProfileDataUpdate, setTransitProfile, loadingSpinner } = useLoyalty();

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
        title: 'Actualizacion exitosa.',
        showConfirmButton: true,
        confirmButtonText: 'Continuar...',
      });

      navigate('associate-data/update-profile');
    } catch (error) {
      await Swal.fire({
        title: 'Ha ocurrido un error.',
        text: error,
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'Continuar...',
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
      affiliationType: "dni"
    },
    validationSchema: validationAffiliationSchema,
    onSubmit: handleConfirm,
  });

  return (
    <div className='content__general'>
      <h4 className='heading'>Vincular Perfil de la cuenta</h4>
      <CarouselText intervalTime={3000}>
        <span>Debes completar los datos de tu tarjeta Siempre Beneficios, con el
          número de credencial y código de seguridad. También puedes usar tu DNI.
        </span>
        <span>En caso que seas un actual afiliado al plan de Beneficios Siempre, y no
          cuentas con tu credencial o tu DNI no corresponde a un perfil activo,
          puedes crear una perfil temporal, y luego presentandote en una sucursal
          puedes unificar los dos perfiles para recuperar todos los puntos.
        </span>
      </CarouselText>

      {/* <p className='paragraph'>
        Debes completar los datos de tu tarjeta Siempre Beneficios, con el
        número de credencial y código de seguridad. También puedes usar tu DNI.
        En caso que seas un actual afiliado al plan de Beneficios Siempre, y no
        cuentas con tu credencial o tu DNI no corresponde a un perfil activo,
        puedes crear una perfil temporal, y luego presentandote en una sucursal
        puedes unificar los dos perfiles para recuperar todos los puntos.
      </p> */}
      <form onSubmit={formik.handleSubmit}>
        <AffiliationTypeSelector formik={formik} />
        <AffiliationFormFields formik={formik} />
        <div className={css.contentBtn}>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className='btn__primary'
          >
            Continuar
          </button>
          <button
            onClick={(e) => handleTransitProfile(e, formik.values)}
            className='btn__secondary'
          >
            Crear un perfil en transito
          </button>
          <button onClick={handleCancel} className='btn__warning'>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
