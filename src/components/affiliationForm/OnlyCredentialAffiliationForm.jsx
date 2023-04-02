import { validNumberCredentialInputChange } from "../../helpers";

const OnlyCredentialAffiliationForm = ({ formik }) => {
  return (
    <div className="content_field">
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
        <label htmlFor="credentialNumber">Número de credencial:</label>
      </div>
      {formik.touched.credentialNumber && formik.errors.credentialNumber ? (
        <div className="alert__error">{formik.errors.credentialNumber}</div>
      ) : null}
    </div>
  );
};

export default OnlyCredentialAffiliationForm;
