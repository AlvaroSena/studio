import { useState } from "react";
import { StatusDot } from "./status-dot";
import { Button } from "./ui/button";
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
import { LoaderCircle } from "lucide-react";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { api } from "@/lib/api";

interface UpdateSubscriptionStatusProps {
  subscriptionId: string;
  onRefetch?: () => Promise<void>;
}

export function UpdateSubscriptionStatus({
  subscriptionId,
  onRefetch,
}: UpdateSubscriptionStatusProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isPending, setTransition] = useState(false);

  async function handleChangeStatus() {
    setTransition(true);

    try {
      const response = await api.patch(
        `/subscriptions/status/${subscriptionId}`,
        {
          status: selectedStatus,
        }
      );

      if (response && response.status === 204) {
        if (onRefetch === undefined) {
          return;
        }

        await onRefetch();
        toast.success("Status alterado com sucesso");
      }
    } catch (err) {
      if (isAxiosError(err) && err.status !== 204) {
        toast.error("Erro ao alterar o status da assinatura");
      }
    } finally {
      setTransition(false);
    }
  }

  return (
    <form className="flex flex-col gap-6">
      <div className="*:not-first:mt-2">
        <Label htmlFor="">Status da aula</Label>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger
            id=""
            className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
          >
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
            <SelectGroup>
              <SelectLabel className="ps-2">
                Selecione o status da aula
              </SelectLabel>
              <SelectItem value="ACTIVE">
                <StatusDot className="text-emerald-800/80 dark:text-emerald-800/30" />
                <span className="truncate">Ativa</span>
              </SelectItem>
              <SelectItem value="SUSPENDED">
                <StatusDot className="text-primary/10" />
                <span className="truncate">Suspensa</span>
              </SelectItem>
              <SelectItem value="CANCELED">
                <StatusDot className="text-red-600/80 dark:text-red-800/80" />
                <span className="truncate">Cancelada</span>
              </SelectItem>
              <SelectItem value="PENDING">
                <StatusDot className="text-yellow-600/80 dark:text-yellow-600/60" />
                <span className="truncate">Pendente</span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {selectedStatus && (
        <Button
          className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold"
          type="button"
          onClick={() => handleChangeStatus()}
          disabled={isPending}
        >
          {isPending && <LoaderCircle className="animate-spin" />}
          Alterar assinatura
        </Button>
      )}
    </form>
  );
}
