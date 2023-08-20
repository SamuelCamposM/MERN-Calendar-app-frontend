import { useSelector, useDispatch } from "react-redux";
import {
  onSliceSetActiveEvent,
  onSliceAddNewEvent,
  onSliceUpdateEvent,
  onSliceDeleteEvent,
} from "../store";
export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const onSetActiveEvent = (calendarEvent) => { 
    dispatch(onSliceSetActiveEvent(calendarEvent));
  };
  const onStartAddNewEvent = async (calendarEvent) => {
    //TODO: MANDAR AL BACKENND 
    //TODO BIEN
    if (calendarEvent._id) {
      //* Actualizando
      dispatch(onSliceUpdateEvent({ ...calendarEvent }));
    } else {
      dispatch(
        onSliceAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })
      );
    }
  };
  const onStartDeleteEvent = async () => {
    // TODO MANDAR AL BACKEND
    await dispatch(onSliceDeleteEvent());
  };
  return {
    //*PROPIEDADES
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //*EVENTOS
    onSetActiveEvent,
    onStartAddNewEvent,
    onStartDeleteEvent,
  };
};
