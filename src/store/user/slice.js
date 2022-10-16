import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  sharedWatchList: null,
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
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
      state.sharedWatchList = action.payload;
    },
    // storyDeleteSuccess: (state, action) => {
    //   const storyId = action.payload;
    //   state.space.stories = state.space.stories.filter((s) => s.id !== storyId);
    // },
    serieAddedToMyList: (state, action) => {
      console.log(action.payload);
      state.sharedWatchList = action.payload;
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
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  statusUpdated,
  serieAddedToMyList,
} = userSlice.actions;

export default userSlice.reducer;
