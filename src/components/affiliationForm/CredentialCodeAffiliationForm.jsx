import { validNumberCredentialInputChange, validNumber } from "../../helpers";

const CredentialCodeAffiliationForm = ({ formik }) => {
  return (
    <div className="content_field">
      <>
        <div className='textfield'>
          <input
            type="text"
            name="credentialNumber"
            placeholder="Número de credencial"
            maxLength="24"
            value={formik.values.credentialNumber}
            onChange={(e) => validNumberCredentialInputChange(e, formik.setFieldValue)}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="credentialNumber">Numero de credencial:</label>
        </div>
        {formik.touched.credentialNumber && formik.errors.credentialNumber ? (
          <div className="alert__error">{formik.errors.credentialNumber}</div>
        ) : null}
      </>
      <>
        <div className='textfield'>
          <input
            type="text"
            name="securityCode"
            placeholder="Código de seguridad"
            maxLength={3}
            value={formik.values.securityCode}
            onChange={(e)=>validNumber(e, formik.setFieldValue)}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="securityCode">Código de seguridad:</label>
        </div>
        {formik.touched.securityCode && formik.errors.securityCode ? (
          <div className="alert__error">{formik.errors.securityCode}</div>
        ) : null}
      </>
    </div>
  );
};

export default CredentialCodeAffiliationForm;
