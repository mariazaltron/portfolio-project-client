import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  series: [],
  serieDetails: null, // serie is saved in my database
  seriePreview: null, // serie is searched from movie-api, not saved in database
  popularSeries: [],
  trendingSeries: [],
  searchSeries: [],
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
    serieByName: (state, action) => {
      state.loading = false;
      console.log(`search `, action.payload);
      state.searchSeries = action.payload;
    },
    seriesByPopular: (state, action) => {
      state.loading = false;
      state.popularSeries = action.payload;
    },
    seriesByTrending: (state, action) => {
      state.loading = false;
      state.trendingSeries = action.payload;
    },
    clearSerieById: (state, action) => {
      state.loading = false;
      state.serieDetails = null;
    },
    previewSerie: (state, action) => {
      state.loading = false;
      state.seriePreview = action.payload;
    },
  },
});

export const {
  allSeries,
  startLoading,
  serieById,
  seriesByPopular,
  seriesByTrending,
  serieByName,
  clearSerieById,
  previewSerie,
} = serieSlice.actions;
export default serieSlice.reducer;
