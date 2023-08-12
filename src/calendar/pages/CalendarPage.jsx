import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarModal, FabAddNew, Navbar, CalendarEvent, FabDelete } from "../";

import { getMessages, localizer } from "../helpers";
import { useUiStore, useCalendarStore } from "../../hooks";

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, onSetActiveEvent } = useCalendarStore();
  const [lastView, setlastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: "0.8",
      color: "white",
    };
    return { style };
  };

  const onDoubleClick = (event) => {
    openDateModal();
    console.log({ event: "onDoubleClick" });
  };
  const onSelect = (event) => {
    onSetActiveEvent(event);
  };
  const onViewChange = (event) => {
    setlastView(event);
    localStorage.setItem("lastView", event);
  };
  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "90vh" }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
        onRangeChange={(e) => console.log(e)}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
