import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { LoaderCircle } from "lucide-react";

import { z } from "zod";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";

const createStudioForm = z.object({
  name: z.string().min(3, { message: "Nome é obrigatório" }),
  address: z.string().min(6, { message: "Endereço inválido" }),
});

type CreateStudioForm = z.infer<typeof createStudioForm>;

interface CreateStudioDialogProps {
  onRefetch: () => Promise<void>;
}

export function CreateStudioDialog({ onRefetch }: CreateStudioDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createStudioForm),
  });

  const [isPending, setTransition] = useState(false);

  const handleCreateStudent = async ({ name, address }: CreateStudioForm) => {
    setTransition(true);

    try {
      const response = await api.post("/studios", {
        name,
        address,
      });

      if (response && response.status === 201) {
        onRefetch();
        toast.success("Studio criado");
      }
    } catch (err) {
      if (isAxiosError(err) && err.status !== 201) {
        toast.error("Erro ao criar studio. Tente novamente mais tarde.");
      }
    } finally {
      setTransition(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold">
          Novo studio
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Novo studio
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6">
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleCreateStudent)}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel
                    htmlFor="name"
                    className="poppins-medium text-emerald-800 dark:text-foreground"
                  >
                    Nome
                  </FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nome do studio"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-600 poppins-medium">
                      {errors.name.message}
                    </span>
                  )}
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel
                      htmlFor="address"
                      className="poppins-medium  text-emerald-800 dark:text-foreground"
                    >
                      Endereço
                    </FieldLabel>
                  </div>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Endereço completo"
                    {...register("address")}
                  />
                  {errors.address && (
                    <span className="text-xs text-red-600 poppins-medium">
                      {errors.address.message}
                    </span>
                  )}
                </Field>
              </FieldGroup>

              <div className="py-4 flex items-center gap-4 justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold"
                >
                  {isPending && <LoaderCircle className="animate-spin" />}
                  Criar studio
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
