import { useContext } from "react";
import { UserContexts } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContexts);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, pass }) => {
    try {
      await registerUser(email, pass);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", { message: "Email ya registrado" });
          break;
        case "auth/weak-password":
          alert("La contraseña es muy sencilla");
          break;
        default:
          alert("Error al registrar");
          break;
      }
    }

    console.log(email, pass);
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="ingrese email"
          {...register("email", {
            required: { value: true, message: "campo obligatorio" },
            pattern: {
              value:
                /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,15}/,
              message: "email no valido",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="ingrese contraseña"
          {...register("pass", {
            setValueAs: (v) => v.trim(),
            minLength: {
              value: 6,
              message: "mínimo 6 caracteres",
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) return "no seas huevon y pon una contraseña";
                true;
              },
            },
          })}
        />
        {errors.pass && errors.pass.message}
        <input
          type="password"
          placeholder="confirme contraseña"
          {...register("confirmPass", {
            setValueAs: (v) => v.trim(),
            validate: {
              equals: (v) =>
                v === getValues("pass") || "Las contraseñas no coinciden",
            },
          })}
        />
        {errors.confirmPass && errors.confirmPass.message}
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};
