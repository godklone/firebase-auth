
const swalDefaultConfig = {
  title: 'Are you sure?',
  text: "",
  icon: 'warning',
  showCloseButton: true,
  showDenyButton: false,
  showCancelButton: false,
  showConfirmButton: false,
  denyButtonText: `Don't save`,
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  },
  timer: 2200
}


const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;



export {
  validEmail,
  validPassword,

  swalDefaultConfig
}