import { Outlet } from "react-router-dom";

export const LayoutForm = () => {
  return (
    <div className="w-96 mx-auto">
      <h1>Layout Form</h1>
      <Outlet />
    </div>
  );
};
