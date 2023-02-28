import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { useNavigationMachine } from '../machines/machine';
import { validEmail } from '../helpers';
import Alert from '../components/Alert';
import css from '../assets/styles/pages/signup.module.scss';
import useError from '../hooks/useError';
import Swal from 'sweetalert2';

const Signup = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, loginWithGoogle, profileAssignment, affiliate, user } = useAuth();
  const [alert, setAlert] = useError();
  const [current, send] = useNavigationMachine();
  console.log(affiliate, profileAssignment, user)

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validEmail.test(emailRef.current.value)) {
      setAlert((prevAlert) => ({
        typeAlert: 'error',
        message: 'Please enter a valid email',
      }));
      return;
    }
    try {

      await login(emailRef.current.value, passwordRef.current.value);
      // send('home');
      // await  Swal.fire({
      //   title: "Revisa tu correo y valida tu cuenta.",
      //   text: "Body del mensaje emergente",
      //   icon: 'warning',
      //   showConfirmButton: true,
      //   showCloseButton: true,
      //   confirmButtonText: 'Continuar...'
      // });
      console.log(affiliate)


    } catch (error) {
      setAlert((prevAlert) => ({ typeAlert: 'error', message: error.message }));
    }
  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      await loginWithGoogle();
      if (!profileAssignment) {
        console.log(
          'Mostrar popup para informar que el usuario no esta validado'
        );
        return;
      }
      navigate('/home');
      //determinar si el perfil de la cuenta esta asignada a
      //si esta mostrar la pagina de
    } catch (error) {
      setAlert((prevAlert) => ({ typeAlert: 'error', message: error.message }));
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('register');
  };

  return (
    <div className={css.content__signup}>
      <h4 className={css.heading}>Bienvenido</h4>

      <p className={css.paragraph}>
        Club Siempre Beneficios, si tienes una cuenta puedes Ingresar, o puedes
        crear una nueva cuenta. También puedes acceder con las redes sociales
      </p>

      <form autoComplete='off'>
        {alert.message && (
          <Alert typeAlert={alert.typeAlert} message={alert.message} />
        )}
        <div className='textfield'>
          <input
            type='email'
            id='email'
            // value={email}
            ref={emailRef}
            // onChange={e => setEmail(e.target.value)}
            placeholder='Email'
          />
          <label htmlFor='email'>Email</label>
        </div>
        <div className='textfield'>
          <input
            type='password'
            id='password'
            ref={passwordRef}
            // onChange={e => setPassword(e.target.value)}
            placeholder='Contraseña'
          />
          <label htmlFor='password'>Password</label>
        </div>

        <p className={css.forgoten_password}>
          <Link to='forgoten-password'>Olvide el password</Link>
        </p>

        <div className={css.contentBtn}>
          <button onClick={handleLogin} className='btn__primary'>
            Continuar
          </button>

          <button onClick={handleGoogleSignin} className='btn__google'>
            Ingresar con Google
          </button>

          <button onClick={handleGoogleSignin} className='btn__facebook'>
            Ingresar con Facebook
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
