import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";

interface ClassScheduleProps {
  events: CalendarEvent[];
  onRefetch: () => Promise<void>;
}

export function ClassSchedule({ events, onRefetch }: ClassScheduleProps) {
  return (
    // Add min-h-screen to make it full height
    <div className="flex flex-col">
      <EventCalendar
        events={events}
        onRefetch={onRefetch}
        // onEventAdd={handleEventAdd}
        // onEventUpdate={handleEventUpdate}
        // onEventDelete={handleEventDelete}
      />
    </div>
  );
}
