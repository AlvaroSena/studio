import { z } from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";

const forgotPasswordFormSchema = z.object({
  email: z.email({ message: "Insira um email inválido" }),
});

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
  });
  const { forgotPassword } = useContext(AuthContext);
  const [isFormBeingSubmitted, setIsFormBeingSubmitted] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const handleForgotPassword = async ({ email }: ForgotPasswordFormSchema) => {
    setIsFormBeingSubmitted(true);
    const status = await forgotPassword(email);
    setIsFormBeingSubmitted(false);

    if (status === "success") {
      setSearchParams({ sent: "true" });
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
          <Button
            type="submit"
            className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold"
          >
            {isFormBeingSubmitted && <LoaderCircle className="animate-spin" />}
            Enviar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
