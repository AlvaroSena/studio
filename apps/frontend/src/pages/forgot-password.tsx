import { GalleryVerticalEnd, MailOpen } from "lucide-react";
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSent]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Define Pilates
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
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
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1591258370814-01609b341790?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
