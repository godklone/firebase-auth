import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFormik } from "formik";

import { getFirebaseAuthError } from '../../utils/mapFirebaseError';
import { validationRegisterSchema } from '../../validation';
import css from '../../assets/styles/pages/loginFlow.module.scss';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await signup(
        values.email,
        values.password
      );

      await Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Revisa tu correo y valida tu cuenta.',
        showConfirmButton: true,
        confirmButtonText: 'Continuar...',
      });
      navigate('/home');
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: getFirebaseAuthError(error.code),
        showConfirmButton: true,
        confirmButtonText: 'Continuar...',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationRegisterSchema,
    onSubmit
  });

  const { signup } = useAuth();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.content__register}>
      <h4 className='heading'>Crear Cuenta</h4>

      <p className='paragraph'>
        Vamos a crear una cuenta con un email y clave. Estas serán tus
        credenciales para ingresar.
      </p>

      <form onSubmit={formik.handleSubmit}>
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
            id="password"
            name="password"
            placeholder='Password'
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="alert__error">
        {formik.touched.password && formik.errors.password ? (
          formik.errors.password
        ) : null}
        </div>
        <div className='textfield'>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type={showPassword ? "text" : "password"}
            placeholder='Repita su password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
          />
          <label htmlFor="repeatPassword">Repita su password</label>
        </div>
        <div className="alert__error">
        {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
         formik.errors.repeatPassword
        ) : null}
        </div>

        <div className=''>
          <input
            type="checkbox"
            id="showPassword"
            name="showPassword"
            checked={showPassword}
            onChange={handleShowPassword}
          />
          <label htmlFor="showPassword">Show password</label>
        </div>

        <div className={css.contentBtn}>
          <button
            type="submit"
            className="btn__primary"
            disabled={formik.isSubmitting}
          >Continuar</button>
          <p className='paragraph'>
            Ya tenes una cuenta creada?{' '}
            <Link to='/login' className={css.login}>
              Ingresar
            </Link>
          </p>
          <p className='paragraph'>
            Al registra una cuenta, estás de acuerdo con nuestros Terminos de
            Servicios y Políticas de privacidad
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
