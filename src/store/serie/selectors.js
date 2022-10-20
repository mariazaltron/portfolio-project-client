export const selectSerie = (reduxState) => reduxState.serie.series;
export const selectSerieById = (reduxState) => reduxState.serie.serieDetails;
export const selectSeriePreview = (reduxState) => reduxState.serie.seriePreview;
export const selectPopularSeries = (reduxState) =>
  reduxState.serie.popularSeries;
export const selectTrendingSeries = (reduxState) =>
  reduxState.serie.trendingSeries;
export const selectSearchSeries = (reduxState) => reduxState.serie.searchSeries;
