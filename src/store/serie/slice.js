import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  series: [],
  serieDetails: {},
  popularSeries: [],
  trendingSeries: [],
};

export const serieSlice = createSlice({
  name: "serie",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    allSeries: (state, action) => {
      state.loading = false;
      state.series = action.payload;
    },
    serieById: (state, action) => {
      state.loading = false;
      state.serieDetails = action.payload;
    },
    seriesByPopular: (state, action) => {
      state.loading = false;
      state.popularSeries = action.payload;
    },
    seriesByTrending: (state, action) => {
      state.loading = false;
      state.trendingSeries = action.payload;
    }

  },
});

export const {
  allSeries,
  startLoading,
  serieById,
  seriesByPopular,
  seriesByTrending,
} = serieSlice.actions;
export default serieSlice.reducer;
