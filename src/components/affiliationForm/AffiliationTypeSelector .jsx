export const AffiliationTypeSelector = (props) => {
  const { formik } = props;
  const handleSelectChange = (e) => {
    formik.resetForm();
    formik.setFieldValue('affiliationType', e.target.value);
  };

  return (
    <>
      <div className='textfield arrow_down options'>
        <select
          name='affiliationType'
          value={formik.values.affiliationType}
          onChange={handleSelectChange}
          onBlur={formik.handleBlur}
        >
          <option value='dni'>Con mi Nº de DNI</option>
          <option value='credentialAndCode'>
            N° Credencial y cod. de seguridad
          </option>
          <option value='credentialNumber'>Solo N° Credencial</option>
        </select>
      </div>
    </>
  );
};
