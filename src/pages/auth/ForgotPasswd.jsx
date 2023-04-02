
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
      // setAlert({});
      await resetPassword(values.email);
      await Swal.fire({
        title: 'Correo enviado de forma exitosa.',
        text: 'Revisa tu correo y sigue las instrucciones para completar el proceso.',
        icon: 'success',
        showConfirmButton: true,
        showCloseButton: true,
        confirmButtonText: 'Continuar...',
      });
      // send("login");
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
      email: "",
    },
    validationSchema: validationEmailSchema,
    onSubmit
  });

  return (
    <div className="">
      <div className={css.content__forgot__passwd}>
        <h4 className='heading'>Recuperar Password</h4>
        <p className='paragraph'>
          No te acordas del password?, no te preocupes te vamos a enviar un
          email con un link para que lo puedas resetear.
        </p>

        <form autoComplete='off' onSubmit={formik.handleSubmit}>
          <div className='textfield'>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder='Email' />
            <label htmlFor='email'>Email</label>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}

          <div className={css.contentBtn}>
            <button
              type="submit"
              className="btn__primary"
              disabled={formik.isSubmitting}
            >
              Recuperar
            </button>
            <button onClick={handleCancel} className='btn__warning'>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswd;
