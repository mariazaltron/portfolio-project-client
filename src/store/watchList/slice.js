import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
  sharedWithMe: [],
  sharedWithOthers: [],
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    allWatchlistsLoaded: (state, action) => {
      state.sharedWithOthers = action.payload.withOthers;
      console.log("shared with others", action.payload.withOthers);
      state.sharedWithMe = action.payload.withMe;
      console.log("shared with me", action.payload.withMe);
    },
  },
});

export const { allWatchlistsLoaded } = watchListSlice.actions;

export default watchListSlice.reducer;
