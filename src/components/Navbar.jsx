import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContexts } from "../context/UserProvider";

export const Navbar = () => {
  const { user, setUser, sigOutUser } = useContext(UserContexts);
  const handleLogOut = async () => {
    try {
      await sigOutUser();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Sesión cerrada");
    }
  };

  return (
    <div>
      {user ? (
        <>
          <NavLink to="/">Inicio</NavLink>
          <button onClick={handleLogOut}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login |</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </div>
  );
};
