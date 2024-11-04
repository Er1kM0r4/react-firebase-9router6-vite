import { Routes, Route } from "react-router-dom";
import { Login } from "./routes/Login";
import { Home } from "./routes/Home";
import { Navbar } from "./components/Navbar";
import { RequireAuth } from "./components/RequireAuth";
import { Register } from "./routes/Register";
import { UserContexts } from "./context/UserProvider";
import { useContext } from "react";
import { LayoutForm } from "./components/LayoutForm";
function App() {
  const { user } = useContext(UserContexts);

  if (user === false) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <h1>App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/" element={<LayoutForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
