import { apiUrl } from "../../config/constants";
import axios from "axios";
import { statusUpdated, serieAddedToMyList } from "../user/slice";
import { appLoading, appDoneLoading } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";

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
      dispatch(serieAddedToMyList(response.data.sharedWatchList));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};
