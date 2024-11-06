import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContexts } from "./context/UserProvider";

import { Login } from "./routes/Login";
import { Home } from "./routes/Home";
import { Perfil } from "./routes/Perfil";
import { Register } from "./routes/Register";
import { NotFound } from "./routes/NotFound";

import { Navbar } from "./components/Navbar";
import { LayoutForm } from "./components/layout/LayoutForm";
import { LayoutRequireAuth } from "./components/layout/LayoutRequireAuth";

function App() {
  const { user } = useContext(UserContexts);

  if (user === false) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <h1>App</h1>
      <Routes>
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
        <Route path="/" element={<LayoutForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
