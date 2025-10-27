import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";

const resetPasswordFormSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type ResetPasswordFormScham = z.infer<typeof resetPasswordFormSchema>;

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
  });
  const { resetPassword } = useContext(AuthContext);
  const [isFormBeingSubmitted, setIsFormBeingSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const token = searchParams.get("token") as string;
  const email = searchParams.get("email") as string;

  const handleForgotPassword = async ({ newPassword, confirmPassword }: ResetPasswordFormScham) => {
    setIsFormBeingSubmitted(true);

    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      setIsFormBeingSubmitted(false);
      return;
    }

    const status = await resetPassword(email, token, newPassword)
    setIsFormBeingSubmitted(false);

    if(status === "success"){
      navigate("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleForgotPassword)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <Field>
          <FieldLabel
            htmlFor="email"
            className="poppins-medium text-emerald-800 dark:text-foreground"
          >
            Nova senha
          </FieldLabel>
          <Input
            id="email"
            type="password"
            placeholder="Nova senha"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <span className="text-xs text-red-600 poppins-medium">
              {errors.newPassword.message}
            </span>
          )}
        </Field>

        <Field>
          <FieldLabel
            htmlFor="email"
            className="poppins-medium text-emerald-800 dark:text-foreground"
          >
            Confirmar senha
          </FieldLabel>
          <Input
            id="email"
            type="password"
            placeholder="Confirmar senha"
            {...register("confirmPassword")}
          />
          {errors.newPassword && (
            <span className="text-xs text-red-600 poppins-medium">
              {errors.newPassword.message}
            </span>
          )}
        </Field>

        <Field>
          <Button
            type="submit"
            className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold"
          >
            {isFormBeingSubmitted && <LoaderCircle className="animate-spin" />}
            Alterar senha
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
