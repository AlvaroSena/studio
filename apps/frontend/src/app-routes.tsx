import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "@/components/auth-layout";
import { Protected } from "@/components/protected";
import { Layout } from "@/components/layout";
import { Admin } from "@/pages/admin";
import { Login } from "@/pages/login";
import { Studios } from "@/pages/studios";
import { Settings } from "@/pages/settings";
import { StudioAgenda } from "@/pages/studios/studio-agenda";
import { Collaborators } from "@/pages/collaborators";
import { ForgotPassword } from "@/pages/forgot-password";
import { ResetPassword } from "@/pages/reset-password";
import { Students } from "./pages/students";

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
        path="/students"
        element={
          <Protected>
            <Layout>
              <Students />
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
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        }
      />
      <Route
        path="/reset-password"
        element={
          <AuthLayout>
            <ResetPassword />
          </AuthLayout>
        }
      />
    </Routes>
  );
}
