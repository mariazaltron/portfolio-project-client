import axios from "axios";
import { allSeries, startLoading, serieById } from "./slice";

const API_URL = `http://localhost:4000`;

export const fetchSeries = () => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${API_URL}/series`);
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
    const response = await axios.get(`${API_URL}/series/${id}`);
    // console.log("response thunk ID", response); //ALWAYS CONSOLE.LOG WHAT YOU GET BACK!!
    const seriesById = response.data;
    dispatch(serieById(seriesById));
  } catch (e) {
    console.log(e.message);
  }
};
