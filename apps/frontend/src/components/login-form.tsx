import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

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
  const navigate = useNavigate();
  const [isFormBeingSubmitted, setIsFormBeingSubmitted] = useState(false);

  const handleLogin = async ({ email, password }: LoginFormSchema) => {
    setIsFormBeingSubmitted(true);
    await login(email, password);
    setIsFormBeingSubmitted(false);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl poppins-bold text-zinc-800">
            Entre na sua conta
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Digite seu email e senha para entrar na sua conta
          </p>
        </div>
        <Field>
          <FieldLabel
            htmlFor="email"
            className="poppins-medium text-emerald-800"
          >
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
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
              className="poppins-medium text-emerald-800"
            >
              Senha
            </FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline text-emerald-800"
            >
              Esqueceu a senha?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
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
            className="bg-emerald-800 hover:bg-emerald-700 poppins-semibold"
          >
            {isFormBeingSubmitted && <LoaderCircle className="animate-spin" />}
            Entrar
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="underline underline-offset-4 text-emerald-800"
            >
              Cadastre-se
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
