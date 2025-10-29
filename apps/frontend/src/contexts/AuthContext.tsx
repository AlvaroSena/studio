/* eslint-disable react-refresh/only-export-components */
import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

interface AuthContextProviderProps {
  children?: ReactNode;
}

interface AuthContextType {
  user: {
    id: string;
    name: string;
    photoUrl: string | null;
    role: string;
  } | null;
  login: (email: string, password: string) => Promise<string | undefined>;
  verifyOTP: (code: string, userId: string) => Promise<string>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (email: string, token: string, newPassword: string) => Promise<string>;
  fetchMe: () => void;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      const res = await api.post("/auth/refresh", {
        token: refreshToken,
      });

      const newAccess = res.data.accessToken;

      api.defaults.headers.Authorization = `bearer ${newAccess}`;

      await fetchMe();
      setLoading(false);
    } catch {
      setUser(null);
      setAccessToken(null);
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, password });
      const { userId }: { userId: string } = response.data;

      return userId;
    } catch (err) {
      if (isAxiosError(err) && err.status === 401) {
        toast.error("Email ou senha incorreto.");
      }
    }
  };

  const verifyOTP = async (code: string, userId: string) => {
    try {
      const response = await api.post(`/auth/verify/${userId}`, { code });
      const data: { accessToken: string, refreshToken: string } = response.data;

      localStorage.setItem("refreshToken", data.refreshToken);
      api.defaults.headers.Authorization = `bearer ${data.accessToken}`;
      await fetchMe();

      return "success";
    } catch (err) {
      if (isAxiosError(err) && err.status === 401) {
        toast.error("Código inválido.");
      }

      return "unauthorized";
    }
  };

  const logout = () => {
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Email enviado com sucesso!");

      return "success"
    } catch (err) {
      if (isAxiosError(err) && err.status === 401) {
        toast.error("Email não encontrado.");
      }

      return "failed"
    }
  };

  const resetPassword = async (email: string, token: string, newPassword: string) => {
    try {
      await api.post("/auth/forgot-password/reset", { email, token, password: newPassword });
      toast.success("Senha alterada com sucesso!");

      return "success"
    } catch (err) {
      if (isAxiosError(err) && err.status === 401) {
        toast.error("Email não encontrado.");
      }

      return "failed"
    }
  };

  const fetchMe = async () => {
    try {
      const res = await api.get("/collaborators/profile/me");
      setUser(res.data.collaborator);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ login, verifyOTP, logout, forgotPassword, resetPassword, fetchMe, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
