import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  series: [],
  serieDetails: {},
};

export const serieSlice = createSlice({
  name: "serie",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    allSeries: (state, action) => {
      // console.log("spacesFetched action", action);
      state.loading = false;
      state.series = action.payload;
    },
    serieById: (state, action) => {
      // console.log("spacesById", action);
      state.loading = false;
      state.serieDetails = action.payload;
    },
  },
});

export const { allSeries, startLoading, serieById } = serieSlice.actions;
export default serieSlice.reducer;
