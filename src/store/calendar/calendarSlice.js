import { createSlice } from "@reduxjs/toolkit";
import { onSliceLogout } from "../auth/authSlice";
// import { addHours } from "date-fns";
// const tempEvent = {
//   id: new Date().getTime(),
//   title: "Titulo de la nota",
//   notes: "Hay que comprar el pastel",
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: "yellow",
//   user: {
//     id: "123",
//     name: "Samuel",
//   },
// };
const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};
export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onSliceSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    onSliceAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onSliceUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) =>
        event.id === payload.id ? payload : event
      );
    },
    onSliceDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onSliceSetEvents: (state, { payload }) => {
      console.log(
        payload.filter((dbEvent) =>
          state.events.some((stateEvent) => stateEvent.id === dbEvent.id)
        )
      );

      state.events = [
        ...state.events,
        ...payload.filter(
          (dbEvent) =>
            !state.events.some((stateEvent) => stateEvent.id === dbEvent.id)
        ),
      ];
      state.isLoadingEvents = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onSliceLogout, () => initialState);
  },
});

// Action creators are generated for each case reducer function
export const {
  onSliceAddNewEvent,
  onSliceDeleteEvent,
  onSliceSetActiveEvent,
  onSliceSetEvents,
  onSliceUpdateEvent,
} = calendarSlice.actions;
