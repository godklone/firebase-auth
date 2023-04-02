function removeEmptyValues(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
}

const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

const validWord = (value, ref) => {
  const formattedValue = value
    .replace(/[^a-zA-Z ]/g, "") // Eliminar caracteres que no sean letras o espacios en blanco
    .replace(/\s{2,}/g, " ") // Eliminar dos o más espacios en blanco consecutivos y dejar solo un espacio
  ref.current.value = formattedValue;

}

const validDniNumber = (value, ref) => {
  const formattedValueWithDots = onlyNumber(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  ref.current.value = formattedValueWithDots;
  return formattedValueWithDots
}

const replaceDots = (value, byChr = "") => value.replace(/\./g, byChr);

const debounce = (func, time)=>{
  let timeOutId;
  return function(){
      if(timeOutId){
          clearTimeout(timeOutId);
      }
      const context = this;
      const args = arguments;
      timeOutId =setTimeout(()=>{
          func.apply(context, args)
      },time)
  }
}

const formatDni = (value) => {
  // Eliminamos los puntos que haya en el valor actual
  const rawValue = value.replace(/\./g, '');
  if(!value) return '';
  // Insertamos puntos para separar miles
  return new Intl.NumberFormat().format(rawValue);
};

const formatCredential = (value) => {
  const unmaskedValue = value.replace(/ /g, '');
  const regex = /(\d{1,4})/g;
  const maskedValue = unmaskedValue.match(regex)?.join(' ');
  return maskedValue || '';
};

const validNumber = (event, setFieldValue) => {
  const { name, value } = event.target;
  if ( /^[0-9\b]+$/.test(value) || value === '' ) {
    setFieldValue(name, value);
  }
}

const onlyNumber = (value) => value.replace(/\D/g, "");

const validNumberInputChange = (event, setFieldValue) => {
  const { name, value } = event.target;
  const rawValue = value.replace(/\./g, '');
  if (/^[0-9\b]+$/.test(rawValue) || rawValue === '') {
    setFieldValue(name, formatDni(rawValue));
  }
};

const validNumberCredentialInputChange = (event, setFieldValue) => {
  const { name, value } = event.target;
  const rawValue = value.replace(/ /g, '');
  if (/^[0-9\b]+$/.test(rawValue) || rawValue === '') {
    setFieldValue(name, formatCredential(rawValue));
  }
};

export {
  validEmail,
  validPassword,
  validWord,
  validNumber,
  validDniNumber,
  replaceDots,
  debounce,
  removeEmptyValues,
  validNumberInputChange,
  validNumberCredentialInputChange,
  onlyNumber

}