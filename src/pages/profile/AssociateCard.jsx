import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AssociateCard = () => {
  const navigate = useNavigate();
  const dniRef = useRef();
  const credentialRef = useRef();
  const codeRef = useRef();

  const handleConfirm = (e) => {
    e.preventDefault();
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1)
  }
  return (
    <div className=''>
      <h2 className='text-2xl font-bold mb-6'>Datos Personales</h2>
      <form className=''>
        {alert.message && (
          <Alert typeAlert={alert.typeAlert} message={alert.message} />
        )}
        <div>
          <label htmlFor='credential'>Nro Credencial</label>
          <input
            type='text'
            id='credential'
            ref={credentialRef}
            placeholder='Nro Credencial'
            className='rounded-md border mt-2 p-2 w-full placeholder-gray-400'
          />
        </div>

        <div>
          <label htmlFor='code'>Cod Seg</label>
          <input
            type='text'
            id='code'
            ref={codeRef}
            placeholder='Cod Seg'
            className=''
          />
        </div>
        <div>
          <label htmlFor='dni'>DNI</label>
          <input
            type='text'
            id='dni'
            ref={dniRef}
            placeholder='DNI'
            className=''
          />
        </div>

        <div className=''>
          <button onClick={handleConfirm} className='btn__primary'>
            Confirmar
          </button>
          <button onClick={handleCancel} className='btn__warning'>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssociateCard;
