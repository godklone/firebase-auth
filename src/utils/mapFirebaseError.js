const getFirebaseAuthError = (errorCode) => {
  const errorMap = {
    "auth/email-already-in-use": "El correo ya está en uso.",
    "auth/invalid-email": "El correo no es válido.",
    "auth/weak-password": "La contraseña es muy débil.",
    "auth/user-disabled": "El usuario se encuentra deshabilitado.",
    "auth/user-not-found": "El usuario no existe.",
    "auth/wrong-password": "Contraseña incorrecta.",
    default: "Ocurrió un error al procesar la solicitud.",
  };
  return errorMap[errorCode] || errorMap.default;
};

export {
  getFirebaseAuthError
} 