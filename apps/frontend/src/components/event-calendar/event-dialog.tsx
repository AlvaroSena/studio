import { useEffect, useMemo, useState } from "react";
import { RiCalendarLine, RiDeleteBinLine } from "@remixicon/react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CalendarEvent, EventColor } from "@/components/event-calendar";
import {
  DefaultStartHour,
  EndHour,
  StartHour,
} from "@/components/event-calendar/constants";

import { SelectGroup, SelectLabel } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { StatusDot } from "../status-dot";
import { api } from "@/lib/api";
import { Link, useParams } from "react-router-dom";
import { FileCheck } from "lucide-react";
import { toast } from "sonner";

interface EventDialogProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
}

type InstructorType = {
  id: string;
  name: string;
  photoUrl: string | null;
};

export function EventDialog({
  event,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: EventDialogProps) {
  const params = useParams();

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState(`${DefaultStartHour}:00`);
  const [allDay, setAllDay] = useState(false);
  const [color, setColor] = useState<EventColor>("sky");
  const [error, setError] = useState<string | null>(null);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [instructors, setInstructors] = useState<InstructorType[]>([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [selectedClassType, setSelectedClassType] = useState("");
  const [selectedClassStatus, setSelectedClassStatus] = useState("");

  useEffect(() => {
    const fetchInstructors = async () => {
      const response = await api.get("/collaborators/roles/instructor");

      const data = response.data;

      if (data) {
        setInstructors(data);
      }
    };

    fetchInstructors();
  }, []);

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");

      const start = new Date(event.date);

      setStartDate(start);
      setStartTime(formatTimeForInput(start));
      setColor((event.color as EventColor) || "sky");
      setError(null); // Reset error when opening dialog
    } else {
      resetForm();
    }
  }, [event]);

  const resetForm = () => {
    setTitle("");
    setStartDate(new Date());
    setStartTime(`${DefaultStartHour}:00`);
    setAllDay(false);
    setColor("sky");
    setError(null);
  };

  const formatTimeForInput = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = Math.floor(date.getMinutes() / 15) * 15;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  // Memoize time options so they're only calculated once
  const timeOptions = useMemo(() => {
    const options = [];
    for (let hour = StartHour; hour <= EndHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const value = `${formattedHour}:${formattedMinute}`;
        // Use a fixed date to avoid unnecessary date object creations
        const date = new Date(2000, 0, 1, hour, minute);
        const label = format(date, "h:mm a");
        options.push({ value, label });
      }
    }
    return options;
  }, []); // Empty dependency array ensures this only runs once

  const handleSave = () => {
    if (!selectedInstructorId) {
      toast.warning("Selecione um instrutor");
      return;
    }

    if (!selectedClassType) {
      toast.warning("Selecione o tipo da aula");
      return;
    }

    if (event?.id && !selectedClassStatus) {
      toast.warning("Selecione o status da aula");
      return;
    }

    const start = new Date(startDate);

    const [hour, minute] = startTime.split(":").map(Number);

    start.setHours(hour);
    start.setMinutes(minute);
    start.setSeconds(0);
    start.setMilliseconds(0);

    const eventTitle = title.trim() ? title : "(no title)";

    if (!params.id) {
      return;
    }

    onSave({
      id: event?.id || "",
      title: eventTitle,
      date: start,
      studioId: params.id,
      instructorId: selectedInstructorId,
      status: "SCHEDULED",
      type: "NORMAL",
      color,
    });
  };

  const handleDelete = () => {
    if (event?.id) {
      onDelete(event.id);
    }
  };

  // Updated color options to match types.ts
  const colorOptions: Array<{
    value: EventColor;
    label: string;
    bgClass: string;
    borderClass: string;
  }> = [
    {
      value: "sky",
      label: "Sky",
      bgClass: "bg-sky-400 data-[state=checked]:bg-sky-400",
      borderClass: "border-sky-400 data-[state=checked]:border-sky-400",
    },
    {
      value: "amber",
      label: "Amber",
      bgClass: "bg-amber-400 data-[state=checked]:bg-amber-400",
      borderClass: "border-amber-400 data-[state=checked]:border-amber-400",
    },
    {
      value: "violet",
      label: "Violet",
      bgClass: "bg-violet-400 data-[state=checked]:bg-violet-400",
      borderClass: "border-violet-400 data-[state=checked]:border-violet-400",
    },
    {
      value: "rose",
      label: "Rose",
      bgClass: "bg-rose-400 data-[state=checked]:bg-rose-400",
      borderClass: "border-rose-400 data-[state=checked]:border-rose-400",
    },
    {
      value: "emerald",
      label: "Emerald",
      bgClass: "bg-emerald-400 data-[state=checked]:bg-emerald-400",
      borderClass: "border-emerald-400 data-[state=checked]:border-emerald-400",
    },
    {
      value: "orange",
      label: "Orange",
      bgClass: "bg-orange-400 data-[state=checked]:bg-orange-400",
      borderClass: "border-orange-400 data-[state=checked]:border-orange-400",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {event?.id ? "Reagendar aula" : "Agendar aula"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {event?.id
              ? "Reagende esta aula para outro dia"
              : "Agende uma aula"}
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="bg-destructive/15 text-destructive rounded-md px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <div className="grid gap-4 py-4">
          <div className="*:not-first:mt-1.5">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 *:not-first:mt-1.5">
              <Label htmlFor="start-date">Data</Label>
              <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="start-date"
                    variant={"outline"}
                    className={cn(
                      "group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "truncate",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </span>
                    <RiCalendarLine
                      size={16}
                      className="text-muted-foreground/80 shrink-0"
                      aria-hidden="true"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    defaultMonth={startDate}
                    onSelect={(date) => {
                      if (date) {
                        setStartDate(date);
                        // If end date is before the new start date, update it to match the start date
                        // if (isBefore(endDate, date)) {
                        //   setEndDate(date);
                        // }
                        setError(null);
                        setStartDateOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {!allDay && (
              <div className="min-w-28 *:not-first:mt-1.5">
                <Label htmlFor="start-time">Hora</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger id="start-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="*:not-first:mt-2">
            <Label htmlFor="select-instructor">Instrutor</Label>
            <Select
              defaultValue={event?.instructorId}
              value={selectedInstructorId}
              onValueChange={setSelectedInstructorId}
            >
              <SelectTrigger
                id="select-instructor"
                className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
              >
                <SelectValue placeholder="Selecione um instrutor" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
                <SelectGroup>
                  <SelectLabel className="ps-2">
                    Selecione o instrutor
                  </SelectLabel>

                  {instructors.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id}>
                      <Avatar className="h-6 w-6 rounded-full">
                        <AvatarImage
                          src={instructor.photoUrl ?? ""}
                          alt={instructor.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-lg">
                          {`${instructor.name[0]}${instructor.name[1]}`}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">{instructor.name}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor="class-type">Tipo de aula</Label>
            <Select
              defaultValue={event?.type}
              value={selectedClassType}
              onValueChange={setSelectedClassType}
            >
              <SelectTrigger
                id="class-type"
                className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
              >
                <SelectValue placeholder="Selecione o tipo de aula" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
                <SelectGroup>
                  <SelectLabel className="ps-2">
                    Selecione o tipo de aula
                  </SelectLabel>
                  <SelectItem value="NORMAL">
                    <span className="truncate">Normal</span>
                  </SelectItem>
                  <SelectItem value="REPLACEMENT">
                    <span className="truncate">Reposição</span>
                  </SelectItem>
                  <SelectItem value="EXPERIMENTAL">
                    <span className="truncate">Experimental</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {event?.id && (
            <div className="*:not-first:mt-2">
              <Label htmlFor="class-status">Status da aula</Label>
              <Select
                defaultValue={event?.status}
                value={selectedClassStatus}
                onValueChange={setSelectedClassStatus}
              >
                <SelectTrigger
                  id="class-status"
                  className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
                >
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
                  <SelectGroup>
                    <SelectLabel className="ps-2">
                      Selecione o status da aula
                    </SelectLabel>
                    <SelectItem value="SCHEDULED">
                      <StatusDot className="text-blue-500" />
                      <span className="truncate">Agendada</span>
                    </SelectItem>
                    <SelectItem value="DONE">
                      <StatusDot className="text-emerald-600" />
                      <span className="truncate">Finalizada</span>
                    </SelectItem>
                    <SelectItem value="CANCELED">
                      <StatusDot className="text-red-500" />
                      <span className="truncate">Cancelada</span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          <fieldset className="space-y-4">
            <legend className="text-foreground text-sm leading-none font-medium">
              Etiquette
            </legend>
            <RadioGroup
              className="flex gap-1.5"
              defaultValue={colorOptions[0]?.value}
              value={color}
              onValueChange={(value: EventColor) => setColor(value)}
            >
              {colorOptions.map((colorOption) => (
                <RadioGroupItem
                  key={colorOption.value}
                  id={`color-${colorOption.value}`}
                  value={colorOption.value}
                  aria-label={colorOption.label}
                  className={cn(
                    "size-6 shadow-none",
                    colorOption.bgClass,
                    colorOption.borderClass
                  )}
                />
              ))}
            </RadioGroup>
          </fieldset>

          {event?.id && (
            <fieldset className="space-y-4">
              <Link
                to={`/studios/enrollments/${event.id}`}
                className="flex items-center gap-2 text-sm text-foreground underline transition hover:text-foreground/60"
              >
                <FileCheck size={18} />
                Ver matrículas desta aula
              </Link>
            </fieldset>
          )}
        </div>
        <DialogFooter className="flex-row sm:justify-between">
          {event?.id && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleDelete}
              aria-label="Delete event"
            >
              <RiDeleteBinLine size={16} aria-hidden="true" />
            </Button>
          )}
          <div className="flex flex-1 justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold"
              onClick={handleSave}
            >
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
