/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { timeOptions } from "@/lib/time-options";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { api, getStudioSchedule } from "@/lib/api";
import {
  mapApiStudioScheduleResponse,
  type WeekDayCode,
} from "@/lib/map-api-studio-schedule-response";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export const businessHoursSchema = z.object({
  SUN: z.object({
    enabled: z.boolean(),
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  MON: z.object({
    enabled: z.boolean(),
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  TUE: z.object({
    enabled: z.boolean(),
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  WED: z.object({
    enabled: z.boolean(),
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  THU: z.object({
    enabled: z.boolean(),
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  FRI: z.object({
    enabled: z.boolean(),
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  SAT: z.object({
    enabled: z.boolean(),
    start: z.string().optional(),
    end: z.string().optional(),
  }),
});

type FormData = z.infer<typeof businessHoursSchema>;

export const weekDays = [
  { code: "SUN", label: "Domingo" },
  { code: "MON", label: "Segunda-feira" },
  { code: "TUE", label: "Terça-feira" },
  { code: "WED", label: "Quarta-feira" },
  { code: "THU", label: "Quinta-feira" },
  { code: "FRI", label: "Sexta-feira" },
  { code: "SAT", label: "Sábado" },
] as const;

interface StudioWorkScheduleProps {
  studioId: string;
}

type Schedule = {
  id: string;
  studioId: string;
  dayOfWeek: WeekDayCode;
  openTime: string;
  closeTime: string;
};

export function StudioWorkSchedule({ studioId }: StudioWorkScheduleProps) {
  const [apiData, setApiData] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(businessHoursSchema),
    defaultValues: {
      SUN: { enabled: false, start: "", end: "" },
      MON: { enabled: false, start: "", end: "" },
      TUE: { enabled: false, start: "", end: "" },
      WED: { enabled: false, start: "", end: "" },
      THU: { enabled: false, start: "", end: "" },
      FRI: { enabled: false, start: "", end: "" },
      SAT: { enabled: false, start: "", end: "" },
    },
  });

  useEffect(() => {
    getStudioSchedule(studioId).then((data) => {
      setApiData(data);
      const mapped = mapApiStudioScheduleResponse(data);
      form.reset(mapped);
    });
  }, [form]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const formatted = Object.entries(data).map(([dayCode, v]) => {
      const existing = apiData.find((d) => d.dayOfWeek === dayCode);

      return {
        id: existing?.id,
        studioId: existing?.studioId,
        dayOfWeek: dayCode,
        openTime: v.start,
        closeTime: v.end,
        enabled: v.enabled,
      };
    });

    try {
      const response = await api.put("/schedule/update", formatted);

      if (response && response.status !== 200) {
        toast.error("Erro ao alterar horário. Tente novamente mais tarde");
      }

      getStudioSchedule(studioId).then((data) => {
        setApiData(data);
        const mapped = mapApiStudioScheduleResponse(data);
        form.reset(mapped);
      });

      setIsLoading(false);

      toast.success("Horário alterado com sucesso");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="my-6">
        <h3 className="text-primary text-xl my-4 poppins-semibold">
          Horário de funcionamento
        </h3>
        <span className="text-sm text-foreground">
          Configure o horário de funcionamento padrão deste studio
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {weekDays.map((day) => (
          <div
            key={day.code}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:items-end"
          >
            {/* Label do dia */}
            <Label>{day.label}</Label>

            {/* Switch */}
            <Controller
              name={`${day.code}.enabled` as any}
              control={form.control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />

            {/* Selects */}
            <div className="grid grid-cols-2 gap-4">
              {/* Início */}
              <Controller
                name={`${day.code}.start` as any}
                control={form.control}
                render={({ field }) => (
                  <Select
                    disabled={!form.watch(`${day.code}.enabled`)}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Início" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {/* Fim */}
              <Controller
                name={`${day.code}.end` as any}
                control={form.control}
                render={({ field }) => (
                  <Select
                    disabled={!form.watch(`${day.code}.enabled`)}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Fim" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="submit"
        className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold my-6"
      >
        {isLoading && (
          <LoaderCircle className="text-primary animate-spin" size={18} />
        )}
        Salvar horários
      </Button>
    </form>
  );
}
