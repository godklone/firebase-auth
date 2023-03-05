import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Alert from '../../components/Alert';
import { useAuth } from '../../context/AuthContext';
import { validEmail, validPassword } from '../../helpers';
import useError from '../../hooks/useError';
import { useNavigationMachine } from '../../machines/machine';
import css from '../../assets/styles/pages/loginFlow.module.scss';
import {  getFirebaseErrorMessage } from '../../utils/mapFirebaseError';

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const navigate = useNavigate();

  const [current, send] = useNavigationMachine();

  const { signup } = useAuth();
  const [alert, setAlert, resetAlert] = useError();

  const handleRegister = async (e) => {
    e.preventDefault();
    resetAlert();
    if (!validEmail.test(emailRef.current.value)) {
      setAlert((prevAlert) => ({
        typeAlert: 'error',
        message: 'Please enter a valid email',
      }));
      return;
    }

    if (!validPassword.test(passwordRef.current.value)) {
      setAlert((prevAlert) => ({
        typeAlert: 'error',
        message:
          'el password debe contener letras mayusculas, minusculas y caracteres numericos. La longitud debe tener entre 6 a 15 caracteres. ',
      }));
      return;
    }

    try {
      await signup(
        emailRef.current.value,
        passwordRef.current.value
      );

      await Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        showConfirmButton: false,
        timer: 2000,
      });
      await Swal.fire({
        title: 'Revisa tu correo y valida tu cuenta.',
        text: 'Body del mensaje emergente',
        icon: 'warning',
        showConfirmButton: true,
        showCloseButton: true,
        confirmButtonText: 'Continuar...',
      });

      send('home');
      navigate('/home');
    } catch (error) {

      await Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: getFirebaseErrorMessage(error.code),
        confirmButtonText: 'Entendido',
      });
    }
  };


  const verifyPasswd = () => {
    if (!validPassword.test(passwordRef.current.value)) {
      setAlert((prevAlert) => ({
        typeAlert: 'error',
        message:
          'La contrasenia debe contener letras mayusculas, minusculas y caracteres numericos. La longitud debe tener entre 6 a 15 caracteres.',
      }));
      return;
    }

  };

  const verifyRePasswd = () => {
    if (passwordRef !== rePasswordRef) {
      setAlert((prevAlert) => ({
        typeAlert: 'error',
        message: 'Ambos password deben ser iguales',
      }));
      return;
    }

  };

  const verifyEmail = () => {
    if (!validEmail.test(emailRef.current.value)) {
      setAlert((prevAlert) => ({
        typeAlert: 'error',
        message: 'Please enter a valid email',
      }));
      return;
    }
  };

  return (
    <div className={css.content__register}>
      <h4 className='heading'>Crear Cuenta</h4>

      <p className='paragraph'>
        Vamos a crear una cuenta con un email y clave. Estas serán tus
        credenciales para ingresar.
      </p>

      <form autoComplete='off'>

        <div className='textfield'>
          <input
            type='email'
            id='email'
            ref={emailRef}
            onBlur={verifyEmail}
            placeholder='Email'
          />
          <label htmlFor='email'>Email</label>
        </div>
        <div className='textfield'>
          <input
            type='password'
            id='password'
            ref={passwordRef}
            onBlur={verifyPasswd}
            placeholder='Contraseña'
          />
          <label htmlFor='password'>Password</label>
        </div>
        <div className='textfield'>
          <input
            type='password'
            id='repassword'
            ref={rePasswordRef}
            onBlur={verifyRePasswd}
            placeholder='Verifica tu Password'
          />
          <label htmlFor='repassword'>Verificar Password</label>
        </div>
        {alert.message && (
          <Alert typeAlert={alert.typeAlert} message={alert.message} />
        )}
        <div className={css.contentBtn}>
          <button onClick={handleRegister} className='btn__primary'>
            Continuar
          </button>

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
