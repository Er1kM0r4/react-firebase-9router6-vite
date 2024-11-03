import { useContext, useState } from "react";
import { UserContexts } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContexts);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(email, pass);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      //   setEmail("");
      //   setPass("");
    }

    console.log(email, pass);
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="ingrese contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};
