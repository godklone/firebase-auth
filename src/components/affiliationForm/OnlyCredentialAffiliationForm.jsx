import { validNumberCredentialInputChange } from '../../helpers';

const OnlyCredentialAffiliationForm = ({ formik }) => {
  return (
    <div className='content_field options'>
      <div className='textfield'>
        <input
          type='text'
          name='credentialNumber'
          placeholder='Ingresa N° de Credencial (por ej 45555432)'
          maxLength='24'
          value={formik.values.credentialNumber}
          onChange={(e) =>
            validNumberCredentialInputChange(e, formik.setFieldValue)
          }
          onBlur={formik.handleBlur}
        />
        {/* <label htmlFor='credentialNumber'>Número de credencial:</label> */}
      </div>
      <div className='alert__error'>
        {formik.touched.credentialNumber && formik.errors.credentialNumber
          ? formik.errors.credentialNumber
          : null}
      </div>
    </div>
  );
};

export default OnlyCredentialAffiliationForm;
