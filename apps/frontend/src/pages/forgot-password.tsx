import { MailOpen } from "lucide-react";
import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const formSent = searchParams.get("sent");
  const [isFormSent, setIsFormSent] = useState(formSent)

  useEffect(() => {
    // verifing if session has the correct length of characters
    setIsFormSent(formSent)

  }, [formSent]);

  return (
    <div className="w-full max-w-xs">
        {isFormSent ? (
          <div className="flex flex-col items-center gap-1 text-center">
            <MailOpen size={32} className="text-foreground animate-pulse" />
            <h1 className="text-2xl poppins-bold text-foreground">
              Enviamos um link para seu email
            </h1>
            <p className="text-muted-foreground text-sm text-balance">
              Verifique sua caixa de entrada e siga as instruções para
              redefinir sua senha
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl poppins-bold text-foreground">
                Esqueceu sua senha
              </h1>
              <p className="text-muted-foreground text-sm text-balance">
                Digite seu email para receber um código de recuperação
              </p>
            </div>
            <ForgotPasswordForm />
          </>
        )}
    </div>
  )
}
