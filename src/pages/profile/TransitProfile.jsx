import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import css from '../../assets/styles/pages/profile.module.scss';
import Alert from "../../components/Alert";
import { useAuth } from "../../context/AuthContext";
import { debounce, replaceDots, validDniNumber, validWord } from "../../helpers";

const TransitProfile = (props) => {
  const navigate = useNavigate();
  const { profileDataCreate, profileAssignment , transitProfile} = useAuth();
  const dniRef = useRef();
  const nameRef = useRef();
  const lastNameRef = useRef();
  const [errors, setErrors] = useState({});
  const minDniLen = import.meta.env.VITE_MIN_DNI_LEN || 7;
  const maxDniLen = import.meta.env.VITE_MIN_DNI_LEN || 8;

  const handleConfirm = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const [dni, name, lastName] = [
      dniRef.current.value.trim(),
      nameRef.current.value.trim(),
      lastNameRef.current.value.trim()
    ];

    if ([dni, name, lastName].includes("")) {
      newErrors.renderError = true;
      setErrors(newErrors);
      return;
    }

    if (dni.length >= minDniLen && dni.length <= maxDniLen) {
      newErrors.dni = 'El Valor para el numero del DNI no es valido.';
    }
    if (!name) {
      newErrors.name = 'El nombre no debe estar vacio';
    }
    if (!lastName) {
      newErrors.lastName = 'El Apellido no debe estar vacio';
    }

    if (Object.keys(newErrors).length > 0 && (transitProfile===null || transitProfile?.newClient)) {
      newErrors.renderError = true;
      setErrors(newErrors);
      return;
    }

    try {
      const profile = {
        transit: false,
        identification: replaceDots(dniRef.current.value),
        name: nameRef.current.value,
        surename: lastNameRef.current.value
      };

      // const resp = debounce(await profileDataCreate(profile), 150)
      const resp = await profileDataCreate(profile);

      await Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/home');
    } catch (error) {
      await Swal.fire({
        title: 'Ha ocurrido un error.',
        text: 'Body del mensaje emergente',
        icon: 'danger',
        showConfirmButton: false,
        timer: 2000,
      });

      console.log(error)
    }
  }

  const validate = {
    dni: (value) => validDniNumber(value, dniRef),
    name: (value) => validWord(value, nameRef),
    lastName: (value) => validWord(value, lastNameRef),
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const { [id]: removedId, ...newErrors } = errors;
    const valid = validate[id](value)

    if (!valid) {
      newErrors[id] = "error"
      console.log(newErrors)
    } else {

    }
    setErrors(newErrors)
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1)
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setErrors({})
    }, 3000)
    return () => clearTimeout(timeOutId)
  }, [errors])


  return (

    <div className={css.content__profile}>
      <h4 className='heading'>Perfil de la cuenta.</h4>
      { transitProfile?.newClient &&
        <p className='paragraph'>
          Vamos a crear un nuevo perfil en fidelización y quedara asociado con tu email.
        </p>
      }

      <form autoComplete='off'>
        <div className='textfield'>
          <input
            type="text"
            id="name"
            ref={nameRef}
            placeholder="Nombres"
            className={errors.name ? css.errorField : ""}
            onChange={handleInputChange}
          />
          <label htmlFor="name">Nombres</label>
        </div>

        <div className='textfield'>
          <input
            type="text"
            id="lastName"
            ref={lastNameRef}
            placeholder="Apellidos"
            onChange={handleInputChange}
            className={errors.lastName ? css.errorField : ""}
          />
          <label htmlFor="lastName">Apellidos</label>
        </div>
        <div className='textfield'>
          <input
            type="text"
            id="dni"
            ref={dniRef}
            placeholder="DNI"
            onChange={handleInputChange}
            className={errors.dni ? css.errorField : ""}
          />
          <label htmlFor="dni">DNI</label>
        </div>

        {errors?.renderError &&
          <Alert
            typeAlert="danger"
            message="Todos los campos son obligatorios"
          />
        }

        <div className={css.contentBtn}>
          <button onClick={handleConfirm} className='btn__primary'>
            Continuar
          </button>
          <button onClick={handleCancel} className='btn__secondary'>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default TransitProfile