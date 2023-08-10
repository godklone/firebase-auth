import { validNumberCredentialInputChange, validNumber } from '../../helpers';

const CredentialCodeAffiliationForm = ({ formik }) => {
  return (
    <div className='content_field options'>
      <>
        <div className='textfield'>
          <input
            type='text'
            name='credentialNumber'
            placeholder='Ingresa N° de Credencial'
            maxLength='24'
            value={formik.values.credentialNumber}
            onChange={(e) =>
              validNumberCredentialInputChange(e, formik.setFieldValue)
            }
            onBlur={formik.handleBlur}
          />
          {/* <label htmlFor='credentialNumber'>Numero de credencial:</label> */}
        </div>
        <div className='alert__error'>
          {formik.touched.credentialNumber && formik.errors.credentialNumber
            ? formik.errors.credentialNumber
            : null}
        </div>
      </>
      <>
        <div className='textfield'>
          <input
            type='text'
            name='securityCode'
            placeholder='Ingresa el cód. de seg. (Los 3 dígitos)'
            maxLength={3}
            value={formik.values.securityCode}
            onChange={(e) => validNumber(e, formik.setFieldValue)}
            onBlur={formik.handleBlur}
          />
          {/* <label htmlFor='securityCode'>Código de seguridad:</label> */}
        </div>
        <div className='alert__error'>
          {formik.touched.securityCode && formik.errors.securityCode
            ? formik.errors.securityCode
            : null}
        </div>
      </>
    </div>
  );
};

export default CredentialCodeAffiliationForm;
