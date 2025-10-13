import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Home() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Olá, {user?.name}</h1>
      {user?.role === "admin" && <p>Você é um administrador</p>}
      <Button
        onClick={() => logout()}
        className="bg-emerald-800 hover:bg-emerald-700"
      >
        Logout
      </Button>
    </div>
  );
}
