import { LoaderCircle, RefreshCcwIcon } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { api, getPlans } from "@/lib/api";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { UpdateSubscriptionStatus } from "./update-subscription-status";

interface GetPlansResponse {
  id: string;
  period: "MONTHLY" | "QUARTELY" | "SEMIANNUAL" | "ANNUAL";
  monthlyPriceInCents: number;
  totalPriceInCents: number;
}

interface ChangeSubscriptionDialogProps {
  studentId: string;
  subscriptionId: string;
  onRefetch?: () => Promise<void>;
}

export function ChangeSubscriptionDialog({
  studentId,
  subscriptionId,
  onRefetch,
}: ChangeSubscriptionDialogProps) {
  const [data, setData] = useState<GetPlansResponse[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [isPending, setTransition] = useState(false);

  useEffect(() => {
    async function fetchPlans() {
      const data = await getPlans();

      setData(data);
    }

    fetchPlans();
  }, []);

  async function handleUpdateSubscription() {
    setTransition(true);

    if (!selectedPlanId) {
      toast.error("Selecione um dos planos disponíveis");
      return;
    }

    try {
      const response = await api.put(`/resubscribe/${subscriptionId}`, {
        planId: selectedPlanId,
        studentId,
      });

      if (response && response.status === 200) {
        if (onRefetch !== undefined) {
          onRefetch();
        }

        toast.success("Assinatura atualizada com sucesso");
      }
    } catch (err) {
      if (isAxiosError(err) && err.status !== 200) {
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
      <DialogTrigger asChild className="w-full p-0 h-auto">
        <Button variant="ghost" className="px-1.5 py-2">
          Alterar assinatura
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mb-2 flex flex-col gap-2">
          <div
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
          >
            <RefreshCcwIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Alterar assinatura</DialogTitle>
            <DialogDescription className="text-left">
              Escolhe um dos planos abaixo
            </DialogDescription>
          </DialogHeader>
        </div>

        <Tabs defaultValue="tab-1">
          <ScrollArea>
            <TabsList className="mb-3">
              <TabsTrigger value="tab-1">Planos</TabsTrigger>
              <TabsTrigger value="tab-2" className="group">
                Status
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent value="tab-1">
            <form className="space-y-5">
              <RadioGroup
                className="gap-2"
                value={selectedPlanId}
                onValueChange={setSelectedPlanId}
              >
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex w-full items-center gap-2 rounded-md border border-input px-4 py-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent"
                  >
                    <RadioGroupItem
                      aria-describedby={item.id}
                      className="order-1 after:absolute after:inset-0"
                      id={item.id}
                      value={item.id}
                    />
                    <div className="grid grow gap-1">
                      <Label htmlFor={item.id}>
                        {item.period === "MONTHLY" && "Mensal"}
                        {item.period === "QUARTELY" && "Trimestral"}
                        {item.period === "SEMIANNUAL" && "Semestral"}
                        {item.period === "ANNUAL" && (
                          <div className="flex items-center gap-3 my-2">
                            <span>Anual</span> <Badge>Popular</Badge>
                          </div>
                        )}
                      </Label>
                      {item.period === "ANNUAL" ? (
                        <p
                          className="text-muted-foreground text-xs"
                          id={item.id}
                        >
                          <span className="line-through">
                            12x de{" "}
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(item.monthlyPriceInCents / 100)}
                          </span>{" "}
                          ou{" "}
                          <span>
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(item.totalPriceInCents / 100)}
                          </span>
                        </p>
                      ) : (
                        <p
                          className="text-muted-foreground text-xs"
                          id={item.id}
                        >
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(item.monthlyPriceInCents / 100)}
                          /mês
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </RadioGroup>

              <div className="grid gap-2">
                {selectedPlanId && (
                  <Button
                    className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold"
                    type="button"
                    onClick={() => handleUpdateSubscription()}
                    disabled={isPending}
                  >
                    {isPending && <LoaderCircle className="animate-spin" />}
                    Alterar assinatura
                  </Button>
                )}
              </div>
            </form>
          </TabsContent>
          <TabsContent value="tab-2">
            <UpdateSubscriptionStatus
              subscriptionId={subscriptionId}
              onRefetch={onRefetch}
            />
          </TabsContent>
        </Tabs>
        <DialogClose asChild>
          <Button className="w-full" type="button" variant="secondary">
            Cancelar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
