import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoyalty } from '../../context/LoyaltyContext';

const PersonalData = () => {
  const navigate = useNavigate();
  const { fidelizationData } = useLoyalty();

  const dniRef = useRef();
  const nameRef = useRef();
  const lastNameRef = useRef();
  const xxxxRef = useRef();
  const yyyyRef = useRef();


  useEffect(() => {
    if (fidelizationData) {
      dniRef.current.value = fidelizationData.identification;
      nameRef.current.value = fidelizationData.name;
      lastNameRef.current.value = fidelizationData.surName;
    }
  }, [])

  const handleConfirm = (e) => {
    e.preventDefault();
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1)
  }

  return (
    <div
      className=""
    >
      <h2 className="">Datos Personales</h2>

      <form
        className=""
      >
        {alert.message && <Alert typeAlert={alert.typeAlert} message={alert.message} />}
        <div>
          <label htmlFor="names">Nombres</label>
          <input
            type="text"
            id="names"
            ref={nameRef}
            placeholder="Nombres"
            className=""
          />
        </div>

        <div>
          <label htmlFor="lastNames">Apellidos</label>
          <input
            type="text"
            id="names"
            ref={lastNameRef}
            placeholder="Apellidos"
            className=""
          />
        </div>
        <div>
          <label htmlFor="dni">DNI</label>
          <input
            type="text"
            id="dni"
            ref={dniRef}
            placeholder="DNI"
            className=""
          />
        </div>
        <div>
          <label htmlFor="xxxx">XXXX</label>
          <input
            type="text"
            id="xxxx"
            ref={xxxxRef}
            placeholder="XXXX"
            className=""
          />
        </div>
        <div>
          <label htmlFor="yyyy">YYYY</label>
          <input
            type="text"
            id="yyyy"
            ref={yyyyRef}
            placeholder="YYYY"
            className=""
          />
        </div>

        <div className="">

          <button
            onClick={handleConfirm}
            className=""
          >
            Confirmar
          </button>
          <button
            onClick={handleCancel}
            className="e"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonalData