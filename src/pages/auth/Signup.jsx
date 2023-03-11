import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useRef } from 'react';
import useError from '../../hooks/useError';
// import { useNavigationMachine } from '../../machines/machine';
import Alert from '../../components/Alert';
import { validEmail } from '../../helpers';
import { getFirebaseAuthError } from '../../utils/mapFirebaseError';
import css from '../../assets/styles/pages/loginFlow.module.scss';
import { useLoyalty } from '../../context/LoyaltyContext';

const Signup = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [alert, setAlert] = useError();
  const { signIn, loginWithGoogle, user, setAuthError } =useAuth();
  const {setLoadingSpinner,     setFidelizationData } = useLoyalty();
  // const [current, send] = useNavigationMachine();
  
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
    // return ()=>navigate('/home');
  }, [user]);

  useEffect(() => {
    setFidelizationData(null);
  }, [])

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
      await Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text:   error,
        confirmButtonText: 'Entendido',
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
        text:   getFirebaseAuthError(error.code),
        confirmButtonText: 'Entendido',
      });
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
