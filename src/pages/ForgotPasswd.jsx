import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import { validEmail } from "../helpers";
import useError from "../hooks/useError";

const ForgotPasswd = () => {
  const emailRef = useRef();
  const [viewModal, setViewModal] = useState(false);
  const [animate, setAnimate] = useState(false)
  const [alert, setAlert] = useError();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleRestoreEmail = (e) => {
    e.preventDefault(); 
    if(!validEmail.test(emailRef.current.value)){
      setAlert(prevAlert=>({typeAlert:"error", message:"Please enter a valid email"}))
      return;
    }
    setAlert({})
    setViewModal(!viewModal);
    setTimeout(() => {
      setAnimate(true)
    }, 500)
  };


  return (
    <div className={viewModal ? "fijar" : ""}>
      <div
        className="flex justify-center flex-col py-10"
      >
        <div className="">
          <h2 className="text-2xl font-bold mb-6">Recuperar Password</h2>
          <p className="text-gray-800 text-xl mb-8">
            No te acordas del password?, no te preocupes te vamos a enviar un email con un link para que lo puedas resetear.
          </p>
        </div>

        <form
          className="bg-white mt-10 px-5 py-10 rounded-md shadow-md"
        >
          {alert.message && <Alert typeAlert ={alert.typeAlert} message ={alert.message}/>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="Email"
              className="rounded-md border mt-2 p-2 w-full placeholder-gray-400"
            />
          </div>

          <div className="flex w-full block flex-col mt-5 gap-4">
            <button
              onClick={handleRestoreEmail}
              className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
            >
              Recuperar
            </button>
            <button
              onClick={handleCancel}
              className="bg-sky-600 py-2 px-4 hover:bg-sky-700 transition-colors rounded-md text-white font-bold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      {viewModal &&
        <Modal
          setViewModal={setViewModal}
          setAnimate={setAnimate}
          animate={animate}
        >
        </Modal>
      }
      {/* <PasswordRestore /> */}
    </div>

  )
}

export default ForgotPasswd