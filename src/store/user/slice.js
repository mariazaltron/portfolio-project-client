import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  sharedWatchList: null,
  activeFilter: "all",
  profiles: [],
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
      state.activeFilter = "all";
    },
    serieDeleted: (state, action) => {
      state.loading = false;
      const serieId = action.payload.serieId;
      state.watchlist = state.watchlist.series.filter((s) => s.id === serieId);
      state.activeFilter = "all";
    },
    serieAddedToMyList: (state, action) => {
      state.loading = false;
      state.sharedWatchList = action.payload.watchlist;
      state.seriePreview = action.payload.serie;
    },
    statusUpdated: (state, action) => {
      state.loading = false;
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
      state.activeFilter = "all";
    },
    filterMyList: (state, action) => {
      state.loading = false;
      state.activeFilter = action.payload;
    },
    shareListMenuAction: (state, action) => {
      state.loading = false;
      state.activeFilter = "share";
    },
    fetchUsers: (state, action) => {
      state.loading = false;
      state.profiles = action.payload;
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
  fetchUsers,
  newSerieAddedToList
} = userSlice.actions;

export default userSlice.reducer;
