import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app-routes";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "@/components/theme-provider";

export function App() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeProvider defaultTheme="system">
          <AppRoutes />
          <Toaster richColors theme={theme} />
        </ThemeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
