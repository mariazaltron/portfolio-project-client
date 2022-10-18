import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sharedWithMe: [],
  sharedWithOthers: [],
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    newListCreated: (state, action) => {
      state.loading = false;
      state.sharedWithOthers.push(action.payload);
    },
    allWatchlistsLoaded: (state, action) => {
      state.loading = false;
      state.sharedWithOthers = action.payload.withOthers;
      console.log("shared with others", action.payload.withOthers);
      state.sharedWithMe = action.payload.withMe;
      console.log("shared with me", action.payload.withMe);
    },
    watchListShared: (state, action) => {
      state.loading = false;

      const user = action.payload.user;
      const sharedWatchListId = action.payload.sharedWatchListId;
      state.activeFilter = "all";
      state.sharedWithOthers = state.sharedWithOthers.map((s) => {
        if (s.id === sharedWatchListId) {
          const newS = s;
          newS.users.push(user);
          return newS;
        } else {
          return s;
        }
      });
    },
  },
});

export const { newListCreated, allWatchlistsLoaded, watchListShared } =
  watchListSlice.actions;

export default watchListSlice.reducer;
