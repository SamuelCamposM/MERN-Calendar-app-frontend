import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
const tempEvent = {
  _id: new Date().getTime(),
  title: "Titulo de la nota",
  notes: "Hay que comprar el pastel",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "yellow",
  user: {
    _id: "123",
    name: "Samuel",
  },
};
export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    onSliceSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    onSliceAddNewEvent: (state, { payload }) => {
      console.log({ payload });
      state.events.push(payload);
      state.activeEvent = null;
    },
    onSliceUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) =>
        event._id === payload._id ? payload : event
      );
    },
    onSliceDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSliceAddNewEvent,
  onSliceDeleteEvent,
  onSliceSetActiveEvent,
  onSliceUpdateEvent,
} = calendarSlice.actions;
