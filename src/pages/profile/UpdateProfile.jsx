import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLoyalty } from "../../context/LoyaltyContext";

const UpdateProfile = ({disabledField}) => {
  const navigate = useNavigate();
  const dniRef = useRef();
  const nameRef = useRef();
  const lastNameRef = useRef();
  const { fidelizationData } = useLoyalty();

  useEffect(() => {
    if (!fidelizationData?.identification) {
      return;
    }
    try {
      const { name, surename, identification, } = fidelizationData;
      dniRef.current.value = identification
      nameRef.current.value = name
      lastNameRef.current.value = surename
    } catch (error) {
    }
  }, [fidelizationData])

  const handleConfirm = (e) => {
    e.preventDefault();
    navigate("/home");
  }


  return (

    <div className="content__general">
      <h4 className="heading">Perfil de la cuenta</h4>
      <p className="paragraph">
        Datos en el perfil de Siempre Beneficios.
        Si estos son tus datos correctos puedes continuar para finalizar el registro.       </p>

      <form autoComplete='off'>
        <div className="">
          <div className="textfield">
            <input
              type="text"
              id="name"
              ref={nameRef}
              placeholder="Nro Credencial"
              className=""
              disabled = {disabledField}
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
              disabled = {disabledField}
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
            disabled = {disabledField}
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
    </div>
  )
}

export default UpdateProfile