import { validNumberInputChange } from "../../helpers";

const DniAffiliationForm = ({ formik }) => {

  return (
    <div className="content_field">
      <div className='textfield'>
        <input
          type="text"
          name="dni"
          placeholder="Ingrese su DNI"
          maxLength="11"
          value={formik.values.dni}
          onChange={(e) => validNumberInputChange(e, formik.setFieldValue)}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="dni">Número de DNI:</label>
      </div>
      {formik.touched.dni && formik.errors.dni ? (
        <div className="alert__error">{formik.errors.dni}</div>
      ) : null}
    </div>
  );
};

export default DniAffiliationForm;

