import { useEffect } from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useLoyalty } from '../../context/LoyaltyContext';
import { genders, validationPersonalDataSchema } from '../../validation';
import { validNumberInputChange } from '../../helpers';

import css from '../../assets/styles/pages/profile.module.scss';

const PersonalData = () => {
  const navigate = useNavigate();
  const { fidelizationData } = useLoyalty();

  useEffect(() => {
    if (fidelizationData) {
      try {
        //Cargar objeto de genero desde la api de fidelizacion
        formik.setValues({
          surename: fidelizationData.surename,
          name: fidelizationData.name,
          birthday: fidelizationData.birthday,
          identification: fidelizationData.identification,
          gender: fidelizationData.gender,
        });
      } catch (error) {
        console.error('Error al cargar los datos del usuario', error);
      }
    }
  }, [])

  const handleConfirm = async (values) => {
    try {
      const dtoProfile = {
        surename: values.surename,
        name: values.name,
        birthday: values.birthday,
        identification: values.identification.replace(/[\.,]/g, ''),
        gender: JSON.parse(values.gender),
        localization: null // este valor debe ser agregado a la implementación final
      };

      await profileDataUpdate(dtoProfile);
      await Swal.fire({
        icon: 'success',
        title: 'Actualizacion exitosa',
        text: 'Revisa tu correo y valida tu cuenta.',
        showConfirmButton: true,
        confirmButtonText: 'Continuar...',
      });
      navigate(-1);

    } catch (error) {
      await swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: error,
        showConfirmButton: true,
        confirmButtonText: 'Continuar...',
      });
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1)
  }

  const initialValues = {
    surename: '',
    name: '',
    birthday: '',
    identification: '',
    gender: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationPersonalDataSchema,
    onSubmit: handleConfirm,
  });

  return (
    <div
      className='content__general'
    >
      <h2 className="">Datos Personales</h2>
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
          <div className="alert__error">
            {formik.touched.surename && formik.errors.surename ? (
              formik.errors.surename
            ) : null}
          </div>
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
          <div className="alert__error">
            {formik.touched.name && formik.errors.name ? (
              formik.errors.name
            ) : null}
          </div>
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
          <div className="alert__error">
            {formik.touched.identification && formik.errors.identification ? (
              formik.errors.identification
            ) : null}
          </div>
        </>
        <>
          <div className='textfield'>
            <input
              type="date"
              id="birthday"
              name="birthday"
              placeholder='Fecha de Nacimiento'
              {...formik.getFieldProps('birthday')}
            />
            <label htmlFor="birthday">Fecha de Nacimiento:</label>
          </div>
          <div className="alert__error">
            {formik.touched.birthday && formik.errors.birthday ? (
              formik.errors.birthday
            ) : null}
          </div>
        </>
        <>
          <div className='textfield'>
            <select id="gender" name="gender" {...formik.getFieldProps('gender')}>
              <option value="">Seleccione su género</option>
              {genders.map(gender => {
                return (
                  <option key={gender.id} value={JSON.stringify(gender)} >
                    {gender.description}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="alert__error">
            {formik.touched.gender && formik.errors.gender ? (
              formik.errors.gender
            ) : null}</div>
        </>
        <div className="contentBtn">
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
  )
}

export default PersonalData