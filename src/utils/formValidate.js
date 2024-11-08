export const formValidate = () => {
  return {
    required: {
      value: true,
      message: "campo obligatorio",
    },
    patternEmail: {
      value:
        /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,15}/,
      message: "email no valido",
    },
    patternUrl: {
      value:
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
      message: "URL no valida",
    },
    minLength: {
      value: 6,
      message: "mínimo 6 caracteres",
    },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) return "debe agregar una contraseña";
        true;
      },
    },
    validateEquals(getValues) {
      return {
        equals: (v) =>
          v === getValues("pass") || "Las contraseñas no coinciden",
      };
    },
  };
};
