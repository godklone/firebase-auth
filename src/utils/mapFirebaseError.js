const firebaseErrorsMap = {
  "auth/email-already-in-use": "El correo ya se encuentra en uso",
  "auth/invalid-email": "El correo no es válido",
  "auth/weak-password": "La contraseña es débil",
  "auth/user-not-found": "El usuario no existe",
  "auth/wrong-password": "La contraseña es incorrecta"
};

const getFirebaseErrorMessage = (errorCode) => {
  return firebaseErrorsMap[errorCode] || "Ocurrió un error al procesar la solicitud";
};
export {
  getFirebaseErrorMessage
} 