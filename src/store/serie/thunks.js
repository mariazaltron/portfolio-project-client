import axios from "axios";
import { allSeries, startLoading, serieById, seriesByPopular } from "./slice";
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
    console.log(popularSeries);
    dispatch(seriesByPopular(popularSeries.results));
  } catch (e) {
    console.log(e.message);
  }
};
