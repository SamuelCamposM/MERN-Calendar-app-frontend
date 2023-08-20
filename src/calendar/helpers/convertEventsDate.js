import { parseISO } from "date-fns";

export const convertEventsDate = (events) =>
  events.map((event) => ({
    ...event,
    start: parseISO(event.start),
    end: parseISO(event.end),
  }));
