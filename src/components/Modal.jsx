import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigationMachine } from '../machines/machine';

import css from "../assets/styles/components/modal.module.scss";

const Modal = ({
  children,
  setViewModal,
  animate,
  setAnimate
}) => {

  const navigate = useNavigate();
  const [current, send] = useNavigationMachine();

  const handleContinue = (e) => {
    e.preventDefault();
    setAnimate(false)
    setTimeout(() => {
      setViewModal(false)
    }, 300)
    send("SIGNUP")
    navigate('/login');
  }

  return (
    <div className={css.modal}>
      <div
        className="bg-white grid justify-center m-auto w-160 gap-5 my-52 p-10 rounded-md "
      >
        <div className="">
          <h2 className="text-2xl font-bold mb-6"> Password Recuperado</h2>
          <p className="text-gray-800 text-xl mb-8">
            Ya te hemos enviado el email. Una vez que completes el proceso de recuperación de clave, puedes volver a ingresar en la app.</p>
        </div>

        <div
          className=""
        >
          <div className="">
            <button
              onClick={handleContinue}
              className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal