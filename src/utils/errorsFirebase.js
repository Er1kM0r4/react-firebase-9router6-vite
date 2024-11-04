export const errorsFirebase = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return { code: "email", message: "Email ya registrado" };
    case "auth/weak-password":
      return { code: "pass", message: "La contraseña es muy sencilla" };
    case "auth/invalid-credential":
      return { code: "email", message: "Email o contraseña incorrectos" };
    default:
      return { code: "email", message: "Error en el servidor" };
  }
};
