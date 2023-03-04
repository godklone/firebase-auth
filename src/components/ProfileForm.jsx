import { useRef } from "react";


const ProfileForm = ({ title, disabledField, handleConfirmApi, valueFields, transitFlag }) => {

  const dniRef = useRef();
  const namesRef = useRef();
  const lastNameRef = useRef();


  return (

    <form autoComplete='off'>
      <div className="">
        <div className="textfield">
          <input
            type="text"
            id="name"
            ref={nameRef}
            placeholder="Nro Credencial"
            className=""
            disabled={disabledField}
          />
          <label htmlFor="name">Nombre</label>
        </div>

        <div className="textfield">
          <input
            type="text"
            id="lastname"
            ref={lastNameRef}
            placeholder="Cod Seg"
            className=""
            disabled={disabledField}
          />
          <label htmlFor="lastname">Apellido</label>
        </div>
      </div>
      <div className="textfield">
        <input
          type="text"
          id="dni"
          ref={dniRef}
          placeholder="DNI"
          className=""
          disabled={disabledField}
        />
        <label htmlFor="dni">DNI</label>
      </div>

      <div className="css.contentBtn">
        <button
          onClick={handleConfirm}
          className="btn__primary"
        >
          Continuar
        </button>
      </div>
    </form>

  )
}

export default ProfileForm