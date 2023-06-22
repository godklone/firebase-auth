import * as Yup from 'yup'

const isCredentialNumberRequired = (affiliationType) => {
  return affiliationType === "credentialNumber" || affiliationType === "credentialAndCode";
};

const validDni = Yup.string()
  .test("isNumber", "El campo debe ser un número válido",
    (val) => {
      const validate = val.replace(/[\.,]/g, '')
      return !(validate && isNaN(Number(validate)))
    })
  .test(
    "len", "El DNI debe tener entre 6 y 8 dígitos",
    (val) => {
      if (!val) return;
      const validate = val.replace(/[\.,]/g, '')
      return validate.length >= 6 && validate.length <= 8
    })
  .required('El DNI es obligatorio');

const validEmail = Yup.string()
  .email("Correo electrónico no válido")
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Formato de correo electrónico no válido")
  .required("Correo electrónico es un campo requerido");

const validName = Yup.string()
  .min(3, "El campo de Nombres debe contener al menos 3 caracteres")
  .required("Nommbres es un campo requerido");

const validSureName = Yup.string()
  .min(3, "El campo de Apellidos debe contener al menos 3 caracteres")
  .required("Apellidos es un campo requerido");

const validationEmailSchema = Yup.object().shape({
  email: validEmail,
});

const validationAffiliationSchema = Yup.object().shape({
  affiliationType: Yup.string().required('Campo requerido'),
  dni: Yup.string().when('affiliationType', {
    is: 'dni',
    then: (currentValue) =>
      (currentValue) ?
        validDni
        : Yup.string(),
  }),
  credentialNumber: Yup.string().when('affiliationType', {
    is: isCredentialNumberRequired,
    then: (currentValue) =>
      (currentValue) ?
        Yup.string()
          .test("isNumber", "La credencial debe ser un número válido",
            (val) => {
              if (!val) return;
              const validate = val.replace(/ /g, '');
              return !(validate && isNaN(Number(validate)))
            })
        : Yup.string()
  }),
  securityCode: Yup.string().when("affiliationType", {
    is: "credentialAndCode",
    then: (currentValue) =>
      (currentValue) ?
        Yup.string().required("Este campo es requerido")
          .matches(/^[0-9]{1,3}$/, "El campo debe contener un máximo de 3 dígitos")
        : Yup.string(),
  }),
});

const validationRegisterSchema = Yup.object().shape({
  email: validEmail,
  password: Yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es un campo requerido"),
  repeatPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('La confirmación de la contraseña es un campo requerido')
});

const validationSignupSchema = Yup.object().shape({
  email: validEmail,
  password: Yup
    .string()
    .required("Contraseña es un campo requerido"),
});

const validationProfileSchema  = Yup.object().shape({
  name: validName,
  surename: validSureName,
  identification: validDni
});

const validationPersonalDataSchema = Yup.object({
  surename:validSureName,
  name: validName,
  birthday: Yup.string().required('Debe ingresar su fecha de nacimiento'),
  identification: validDni,
  gender: Yup.string().required('Debe seleccionar su género'),
});

const affiliationInitialValues = {
  affiliationType: '',
  dni: '',
  credentialNumber: '',
  securityCode: '',
};

const profileInitialValues = {
  surename: '',
  name: '',
  birthday: '',
  identification: '',
  gender: '',
};

const genders = [
  { id: 1, description: 'Femenino' },
  { id: 2, description: 'Masculino' },
  { id: 3, description: 'Otro' },
];

export {
  affiliationInitialValues,
  profileInitialValues,
  validationAffiliationSchema,
  validationRegisterSchema,
  validationEmailSchema,
  validationSignupSchema,
  validationPersonalDataSchema,
  validationProfileSchema,
  genders
}