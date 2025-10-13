import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes />
        <Toaster richColors />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
