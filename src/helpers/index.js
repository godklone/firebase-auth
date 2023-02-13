const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

export {
  validEmail,
  validPassword
}