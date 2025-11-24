export type CalendarView = "month" | "week" | "day" | "agenda";

export interface CalendarEvent {
  id: string;
  title: string;
  studioId: string;
  instructorId: string;
  date: Date;
  status: EventStatus;
  type: EventType;
  color?: EventColor;
}

export type EventStatus = "SCHEDULED" | "DONE" | "CANCELED";
export type EventType = "NORMAL" | "REPLACEMENT" | "EXPERIMENTAL";

export type EventColor =
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "emerald"
  | "orange";
