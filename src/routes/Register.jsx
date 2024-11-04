import { useContext } from "react";
import { UserContexts } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";
import { FormError } from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import { FormInput } from "../components/FormInput";
import { Title } from "../components/Title";
import { FormButton } from "../components/FormButton";

export const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContexts);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

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
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    }

    console.log(email, pass);
  };

  return (
    <>
      <Title title="Registro" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Email:"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>
        <FormInput
          type="password"
          placeholder="ingrese contraseña"
          {...register("pass", {
            minLength,
            validate: validateTrim,
          })}
          label="Contraseña:"
          error={errors.pass}
        >
          <FormError error={errors.pass} />
        </FormInput>
        <FormInput
          type="password"
          placeholder="confirme contraseña"
          {...register("confirmPass", {
            validate: validateEquals(getValues),
          })}
          label="Confirmar Contraseña:"
          error={errors.confirmPass}
        >
          <FormError error={errors.confirmPass} />
        </FormInput>
        <FormButton type="submit" text="Registrar" />
      </form>
    </>
  );
};
