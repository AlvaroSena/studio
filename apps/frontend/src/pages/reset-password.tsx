import { ResetPasswordForm } from "@/components/reset-password-form";

export function ResetPassword() {
  return (
    <div className="w-full max-w-xs">
      <div className="flex flex-col items-center gap-1 text-center mb-6">
        <h1 className="text-2xl poppins-bold text-foreground">
          Redefina sua senha
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Para redefinir sua senha, preencha as informações abaixo
        </p>
      </div>

      <ResetPasswordForm />
    </div>
  )
}
