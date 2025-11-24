import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";

interface ClassScheduleProps {
  events: CalendarEvent[];
}

export function ClassSchedule({ events }: ClassScheduleProps) {
  // const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

  // const handleEventAdd = (event: CalendarEvent) => {
  //   setEvents([...events, event]);
  // };

  // const handleEventUpdate = (updatedEvent: CalendarEvent) => {
  //   setEvents(
  //     events.map((event) =>
  //       event.id === updatedEvent.id ? updatedEvent : event
  //     )
  //   );
  // };

  // const handleEventDelete = (eventId: string) => {
  //   setEvents(events.filter((event) => event.id !== eventId));
  // };

  return (
    // Add min-h-screen to make it full height
    <div className="flex flex-col">
      <EventCalendar
        events={events}
        // onEventAdd={handleEventAdd}
        // onEventUpdate={handleEventUpdate}
        // onEventDelete={handleEventDelete}
      />
    </div>
  );
}
