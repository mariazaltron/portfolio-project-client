import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
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

export const { l } = watchListSlice.actions;

export default watchListSlice.reducer;
