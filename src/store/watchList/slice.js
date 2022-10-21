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
    serieAddedToSomeList: (state, action) => {
      state.loading = false;
      const watchListUpdated = action.payload.watchlist;
      const user = action.payload.user;
      if(watchListUpdated.owner === user.id) {
        state.sharedWithOthers = state.sharedWithOthers.map(so => { return (so.id === watchListUpdated.id) ? watchListUpdated : so })
      } else {
        state.sharedWithMe = state.sharedWithMe.map(sm => { return (sm.id === watchListUpdated.id) ? watchListUpdated : sm })
      }
    },
    watchListShared: (state, action) => {
      state.loading = false;

      const user = action.payload.user;
      const watchListId = action.payload.watchlistId;
      console.log("share user", user);
      console.log("share watchListId", watchListId);
      state.sharedWithOthers = state.sharedWithOthers.map((s) => {
        if (s.id === watchListId) {
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

export const { newListCreated, allWatchlistsLoaded, watchListShared, serieAddedToSomeList } =
  watchListSlice.actions;

export default watchListSlice.reducer;
