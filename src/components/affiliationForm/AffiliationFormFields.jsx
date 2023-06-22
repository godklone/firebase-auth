import DniAffiliationForm from './DniAffiliationForm';
import CredentialCodeAffiliationForm from './CredentialCodeAffiliationForm';
import OnlyCredentialAffiliationForm from './OnlyCredentialAffiliationForm';
import React from 'react';

const AFFILIATION_FIELDS = {
  dni: <DniAffiliationForm />,
  credentialNumber: <OnlyCredentialAffiliationForm />,
  credentialAndCode: <CredentialCodeAffiliationForm />,
};

export const AffiliationFormFields = ({ formik }) => {

  const AffiliationForm = AFFILIATION_FIELDS[formik.values.affiliationType || "dni"];
  const formWithFormik = React.cloneElement(AffiliationForm, { formik });
  return (
    <>
      {formWithFormik}
    </>
  );
};