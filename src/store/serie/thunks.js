import axios from "axios";
import {
  allSeries,
  startLoading,
  serieById,
  seriesByPopular,
  seriesByTrending,
  serieByName,
} from "./slice";
import { movieDbApiKey, movieDbApiUrl, apiUrl } from "../../config/constants";

export const fetchSeries = () => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${apiUrl}/series`);
    // console.log("response thunk", response); //ALWAYS CONSOLE.LOG WHAT YOU GET BACK!!
    const series = response.data;
    dispatch(allSeries(series));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchSerieById = (id) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${apiUrl}/series/${id}`);
    // console.log("response thunk ID", response); //ALWAYS CONSOLE.LOG WHAT YOU GET BACK!!
    const seriesById = response.data;
    dispatch(serieById(seriesById));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchPopularSeries = () => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${movieDbApiUrl}/tv/popular`, {
      params: { api_key: movieDbApiKey },
    });
    const popularSeries = response.data;
    // console.log(popularSeries);
    dispatch(seriesByPopular(popularSeries.results));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchTrendingSeries = () => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${movieDbApiUrl}/trending/tv/week`, {
      params: { api_key: movieDbApiKey },
    });
    const trendingSeries = response.data;
    // console.log(trendingSeries);
    dispatch(seriesByTrending(trendingSeries.results));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchSerieByName = (name) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${movieDbApiUrl}/search/tv`, {
      params: { api_key: movieDbApiKey, query: name },
    });
    const serieName = response.data;
    dispatch(serieByName(serieName.results));
  } catch (e) {
    console.log(e.message);
  }
};

export const saveSerie = (serie) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const serieInTmdb = await axios.get(`${movieDbApiUrl}/tv/${serie.id}`, {
      params: { api_key: movieDbApiKey },
    });
    const response = await axios.post(`${apiUrl}/series`, serieInTmdb.data);

    const serieSaved = response.data;
    console.log(serieSaved);
    dispatch(serieById(serieSaved));
  } catch (e) {
    console.log(e.message);
  }
};
