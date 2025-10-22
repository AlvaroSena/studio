import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Protected } from "./components/Protected";
import { Admin } from "./pages/admin";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected>
            <Admin />
          </Protected>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
