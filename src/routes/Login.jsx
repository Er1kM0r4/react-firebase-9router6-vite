import { useContext } from "react";
import { UserContexts } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";
import { FormError } from "../components/FormError";
import { FormInput } from "../components/FormInput";
import { formValidate } from "../utils/formValidate";
import { Title } from "../components/Title";
import { FormButton } from "../components/FormButton";

export const Login = () => {
  const { loginUser } = useContext(UserContexts);
  const { required, patternEmail, minLength, validateTrim } = formValidate();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, pass }) => {
    try {
      await loginUser(email, pass);
      navigate("/");
    } catch (error) {
      console.log(error);
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <Title title="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Email:"
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
        >
          <FormError error={errors.pass} />
        </FormInput>
        <FormButton type="submit" text="login" />
      </form>
    </>
  );
};
