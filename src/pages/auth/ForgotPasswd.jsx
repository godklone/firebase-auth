import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { getFirebaseAuthError } from '../../utils/mapFirebaseError';
import { useFormik } from 'formik';
import { validationEmailSchema } from '../../validation';
import css from '../../assets/styles/pages/loginFlow.module.scss';

const ForgotPasswd = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const onSubmit = async (values) => {
    try {
      await resetPassword(values.email);
      await Swal.fire({
        title: 'Correo enviado de forma exitosa.',
        text: 'Revisa tu correo y sigue las instrucciones para completar el proceso.',
        icon: 'success',
        showConfirmButton: true,
        showCloseButton: true,
        confirmButtonText: 'Continuar',
      });
      navigate('/login');
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Se produjo un error an intentar restaurar tu password',
        text: getFirebaseAuthError(err.code),
        confirmButtonText: 'Entendido',
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationEmailSchema,
    onSubmit,
  });

  return (
    <div className='container_aux'>
      <h4 className='heading'>Recuperación de contraseña</h4>
      <div className={css.content__forgot__passwd}>
        <form onSubmit={formik.handleSubmit} className={css.form}>
          <div className={css.instructions}>
            <p>
              Si no recuerdas tu contraseña no te preocupes. Sigue estos simples
              pasos:
            </p>
            <ul className='parenthesis'>
              <li>Ingresa tu email en el campo de abajo.</li>
              <li>Aprieta el botón recuperar.</li>
              <li>Vas a recibir un correo con un link de recuperación.</li>
            </ul>
          </div>
          <div className='textfields'>
            <div className='textfield'>
              <input
                id='email'
                name='email'
                type='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder='Email'
                className='mt__0'
              />
              <label htmlFor='email'>Email</label>
              <div className='alert__error'>
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null}
              </div>
            </div>
          </div>

          <div className={css.contentBtn}>
            <button
              type='submit'
              className='btn__primary'
              disabled={formik.isSubmitting}
            >
              Recuperar
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

export default ForgotPasswd;
