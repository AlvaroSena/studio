import { Routes, Route } from "react-router-dom";
import { Protected } from "@/components/protected";
import { Layout } from "@/components/layout";
import { Admin } from "@/pages/admin";
import { Login } from "@/pages/Login";
import { Studios } from "@/pages/Studios";
import { Settings } from "@/pages/Settings";

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
      <Route
        path="/studios"
        element={
          <Protected>
            <Layout>
              <Studios />
            </Layout>
          </Protected>
        }
      />
      <Route
        path="/settings"
        element={
          <Protected>
            <Layout>
              <Settings />
            </Layout>
          </Protected>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
