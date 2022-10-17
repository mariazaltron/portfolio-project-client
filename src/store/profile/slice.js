import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const profileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
     allUsers: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    },
  },
);

export const {allUsers} = profileSlice.actions;

export default profileSlice.reducer;
