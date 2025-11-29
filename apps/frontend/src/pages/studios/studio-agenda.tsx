import { ClassSchedule } from "@/components/class-schedule";
import { CalendarFold, FileCheck, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudioClasses } from "@/lib/api";
import { StudioWorkSchedule } from "@/components/studio-work-schedule";
import type { CalendarEvent } from "@/components/event-calendar";
import { Enrollments } from "@/components/enrollments";

export function StudioAgenda() {
  const { id } = useParams();
  const [classes, setClasses] = useState<CalendarEvent[]>([]);

  const loadEvents = async () => {
    if (!id) {
      return;
    }

    const data = await getStudioClasses(id);

    if (data) {
      setClasses(data);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [id]);

  return (
    <div className="mx-4 lg:mx-6">
      <Tabs defaultValue="tab-1">
        <ScrollArea>
          <TabsList className="mb-3 justify-center md:justify-start gap-3">
            <TabsTrigger value="tab-1">
              <CalendarFold
                className="-ms-0.5 me-0 md:me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              <span className="hidden md:inline">Agenda</span>

              {classes.length > 0 && (
                <Badge
                  className="ms-1.5 min-w-5 bg-primary/15 px-1 transition-opacity hidden md:inline"
                  variant="secondary"
                >
                  {classes.length}
                </Badge>
              )}
            </TabsTrigger>

            <TabsTrigger value="tab-2">
              <FileCheck
                className="-ms-0.5 me-0 md:me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              <span className="hidden md:inline">Matrículas</span>
            </TabsTrigger>

            <TabsTrigger value="tab-3">
              <Settings
                className="-ms-0.5 me-0 md:me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              <span className="hidden md:inline">Configurações</span>
            </TabsTrigger>
          </TabsList>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="tab-1">
          <ClassSchedule events={classes} onRefetch={() => loadEvents()} />
        </TabsContent>
        <TabsContent value="tab-2">
          <Enrollments />
        </TabsContent>
        <TabsContent value="tab-3">
          {id && (
            <div className="flex flex-col gap-8">
              <StudioWorkSchedule studioId={id} />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
