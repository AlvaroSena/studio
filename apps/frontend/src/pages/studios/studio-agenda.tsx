import { ClassSchedule } from "@/components/class-schedule";
import { CalendarFold, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudioClasses } from "@/lib/api";
import { StudioWorkSchedule } from "@/components/studio-work-schedule";
import type { CalendarEvent } from "@/components/event-calendar";

export function StudioAgenda() {
  const { id } = useParams();
  const [classes, setClasses] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    getStudioClasses(id).then((data) => setClasses(data));
  }, [id]);

  return (
    <div className="mx-8">
      <Tabs defaultValue="tab-1">
        <ScrollArea>
          <TabsList className="mb-3">
            <TabsTrigger value="tab-1">
              <CalendarFold
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Agenda
              {classes.length > 0 && (
                <Badge
                  className="ms-1.5 min-w-5 bg-primary/15 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                  variant="secondary"
                >
                  {classes.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="tab-2" className="group">
              <Settings
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Configurações
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="tab-1">
          <ClassSchedule events={classes} />
        </TabsContent>
        <TabsContent value="tab-2">
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
