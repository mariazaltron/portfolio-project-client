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
    // storyCreateSuccess: (state, action) => {
    //   console.log(action.payload);
    //   state.space.stories.unshift(action.payload);
    // },
    // spaceUpdated: (state, action) => {
    //   state.space = { ...action.payload, stories: state.space.stories };
    // },
  },
});

export const { loginSuccess, logOut, tokenStillValid } = userSlice.actions;

export default userSlice.reducer;
