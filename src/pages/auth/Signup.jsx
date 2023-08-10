import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

import { getFirebaseAuthError } from '../../utils/mapFirebaseError';
import { useLoyalty } from '../../context/LoyaltyContext';
import { validationSignupSchema } from '../../validation';
import { useFormik } from 'formik';
import css from '../../assets/styles/pages/loginFlow.module.scss';

const Signup = () => {
  const navigate = useNavigate();
  const { signIn, loginWithGoogle, user } = useAuth();
  const { setLoadingSpinner, setFidelizationData } = useLoyalty();
  const [togglePasswd, setTogglePasswd] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user]);

  useEffect(() => {
    setFidelizationData(null);
  }, []);

  const handleLogin = async (values) => {
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: error,
        showConfirmButton: true,
        confirmButtonText: 'Continuar',
      });
    }
  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      await loginWithGoogle();
      navigate('/home');
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: getFirebaseAuthError(error.code),
        showConfirmButton: true,
        confirmButtonText: 'Continuar',
      });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('register');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSignupSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className='container_aux'>
      <h4 className='heading'>Bienvenid@ a WOW !</h4>
      <div className={css.content__signup}>
        <div className={css.paragraph}>
          <p>El programa de fidelización de Siempre</p>
          <p>Farmacias. Antes llamado Siempre Beneficios</p>
        </div>

        <form onSubmit={formik.handleSubmit} className={css.form}>
          <p className={css.text_login}>Inicia sesión o regístrate!</p>
          <div className='textfields'>
            <div className='textfield'>
              <input
                id='email'
                name='email'
                type='email'
                placeholder='Ingresa tu Email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <label htmlFor='email'>Email</label>
              <div className='alert__error'>
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null}
              </div>
            </div>

            <div className='textfield'>
              <input
                type={!togglePasswd ? 'password' : 'text'}
                name='password'
                placeholder='Ingresa tu contraseña'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <label htmlFor='password'>Contraseña</label>
              <div className='alert__error'>
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </div>
            </div>
          </div>
          {/* <div>
          <label>
            <input
              type='checkbox'
              onClick={() => setTogglePasswd((prev) => !prev)}
            />
            {!togglePasswd ? 'Mostrar Password' : 'Ocultar Password'}
          </label>
        </div> */}

          <p className={css.forgoten_password}>
            <Link className='link' to='forgoten-password'>
              ¿Olvidaste tu contraseña?
            </Link>
          </p>

          <div className={css.contentBtn}>
            <button
              type='submit'
              className='btn__primary'
              disabled={formik.isSubmitting}
            >
              Ingresar
            </button>

            <button onClick={handleGoogleSignin} className='btn__google'>
              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                width='44'
                height='30'
                viewBox='0 0 44 30'
                fill='none'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M27.7344 13.4011C28.4854 13.4011 29.0941 14.0099 29.0941 14.7608V14.7915C29.0941 15.5425 28.4854 16.1512 27.7344 16.1512C26.9835 16.1512 26.3748 16.76 26.3748 17.5109V17.5416C26.3748 18.2926 25.766 18.9013 25.0151 18.9013C24.2641 18.9013 23.6554 18.2926 23.6554 17.5416V17.3276C23.6554 16.5766 23.0466 15.9679 22.2957 15.9679H22.2194C21.5106 15.9679 20.936 15.3933 20.936 14.6845C20.936 13.9757 21.5106 13.4011 22.2194 13.4011H22.2957C23.0466 13.4011 23.6554 12.7924 23.6554 12.0414V12.0107C23.6554 11.2598 24.2641 10.651 25.0151 10.651C25.766 10.651 26.3748 11.2598 26.3748 12.0107V12.0414C26.3748 12.7924 26.9835 13.4011 27.7344 13.4011ZM9.3333 14.9595C9.3333 14.0988 10.031 13.4011 10.8917 13.4011H16.5548C17.3724 13.4011 18.2166 14.0502 18.2166 14.8678C18.2942 16.0764 18.1191 17.2879 17.7026 18.4234C17.2861 19.5588 16.6376 20.5928 15.7994 21.4577C14.9612 22.3227 13.9521 22.9993 12.838 23.4433C11.7238 23.8874 10.5297 24.0889 9.3333 24.0348C6.88113 24.0348 4.52941 23.0497 2.79546 21.2962C1.06152 19.5427 0.0874023 17.1644 0.0874023 14.6845C0.0874023 12.2046 1.06152 9.82635 2.79546 8.07283C4.52941 6.3193 6.88113 5.33418 9.3333 5.33418C11.0063 5.31341 12.6388 5.76695 14.0531 6.62608C14.901 7.14114 14.9198 8.30152 14.2223 9.00694C13.5293 9.7078 12.3976 9.66278 11.5018 9.2516C11.435 9.22093 11.3675 9.19178 11.2992 9.16417C10.6749 8.91162 10.0053 8.79359 9.3333 8.81763C7.79791 8.8282 6.32838 9.44971 5.24267 10.5477C4.15697 11.6456 3.5424 13.1318 3.53195 14.6845C3.52196 15.4578 3.6652 16.2252 3.9532 16.9416C4.24121 17.6579 4.66816 18.3087 5.20887 18.8555C5.74958 19.4023 6.39309 19.8341 7.10146 20.1254C7.80982 20.4166 8.56869 20.5615 9.3333 20.5514C10.5472 20.6532 11.7556 20.2976 12.726 19.5531C12.9296 19.3969 13.1197 19.226 13.2951 19.0421C14.326 17.9617 13.2075 16.5179 11.7142 16.5179H10.8917C10.031 16.5179 9.3333 15.8202 9.3333 14.9595Z'
                  fill='white'
                />
              </svg> */}
              Ingresar con Google
            </button>

            <button onClick={handleRegister} className='btn__secondary'>
              Crear una cuenta
            </button>
          </div>
          <div className={css.politicas}>
            <p>Al registrarme, declaro que soy mayor</p>
            <p>
              de edad y acepto los <a href='#'>términos y condiciones</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
