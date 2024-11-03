import { useContext } from "react";
import { UserContexts } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { user, setUser } = useContext(UserContexts);
  const navegate = useNavigate();
  const handleClickLogin = () => {
    setUser(true);
    navegate("/");
  };
  return (
    <>
      <h1>Login</h1>
      <h2>{user ? "Bienvenido" : "Inicia sesión"}</h2>
      <button onClick={handleClickLogin}>Acceder</button>
    </>
  );
};
