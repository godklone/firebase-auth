import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

import { getFirebaseAuthError } from '../../utils/mapFirebaseError';
import css from '../../assets/styles/pages/loginFlow.module.scss';
import { useLoyalty } from '../../context/LoyaltyContext';
import { validationSignupSchema } from '../../validation';
import { useFormik } from 'formik';

const Signup = () => {
  const navigate = useNavigate();
  const { signIn, loginWithGoogle, user } = useAuth();
  const { setLoadingSpinner, setFidelizationData } = useLoyalty();
  const [togglePasswd, setTogglePasswd] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
    // return ()=>navigate('/home');
  }, [user]);

  useEffect(() => {
    setFidelizationData(null);
  }, [])

  const handleLogin = async (values) => {
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: error,
        showConfirmButton: true,
        confirmButtonText: 'Continuar...',
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
        confirmButtonText: 'Continuar...',
      });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('register');
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSignupSchema,
    onSubmit: handleLogin
  });

  return (
    <div className={css.content__signup}>
      <h4 className='heading'>Bienvenido</h4>

      <p className='paragraph mb__1'>
        Club Siempre Beneficios, si tienes una cuenta puedes Ingresar, o puedes
        crear una nueva cuenta. También puedes acceder con las redes sociales
      </p>

      <form autoComplete='off' onSubmit={formik.handleSubmit}>
        <div className='textfield'>
          <input
            id="email"
            name="email"
            type="email"
            placeholder='Email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="alert__error">
          {formik.touched.email && formik.errors.email ? (
            formik.errors.email
          ) : null}
        </div>
        <div className='textfield'>
          <input
            type={!togglePasswd ? "password" : "text"}
            name='password'
            placeholder='Contraseña'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <label htmlFor='password'>Contraseña</label>
        </div>
        <div className="alert__error">
          {formik.touched.password && formik.errors.password ? (
            formik.errors.password
          ) : null}
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              onClick={() => setTogglePasswd(prev => !prev)}
            />
            {!togglePasswd ? "Mostrar Password" : "Ocultar Password"}
          </label>
        </div>

        <p className={css.forgoten_password}>
          <Link to='forgoten-password'>Olvide el password</Link>
        </p>

        <div className={css.contentBtn}>
          <button
            type="submit"
            className="btn__primary"
            disabled={formik.isSubmitting}
          >
            Continuar
          </button>

          <button onClick={handleGoogleSignin} className='btn__google'>
            Ingresar con Google
          </button>

          <button onClick={handleRegister} className='btn__secondary'>
            Crear una cuenta
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
