import { Routes, Route } from "react-router-dom";
import { Protected } from "@/components/protected";
import { Layout } from "@/components/layout";
import { Admin } from "@/pages/admin";
import { Login } from "@/pages/login";
import { Studios } from "@/pages/studios";
import { Settings } from "@/pages/settings";
import { StudioAgenda } from "@/pages/studios/studio-agenda";
import { Collaborators } from "@/pages/collaborators";
import { ForgotPassword } from "./pages/forgot-password";
import { ResetPassword } from "./pages/reset-password";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/collaborators"
        element={
          <Protected>
            <Layout>
              <Collaborators />
            </Layout>
          </Protected>
        }
      />
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
        path="/studios/agenda/:id"
        element={
          <Protected>
            <Layout>
              <StudioAgenda />
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
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
