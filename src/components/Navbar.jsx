import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContexts } from "../context/UserProvider";

export const Navbar = () => {
  const { user, setUser } = useContext(UserContexts);

  return (
    <div>
      {user ? (
        <>
          <NavLink to="/">Inicio</NavLink>
          <button onClick={() => setUser(false)}>Logout</button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
};
