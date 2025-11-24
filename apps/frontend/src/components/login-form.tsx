import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/AuthContext";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "react-router-dom";
import { PasswordInput } from "./password-input";

const loginFormSchema = z.object({
  email: z.email({ message: "Insira um email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });
  const { login } = useContext(AuthContext);
  const [isFormBeingSubmitted, setIsFormBeingSubmitted] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const handleLogin = async ({ email, password }: LoginFormSchema) => {
    setIsFormBeingSubmitted(true);
    const userId = await login(email, password);
    setIsFormBeingSubmitted(false);

    if (userId) {
      setSearchParams({
        session: userId,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <Field>
          <FieldLabel
            htmlFor="email"
            className="poppins-medium text-emerald-800 dark:text-foreground"
          >
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-xs text-red-600 poppins-medium">
              {errors.email.message}
            </span>
          )}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel
              htmlFor="password"
              className="poppins-medium  text-emerald-800 dark:text-foreground"
            >
              Senha
            </FieldLabel>
            <Link
              to="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground dark:text-muted-foreground"
            >
              Esqueci a senha
            </Link>
          </div>
          <PasswordInput
            id="password"
            type="password"
            placeholder="Senha"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-xs text-red-600 poppins-medium">
              {errors.password.message}
            </span>
          )}
        </Field>
        <Field>
          <Button
            type="submit"
            className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold"
          >
            {isFormBeingSubmitted && <LoaderCircle className="animate-spin" />}
            Entrar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
