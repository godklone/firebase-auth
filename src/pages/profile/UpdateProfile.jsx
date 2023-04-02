import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoyalty } from "../../context/LoyaltyContext";

const UpdateProfile = ({disabledField}) => {
  const navigate = useNavigate();
  const { fidelizationData } = useLoyalty();

  useEffect(() => {
    if (!fidelizationData?.identification) {
      return;
    }
    try {
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

  }, [fidelizationData])

  const handleConfirm = (e) => {
    e.preventDefault();
    navigate("/home");
  }

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
    <div className="content__general">
      <h4 className="heading">Perfil de la cuenta</h4>
      <p className="paragraph">
        Datos en el perfil de Siempre Beneficios.
        Si estos son tus datos correctos puedes continuar para finalizar el registro.       </p>

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
              disabled = {disabledField}
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
              disabled = {disabledField}
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
              disabled = {disabledField}
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
             Continuar
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

export default UpdateProfile



