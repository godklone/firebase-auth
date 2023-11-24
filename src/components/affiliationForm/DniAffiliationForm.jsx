import { validNumberInputChange } from "../../helpers";

const DniAffiliationForm = ({ formik }) => {
  return (
    <div className="content_field options">
      <div className="textfield">
        <input
          type="text"
          name="dni"
          placeholder="Ingresa N° DNI"
          minLength="6"
          maxLength="8"
          value={formik.values.dni}
          onChange={(e) => validNumberInputChange(e, formik.setFieldValue)}
          onBlur={formik.handleBlur}
        />
        {/* <label htmlFor='dni'>Número de DNI:</label> */}
      </div>
      <div className="alert__error">
        {formik.touched.dni && formik.errors.dni ? formik.errors.dni : null}
      </div>
    </div>
  );
};

export default DniAffiliationForm;
