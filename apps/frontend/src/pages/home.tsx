import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="m-8">
      <Avatar>
        <AvatarImage src={user?.photoUrl ?? ""} alt={user?.name ?? ""} />
        <AvatarFallback>
          {user?.name?.charAt(0).concat(user?.name?.charAt(1)).toUpperCase() ??
            ""}
        </AvatarFallback>
      </Avatar>
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
