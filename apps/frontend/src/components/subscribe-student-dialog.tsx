import { LoaderCircle, StoreIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { api, getPlans, getStudents } from "@/lib/api";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface GetPlansResponse {
  id: string;
  period: "MONTHLY" | "QUARTELY" | "SEMIANNUAL" | "ANNUAL";
  monthlyPriceInCents: number;
  totalPriceInCents: number;
}

interface GetStudentsResponse {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface DataResponse {
  data: {
    plans: GetPlansResponse[];
    students: GetStudentsResponse[];
  };
}

interface ChangeSubscriptionDialogProps {
  onRefetch?: () => Promise<void>;
}

export function SubscribeStudentDialog({
  onRefetch,
}: ChangeSubscriptionDialogProps) {
  const [items, setItems] = useState<DataResponse>({} as DataResponse);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [isPending, setTransition] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [plansData, studentsData] = await Promise.all([
        getPlans(),
        getStudents(),
      ]);

      setItems({
        data: {
          plans: plansData,
          students: studentsData,
        },
      });
    }

    loadData();
  }, []);

  async function handleSubscribe() {
    setTransition(true);

    if (!selectedPlanId) {
      toast.error("Selecione um dos planos disponíveis");
      return;
    }

    if (!selectedStudentId) {
      toast.error("Selecione um dos alunos para realizar a assinatura");
      return;
    }

    try {
      const response = await api.post("/subscribe", {
        planId: selectedPlanId,
        studentId: selectedStudentId,
      });

      if (response && response.status === 201) {
        if (onRefetch === undefined) {
          return;
        }

        onRefetch();
        toast.success("Assinatura realizada com sucesso");
      }
    } catch (err) {
      if (isAxiosError(err) && err.status !== 201) {
        toast.error(
          "Erro ao alterar a assinatura. Tente novamente mais tarde."
        );
      }
    } finally {
      setTransition(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full h-auto">
        <Button className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold">
          Nova assinatura
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mb-2 flex flex-col gap-2">
          <div
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
          >
            <StoreIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Fazer assinatura</DialogTitle>
            <DialogDescription className="text-left">
              Escolhe um dos planos abaixo
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <RadioGroup
            className="grid-cols-2"
            value={selectedPlanId}
            onValueChange={setSelectedPlanId}
          >
            {items.data?.plans?.map((plan) => (
              <label
                key={plan.id}
                className="relative flex cursor-pointer flex-col gap-1 rounded-md border border-input px-4 py-3 shadow-xs outline-none transition-[color,box-shadow] has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
              >
                <RadioGroupItem
                  className="sr-only after:absolute after:inset-0"
                  id={plan.id}
                  value={plan.id}
                />
                <div className="inline-flex items-start justify-between gap-2">
                  <p className="font-medium text-foreground text-sm">
                    {plan.period === "MONTHLY" && "Mensal"}
                    {plan.period === "ANNUAL" && "Anual"}
                  </p>
                  {plan.period === "ANNUAL" && <Badge>Popular</Badge>}
                </div>
                {plan.period === "ANNUAL" ? (
                  <p className="text-muted-foreground text-sm">
                    <span>
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(plan.totalPriceInCents / 100)}
                    </span>
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(plan.monthlyPriceInCents / 100)}
                    /mês
                  </p>
                )}
              </label>
            ))}
          </RadioGroup>

          <div className="*:not-first:mt-2">
            <Label htmlFor="student-select">Aluno</Label>
            <Select
              value={selectedStudentId}
              onValueChange={setSelectedStudentId}
            >
              <SelectTrigger
                id="student-select"
                className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
              >
                <SelectValue placeholder="Selecione um aluno" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
                <SelectGroup>
                  <SelectLabel className="ps-2">Selecione o aluno</SelectLabel>
                  {items.data?.students?.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      <Avatar className="h-6 w-6 rounded-full">
                        <AvatarImage
                          src={student.avatarUrl ?? ""}
                          alt={student.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-lg">
                          {`${student.name[0]}${student.name[1]}`}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">{student.name}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            {selectedPlanId && (
              <Button
                className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold"
                type="button"
                onClick={() => handleSubscribe()}
                disabled={isPending}
              >
                {isPending && <LoaderCircle className="animate-spin" />}
                Assinar
              </Button>
            )}
            <DialogClose asChild>
              <Button className="w-full" type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
