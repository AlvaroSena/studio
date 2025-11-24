import { LoginForm } from "@/components/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OTPForm } from "@/components/otp-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const session = searchParams.get("session");

  useEffect(() => {
    // verifing if session has the correct length of characters
    if (session && (session.length < 36 || session.length > 36)) {
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="w-full max-w-xs">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl poppins-bold text-foreground">
          {!session ? "Entre na sua conta" : "Enviamos um email"}
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          {!session
            ? "Digite seu email e senha para entrar na sua conta"
            : "Digite o código enviado para seu email"}
        </p>
      </div>
      {!session ? (
        <Tabs defaultValue="tab-1" className="my-8">
          <TabsList className="w-full">
            <TabsTrigger value="tab-1" className="w-full">
              Colaborador
            </TabsTrigger>
            <TabsTrigger value="tab-2" className="w-full">
              Aluno
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">
            <LoginForm />
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="p-4 text-center text-xs text-muted-foreground">
              Em breve
            </p>
          </TabsContent>
        </Tabs>
      ) : (
        <OTPForm />
      )}
    </div>
  );
}
