import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../../context/AuthContext";
import { validNumber, validDniNumber, replaceDots, removeEmptyValues } from "../../helpers";
import css from '../../assets/styles/pages/profile.module.scss'
import Alert from "../../components/Alert";
import Swal from "sweetalert2";
import { useLoyalty } from "../../context/LoyaltyContext";

const AssociateCardData = () => {
  const navigate = useNavigate();
  const { profileDataUpdate, setTransitProfile,loadingSpinner } = useLoyalty();
  const dniRef = useRef();
  const credentialRef = useRef();
  const codeRef = useRef();
  const [errors, setErrors] = useState({});

  const minDniLen = import.meta.env.VITE_MIN_DNI_LEN || 7;
  const maxDniLen = import.meta.env.VITE_MAX_DNI_LEN || 8;

  const profileObj = () => ({
    dni: replaceDots(dniRef.current.value.trim()),
    credential: credentialRef.current.value.trim(),
    code: codeRef.current.value.trim(),
  });

  const dataIsValid = () => {
    const newErrors = {};
    const currentProfile = profileObj();
    if (Object.values(currentProfile).every((el) => el === '')) {
      newErrors.renderError = true;
      setErrors(newErrors);
      return;
    }

    const validAttribToBind = removeEmptyValues(currentProfile);

    if (Object.keys(validAttribToBind).length === 1 && 'code' in validAttribToBind) {
      newErrors.code = 'Para realizar la asociacion debe estar presente el numero de credencial';
      return false;
    }

    if (currentProfile?.dni && (currentProfile.dni.length < minDniLen || currentProfile.dni.length > maxDniLen)) {
      newErrors.dni = 'El Valor para el numero del DNI no es valido.';
      return false;
    }

    if (currentProfile?.credential && currentProfile.credential.length < 5) {
      newErrors.names = 'El Numero de credential no es valido';
      return false;
    }

    // if (currentProfile?.code ) {
    //   newErrors.lastName = 'El codigo de segurida debe ser de 3 digitos';
    //   return false;
    // }
    return true;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (loadingSpinner) {
      return;
    }

    if (!dataIsValid()) {
      return;
    }

    try {
      const bindProfile = {
        identification: replaceDots(dniRef.current.value),
        number: credentialRef.current.value,
        code: codeRef.current.value,
      };

      await profileDataUpdate(bindProfile);
      await Swal.fire({
        icon: 'success',
        title: 'Actualizacion exitosa.',
        showConfirmButton: true,
        confirmButtonText: 'Continuar...',
      });

      navigate('associate-data/update-profile');
    } catch (error) {
      await Swal.fire({
        title: 'Ha ocurrido un error.',
        text: error?.error,
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'Continuar...',
      });
    }
  };

  const validateNumber = {
    dni: (value) => validDniNumber(value, dniRef),
    credential: (value) => validNumber(value, credentialRef),
    code: (value) => validNumber(value, codeRef),
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const { [id]: removedId, ...newErrors } = errors;
    const valid = validateNumber[id](value);

    if (!valid) {
      newErrors[id] = 'error';
    }
    setErrors(newErrors);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleTransitProfile = (e) => {
    e.preventDefault();
    if (loadingSpinner) {
      return;
    }
    const transitProfile = {
      transit: true,
      dni: replaceDots(dniRef.current.value),
      credential: credentialRef.current.value,
      code: codeRef.current.value,
    };

    setTransitProfile(transitProfile);
    navigate('associate-transit-data');
  };

  return (
    <div className='content__general'>
      <h4 className='heading'>Vincular Perfil de la cuenta</h4>
      <p className='paragraph_sm'>
        Debes completar los datos de tu tarjeta Siempre Beneficios, con el
        número de credencial y código de seguridad. También puedes usar tu DNI.
        En caso que seas un actual afiliado al plan de Beneficios Siempre, y no
        cuentas con tu credencial o tu DNI no corresponde a un perfil activo,
        puedes crear una perfil temporal, y luego presentandote en una sucursal
        puedes unificar los dos perfiles para recuperar todos los puntos.
      </p>

      <form autoComplete='off'>
        <div className=''>
          <div className='textfield'>
            <input
              type='text'
              id='credential'
              ref={credentialRef}
              placeholder='Nro Credencial'
              onChange={handleInputChange}
              className=''
              maxLength='20'
            />
            <label htmlFor='credential'>Nro Credencial</label>
          </div>

          <div className='textfield'>
            <input
              type='text'
              id='code'
              ref={codeRef}
              placeholder='Cod Seg'
              onChange={handleInputChange}
              className=''
              maxLength='3'
            />
            <label htmlFor='code'>Cod Seg</label>
          </div>
          <div className='textfield'>
            <input
              type='text'
              id='dni'
              ref={dniRef}
              placeholder='DNI'
              onChange={handleInputChange}
              className=''
              maxLength='11'
            />
            <label htmlFor='dni'>DNI</label>
          </div>
        </div>
        {errors?.renderError && (
          <Alert
            typeAlert='danger'
            message='Puedes afiliar con tu numero de Credencial o tu DNI.'
          />
        )}

        <div className={css.contentBtn}>
          <button onClick={handleConfirm} className='btn__primary'>
            Continuar
          </button>
          <button onClick={handleTransitProfile} className='btn__secondary'>
            Crear un perfil en transito
          </button>
          <button onClick={handleCancel} className='btn__warning'>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssociateCardData;
