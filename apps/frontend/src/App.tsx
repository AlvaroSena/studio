import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeProvider defaultTheme="system">
          <AppRoutes />
          <Toaster richColors />
        </ThemeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
