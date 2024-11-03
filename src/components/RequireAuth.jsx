import { useContext } from "react";
import { UserContexts } from "../context/UserProvider";
import { Navigate } from "react-router-dom";

export const RequireAuth = (props) => {
  const { user } = useContext(UserContexts);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return props.children;
};
