import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Alert from '../../components/Alert';
import { useAuth } from '../../context/AuthContext';
import { validEmail } from '../../helpers';
import useError from '../../hooks/useError';

import css from '../../assets/styles/pages/loginFlow.module.scss';
import { getFirebaseAuthError } from '../../utils/mapFirebaseError';

const ForgotPasswd = () => {
  const emailRef = useRef();
  const [alert, setAlert] = useError();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleRestoreEmail = async (e) => {
    e.preventDefault();
    if (!validEmail.test(emailRef.current.value)) {
      setAlert((prevAlert) => ({
        typeAlert: 'error',
        message: 'Please enter a valid email',
      }));
      return;
    }
    try {
      setAlert({});
      await resetPassword(emailRef.current.value);
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

  return (
    <div className={viewModal ? 'fijar' : ''}>
      <div className={css.content__forgot__passwd}>
        <h4 className='heading'>Recuperar Password</h4>
        <p className='paragraph'>
          No te acordas del password?, no te preocupes te vamos a enviar un
          email con un link para que lo puedas resetear.
        </p>

        <form autoComplete='off'>
          <div className='textfield'>
            <input type='email' id='email' ref={emailRef} placeholder='Email' />
            <label htmlFor='email'>Email</label>
          </div>
          {alert.message && (
            <Alert typeAlert={alert.typeAlert} message={alert.message} />
          )}

          <div className={css.contentBtn}>
            <button onClick={handleRestoreEmail} className='btn__primary'>
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
