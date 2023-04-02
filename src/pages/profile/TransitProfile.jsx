import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useLoyalty } from "../../context/LoyaltyContext";
import { validationProfileSchema } from "../../validation";
import { validNumberInputChange } from "../../helpers";

import css from '../../assets/styles/pages/profile.module.scss';

const TransitProfile = (props) => {
  const navigate = useNavigate();
  const { profileDataCreate, transitProfile, loadingSpinner } = useLoyalty();

  const handleConfirm = async (values) => {
    try {
      const profile = {
        transit: transitProfile.transit,
        identification: values.identification.replace(/\./g, ''),
        name: values.name,
        surename: values.surename,
      };

      await profileDataCreate(profile);
      await Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        confirmButtonText: 'Continuar...',
      });
      navigate('/home');
    } catch (error) {
      console.log(error)
      await Swal.fire({
        title: 'Ha ocurrido un error.',
        text: error,
        icon: 'error',
        confirmButtonText: 'Continuar...',
      });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const initialValues = {
    surename: '',
    name: '',
    identification: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationProfileSchema,
    onSubmit: handleConfirm,
  });

  return (
    <div className={css.content__profile}>
      <h4 className='heading'>Perfil de la cuenta.</h4>
      {transitProfile?.newClient && (
        <p className='paragraph'>
          Vamos a crear un nuevo perfil en fidelización y quedara asociado con
          tu email.
        </p>
      )}
      <form
        onSubmit={formik.handleSubmit}
      >
        <>
          <div className='textfield'>
            <input
              type="text"
              id="surename"
              name="surename"
              placeholder="Apellidos"
              {...formik.getFieldProps('surename')}
            />
            <label htmlFor="surename">Apellidos:</label>
          </div>
          {formik.touched.surename && formik.errors.surename ? (
            <div className="alert__error">{formik.errors.surename}</div>
          ) : null}
        </>
        <>
          <div className='textfield'>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombres"
              {...formik.getFieldProps('name')}
            />
            <label htmlFor="name">Nombres:</label>
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className="alert__error">{formik.errors.name}</div>
          ) : null}
        </>
        <>
          <div className='textfield'>
            <input
              type="text"
              name="identification"
              placeholder="Ingrese su DNI"
              maxLength="11"
              value={formik.values.identification}
              onChange={(e) => validNumberInputChange(e, formik.setFieldValue)}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="identification">Número de DNI:</label>
          </div>
          {formik.touched.identification && formik.errors.identification ? (
            <div className="alert__error">{formik.errors.identification}</div>
          ) : null}
        </>

        <div className={css.contentBtn}>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className='btn__primary'
          >
            Confirmar
          </button>
          <button
            onClick={handleCancel}
            className='btn__secondary'
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransitProfile;
