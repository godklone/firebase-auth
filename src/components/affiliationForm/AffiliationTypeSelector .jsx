export const AffiliationTypeSelector = (props) => {
  const { formik } = props;
  const handleSelectChange = (e) => {
    formik.resetForm();
    formik.setFieldValue('affiliationType', e.target.value);
  };

  return (
    <>
      <h5 className='mt__1 mb__1'>Elige tu forma de vincular:</h5>
      <div className='textfield mb__1'>
        <select
          name="affiliationType"
          value={formik.values.affiliationType}
          onChange={handleSelectChange}
          onBlur={formik.handleBlur}
        >
          <option value="dni">DNI</option>
          <option value="credentialNumber">Credencial</option>
          <option value="credentialAndCode">
            Credential y Codigo de Securidad
          </option>
        </select>
      </div>
    </>
  );
};