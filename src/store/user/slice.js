import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  sharedWatchList: null,
  filteredWatchList: null,
  activeFilter: "all",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
      state.sharedWatchList = action.payload.sharedWatchList;
      state.filteredWatchList = action.payload.sharedWatchList;
      state.activeFilter = "all";
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.token = action.payload.token;
      state.profile = action.payload.user;
      state.sharedWatchList = action.payload.sharedWatchList;
      state.filteredWatchList = action.payload.sharedWatchList;
      state.activeFilter = "all";
    },
    serieDeleted: (state, action) => {
      const serieId = action.payload;
      state.watchlist = state.watchlist.series.filter((s) => s.id === serieId);
      state.filteredWatchList = state.watchlist;
      state.activeFilter = "all";
    },
    serieAddedToMyList: (state, action) => {
      state.sharedWatchList = action.payload;
      state.filteredWatchList = action.payload;
      state.activeFilter = "all";
    },
    statusUpdated: (state, action) => {
      const newWatchListSerie = action.payload;
      state.sharedWatchList.series.map((serie) => {
        if (
          serie.id === newWatchListSerie.serieId &&
          serie.sharedWatchListSeries.sharedWatchListId ===
            newWatchListSerie.sharedWatchListId
        ) {
          const newSerie = serie;
          serie.sharedWatchListSeries = newWatchListSerie;
          return newSerie;
        } else {
          return serie;
        }
      });
      state.filteredWatchList = state.sharedWatchList;
      state.activeFilter = "all";
    },
    filterMyList: (state, action) => {
      const filter = action.payload;
      if (filter === "all") {
        state.activeFilter = "all";
        state.filteredWatchList = state.sharedWatchList;
      } else {
        state.activeFilter = filter;
        state.filteredWatchList.series = state.sharedWatchList.series.filter(
          (serie) => serie.sharedWatchListSeries.status === filter
        );
      }
    },
    shareListMenuAction: (state, action) => {
      state.activeFilter = "share";
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  statusUpdated,
  serieAddedToMyList,
  filterMyList,
  shareListMenuAction,
  serieDeleted,
} = userSlice.actions;

export default userSlice.reducer;
