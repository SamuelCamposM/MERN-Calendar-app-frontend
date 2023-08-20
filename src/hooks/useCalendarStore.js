import { useSelector, useDispatch } from "react-redux";
import {
  onSliceSetActiveEvent,
  onSliceAddNewEvent,
  onSliceUpdateEvent,
  onSliceDeleteEvent,
  onSliceSetEvents,
} from "../store";
import { calendarApi } from "../api";
import { convertEventsDate } from "../calendar/helpers";
import Swal from "sweetalert2";
export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const onSetActiveEvent = (calendarEvent) => {
    dispatch(onSliceSetActiveEvent(calendarEvent));
  };
  const onStartSaveEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //* Actualizando
        const { data } = await calendarApi.put(
          `/events/${calendarEvent.id}`,
          calendarEvent
        );
        return dispatch(
          onSliceUpdateEvent({ ...calendarEvent, user: data.evento.user })
        );
      }

      const { data } = await calendarApi.post("/events", calendarEvent);

      dispatch(
        onSliceAddNewEvent({
          ...calendarEvent,
          id: data.evento.id,
          user: data.evento.user,
        })
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data?.msg, "error");
    }
  };
  const onStartDeleteEvent = async () => {
    try {
      // TODO MANDAR AL BACKEND
      await calendarApi.delete(
        `/events/${activeEvent.id}`,
        activeEvent
      );
      await dispatch(onSliceDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data?.msg, "error");
    }
  };

  const onStartLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      dispatch(onSliceSetEvents(convertEventsDate(data.eventos)));
      console.log(convertEventsDate(data.eventos));
    } catch (error) {
      console.log(error);
      console.log("error");
    }
  };
  return {
    //*PROPIEDADES
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //*EVENTOS
    onSetActiveEvent,
    onStartSaveEvent,
    onStartDeleteEvent,
    onStartLoadingEvents,
  };
};
