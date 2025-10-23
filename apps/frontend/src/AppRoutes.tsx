import { Routes, Route } from "react-router-dom";
import { Protected } from "@/components/protected";
import { Layout } from "@/components/layout";
import { Admin } from "@/pages/admin";
import { Login } from "@/pages/Login";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected>
            <Layout>
              <Admin />
            </Layout>
          </Protected>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
