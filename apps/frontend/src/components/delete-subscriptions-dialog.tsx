import { CircleAlertIcon, LoaderCircle, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import { useState } from "react";

interface DeleteSubscriptionsDialogProps {
  getSelectedIds: () => string[];
  onRefetch?: () => Promise<void>;
}

export function DeleteSubscriptionsDialog({
  getSelectedIds,
  onRefetch,
}: DeleteSubscriptionsDialogProps) {
  const [isPending, setTransition] = useState(false);

  const handleDeleteRows = async () => {
    setTransition(true);
    const selectedIds = getSelectedIds();

    if (!selectedIds) {
      toast.error("Erro ao excluir assinatura(s)");
      return;
    }

    try {
      const response = await api.post("/unsubscribe-many", {
        subscriptionIds: selectedIds,
      });

      if (response && response.status === 204) {
        if (onRefetch === undefined) {
          return;
        }

        onRefetch();
        toast.success("Assinatura(s) excluída(s) com sucesso");
      }
    } catch (err) {
      if (isAxiosError(err) && err.status !== 204) {
        toast.error("Erro ao excluir assinatura(s)");
      }
    } finally {
      setTransition(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="ml-auto" variant="outline">
          <TrashIcon
            className="-ms-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não poderá ser desfeita. Você excluirá todas as
              assinaturas selecionadas.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteRows}
          >
            {isPending && <LoaderCircle className="animate-spin" />}
            Excluir
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
