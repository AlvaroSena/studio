import { useId } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateField, DateInput } from "@/components/ui/datefield-rac";
import { api } from "@/lib/api";
import { PhoneNumberInput } from "./PhoneInput";

const createStudentForm = z.object({
  name: z.string({ message: "Nome é obrigatório" }),
  cpf: z.string({ message: "CPF é obrigatório" }),
  email: z.email({ message: "Insira um email inválido" }),
  birthDate: z.coerce.date({ message: "Data de anivesário inválida" }),
  phone: z.string({ message: "Telefone inválido" }),
  profession: z.string({ message: "Profissão é obrigatório" }),
});

type CreateStudentForm = z.infer<typeof createStudentForm>;

export function CreateStudentDialog() {
  const id = useId();
  const {
    handleSubmit,
    register,
    setValue,
    // formState: { errors },
  } = useForm({
    resolver: zodResolver(createStudentForm),
  });

  const handleCreateStudent = async (data: CreateStudentForm) => {
    try {
      await api.post("/students", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold">
          Adicionar aluno
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Adicionar aluno
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6">
            <form
              onSubmit={handleSubmit(handleCreateStudent)}
              className="space-y-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-name`}>Nome completo</Label>
                  <Input
                    id={`${id}-name`}
                    placeholder="Nome"
                    type="text"
                    {...register("name")}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-first-name`}>CPF</Label>
                  <Input
                    id={`${id}-first-name`}
                    placeholder="CPF"
                    type="text"
                    {...register("cpf")}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-first-name`}>Email</Label>
                  <Input
                    id={`${id}-first-name`}
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                  />
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-username`}>Data de aniversário</Label>
                <div className="relative">
                  <DateField
                    className="*:not-first:mt-2"
                    onChange={(value) => setValue("birthDate", value)}
                  >
                    <DateInput />
                  </DateField>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-first-name`}>Telefone</Label>
                  <PhoneNumberInput />
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-first-name`}>Profissão</Label>
                  <Input
                    id={`${id}-first-name`}
                    placeholder="Profissão"
                    type="text"
                    {...register("profession")}
                  />
                </div>
              </div>
              <div className="border-t py-4 flex items-center gap-4 justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit">Adicionar</Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
