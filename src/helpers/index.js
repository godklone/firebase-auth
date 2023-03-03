

const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

const validWord = (value, ref) => {
  const formattedValue = value
    .replace(/[^a-zA-Z ]/g, "") // Eliminar caracteres que no sean letras o espacios en blanco
    .replace(/\s{2,}/g, " ") // Eliminar dos o más espacios en blanco consecutivos y dejar solo un espacio
  ref.current.value = formattedValue;

}

const onlyNumber = (value) => value.replace(/\D/g, "");

const validNumber = (value, ref) => {
  ref.current.value =onlyNumber(value);
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

export {
  validEmail,
  validPassword,
  validWord,
  validNumber,
  validDniNumber,
  replaceDots,
  debounce

}