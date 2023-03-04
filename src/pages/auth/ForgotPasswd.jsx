import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Alert from '../../components/Alert';
import Modal from '../../components/Modal';
import { useAuth } from '../../context/AuthContext';
import { validEmail } from '../../helpers';
import useError from '../../hooks/useError';

import css from '../../assets/styles/pages/loginFlow.module.scss';

const ForgotPasswd = () => {
  const emailRef = useRef();
  const [viewModal, setViewModal] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [alert, setAlert] = useError();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  // let [searchParams, setSearchParams] = useSearchParams();

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
        text: err.message,
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
          {alert.message && (
            <Alert typeAlert={alert.typeAlert} message={alert.message} />
          )}
          <div className='textfield'>
            <input type='email' id='email' ref={emailRef} placeholder='Email' />
            <label htmlFor='email'>Email</label>
          </div>

          <div className={css.contentBtn}>
            <button onClick={handleRestoreEmail} className='btn__primary'>
              Recuperar
            </button>
            <button onClick={handleCancel} className='btn__tertiary'>
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {viewModal && (
        <Modal
          setViewModal={setViewModal}
          setAnimate={setAnimate}
          animate={animate}
        />
      )}
      {/* <PasswordRestore /> */}
    </div>
  );
};

export default ForgotPasswd;
