import { apiUrl } from "../../config/constants";
import axios from "axios";
import { statusUpdated, serieAddedToMyList, serieDeleted } from "../user/slice";
import { appLoading, appDoneLoading } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
import { allWatchlistsLoaded } from "../watchList/slice";

export const updateSerieStatus = (serieId, sharedWatchListId, status) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      console.log(token);

      const response = await axios.patch(
        `${apiUrl}/watchlists/${sharedWatchListId}/series/${serieId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        showMessageWithTimeout("success", false, "update successfull", 3000)
      );
      dispatch(statusUpdated(response.data.watchList));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const addToWatchList = (sharedWatchListId, serieId, status) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      console.log(token);

      const response = await axios.post(
        `${apiUrl}/watchlists/${sharedWatchListId}/series/${serieId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "add to list successfull",
          3000
        )
      );
      dispatch(
        serieAddedToMyList(response.data.userId, response.data.sharedWatchLists)
      );
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const deleteSerieFromWatchlist = (sharedWatchListId, serieId) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      console.log(token);

      const response = await axios.delete(
        `${apiUrl}/watchlists/${sharedWatchListId}/series/${serieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        showMessageWithTimeout("success", false, "delete successfull", 3000)
      );
      dispatch(serieDeleted(response.data.watchList));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const getAllWatchlists = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      const response = await axios.get(`${apiUrl}/watchlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(allWatchlistsLoaded(response.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};
