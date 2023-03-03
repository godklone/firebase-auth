import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validNumber, validDniNumber } from "../helpers";
import css from '../assets/styles/pages/profile.module.scss'
import Alert from "../components/Alert";

const AssociateCardData = () => {
  const navigate = useNavigate();
  const { profileDataUpdate } = useAuth();
  const dniRef = useRef();
  const credentialRef = useRef();
  const codeRef = useRef();
  const [errors, setErrors] = useState({});

  const minDniLen = import.meta.env.VITE_MIN_DNI_LEN || 7;
  const maxDniLen = import.meta.env.VITE_MIN_DNI_LEN || 8;


  const validate = {
    dni: () => { },
    code: () => { },
    credential: () => { },
  }
  
  const handleConfirm = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const [dni, credential, code] = [
      dniRef.current.value.trim(),
      credentialRef.current.value.trim(),
      codeRef.current.value.trim()
    ]

    if ([dni, credential, code].every(el => el === "")) {
      newErrors.renderError = true;
      setErrors(newErrors);
      return;
    }

    const toValidate = { ...[dni, credential, code] }
    console.log(toValidate)

    if (dni.length <= minDniLen && dni.length >= maxDniLen) {
      newErrors.dni = 'El Valor para el numero del DNI no es valido.';
    }

    if ([dniRef.current.value, credentialRef, codeRef].every(el => el === "")) {
      newErrors.renderError = true;
      return;
    }

    if (!dniRef.current.value.length >= minDniLen || dniRef.current.value <= maxDniLen) {
      newErrors.dni = 'El Valor para el numero del dni no es valido.';
    }
    if (!credentialRef.current.value.length >= 5) {
      newErrors.names = 'El Numero de credential no es valido';
    }
    if (!codeRef.current.value.length !== 3) {
      newErrors.lastName = 'El codigo de segurida debe ser de 3 digitos';
    }



    // try {
    //   const profile = {
    //     transit: false,
    //     dni: replaceDots(dniRef.current.value),
    //     credential: credentialRef.current.value,
    //     code: codeRef.current.value
    //   };

    //   const resp = await profileDataUpdate(profile)
    //   console.log(resp)
    // } catch (error) {
    //   console.log(error)
    // }

    // navigate("update-profile");
  }

  const validateNumber = {
    dni: (value) => validDniNumber(value, dniRef),
    credential: (value) => validNumber(value, credentialRef),
    code: (value) => validNumber(value, codeRef),
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const { [id]: removedId, ...newErrors } = errors;
    const valid = validateNumber[id](value)
    console.log(id, value)
    if (!valid) {
      newErrors[id] = "error"
      console.log(newErrors)
    } else {

    }
    setErrors(newErrors)
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
    console.log("Cancelar accion")
  }

  const handleTransitProfile = (e) => {
    e.preventDefault();
    //cambiar el state de un perdil de cuenta en transito para diferenciar 
    //de nuevo usuario y existente
    // setAffiliate(true);
    navigate("associate-transit-data");
  }
  return (
    <div className='content__general'>
      <h4 className='heading'>Vincular Perfil de la cuenta</h4>
      <p className="paragraph">
        Debes completar los datos de tu tarjeta Siempre Beneficios, con el número de credencial y código de seguridad.
        También puedes usar tu DNI.
        En caso que seas un actual afiliado al plan de Beneficios Siempre, y no cuentas con tu credencial o tu DNI no corresponde a un perfil activo,
        puedes crear una perfil temporal, y luego presentandote en una sucursal puedes unificar los dos perfiles para recuperar todos los puntos.
      </p>

      <form
        className=""
      >

        <div className="">
          <div className='textfield'>
            <input
              type="text"
              id="credential"
              ref={credentialRef}
              placeholder="Nro Credencial"
              onChange={handleInputChange}
              className=""
              maxlength="20" 
            />
            <label htmlFor="credential">Nro Credencial</label>
          </div>

          <div className='textfield'>
            <input
              type="text"
              id="code"
              ref={codeRef}
              placeholder="Cod Seg"
              onChange={handleInputChange}
              className=""
              maxlength="3" 
            />
            <label htmlFor="code">Cod Seg</label>
          </div>
          <div className='textfield'>
            <input
              type="text"
              id="dni"
              ref={dniRef}
              placeholder="DNI"
              onChange={handleInputChange}
              className=""
              maxlength="11" 
            />
            <label htmlFor="dni">DNI</label>
          </div>
        </div>
        {errors?.renderError &&
          <Alert
            typeAlert="danger"
            message="Puedes afiliar con tu numero de Credencial o tu DNI."
          />
        }

        <div className={css.contentBtn}>
          <button
            onClick={handleConfirm}
            className="btn__primary"
          >
            Continuar
          </button>
          <button
            onClick={handleTransitProfile}
            className="btn__primary"
          >
            Crear un perfil en transito
          </button>
          <button
            onClick={handleCancel}
            className="btn__primary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AssociateCardData