import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContexts } from "../../context/UserProvider";

export const LayoutRequireAuth = (props) => {
  const { user } = useContext(UserContexts);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
};
