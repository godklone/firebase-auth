import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { useNavigationMachine } from '../../machines/machine';
import { validEmail } from '../../helpers';
import Alert from '../../components/Alert';
import css from '../../assets/styles/pages/loginFlow.module.scss';
import useError from '../../hooks/useError';
import { getFirebaseAuthError } from '../../utils/mapFirebaseError';

const Signup = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn, loginWithGoogle, profileAssignment, user } =useAuth();
  const [alert, setAlert] = useError();
  const [current, send] = useNavigationMachine();
  
  useEffect(() => {
    console.log("Usuario logueado", user);
    if (user) {
      navigate('/home');
    }
    // return ()=>navigate('/home');
  }, [user]);

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
      await signIn(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setAlert((prevAlert) => ({ typeAlert: 'error', message:  getFirebaseAuthError(error.code) }));
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
      setAlert((prevAlert) => ({ typeAlert: 'error', message: getFirebaseAuthError(error.code) }));
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('register');
  };

  return (
    <div className={css.content__signup}>
      <h4 className='heading'>Bienvenido</h4>

      <p className='paragraph'>
        Club Siempre Beneficios, si tienes una cuenta puedes Ingresar, o puedes
        crear una nueva cuenta. También puedes acceder con las redes sociales
      </p>

      <form autoComplete='off'>
        <div className='textfield'>
          <input
            type='email'
            id='email'
            ref={emailRef}
            placeholder='Email'
          />
          <label htmlFor='email'>Email</label>
        </div>
        <div className='textfield'>
          <input
            type='password'
            id='password'
            ref={passwordRef}
            placeholder='Contraseña'
          />
          <label htmlFor='password'>Password</label>
        </div>
        {alert.message && (
          <Alert typeAlert={alert.typeAlert} message={alert.message} />
        )}

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

          {/* <button onClick={handleGoogleSignin} className='btn__facebook'>
            Ingresar con Facebook
          </button> */}

          <button onClick={handleRegister} className='btn__secondary'>
            Crear una cuenta
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
