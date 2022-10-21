import { apiUrl } from "../../config/constants";
import axios from "axios";
import { serieAddedToMyList, serieDeleted } from "../user/slice";
import { appLoading, appDoneLoading } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
import {
  allWatchlistsLoaded, serieAddedToSomeList, watchListShared,
} from "./slice";
import { getUserWithStoredToken } from "../user/thunks";
import { movieDbApiUrl, movieDbApiKey } from "../../config/constants";
import {previewSerie} from "../serie/slice";

export const updateSerieStatus = (serieId, sharedWatchListId, status) => {
  return async (dispatch, getState) => {
    try {
      console.log("patch request thunk", {
        serieid: serieId,
        listid: sharedWatchListId,
        status: status,
      });
      const { token, profile } = getState().user;
      dispatch(appLoading());

      console.log(token, profile);

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
      console.log("response patch", response);
      dispatch(
        showMessageWithTimeout("success", false, "update successfull", 3000)
      );
      dispatch(getUserWithStoredToken());
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const addToWatchList = (sharedWatchListId, serie, status) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      console.log(token);

      const response = await axios.post(
        `${apiUrl}/watchlists/${sharedWatchListId}/series`,
        {
          serie,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("response adding", response);
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Serie added to watchlist",
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
      dispatch(serieDeleted(sharedWatchListId, serieId));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const addNewSharedList = (name) => {
  return async (dispatch, getState) => {
    try {
      console.log("in post list", name);
      const { token } = getState().user;
      dispatch(appLoading());

      const response = await axios.post(
        `${apiUrl}/watchlists`,
        {
          name,
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
          "created new list successfully",
          3000
        )
      );
      dispatch(getAllWatchlists());
      // dispatch(getUserWithStoredToken());
      // dispatch(newListCreated(response.data.sharedWatchList));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
};

export const addSerieToMyList = (serie, watchListId) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    dispatch(appLoading());
    const serieInTmdb = await axios.get(`${movieDbApiUrl}/tv/${serie.id}`, {
      params: { api_key: movieDbApiKey },
    });
    const response = await axios.post(`${apiUrl}/watchlists/${watchListId}/series`, serieInTmdb.data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const watchlist = response.data;
    console.log("response from backend", response.data);
    dispatch(
      showMessageWithTimeout("success", false, "Serie added successfully", 3000)
      );
    dispatch(serieAddedToMyList({watchlist: watchlist, serie: serie}));
//    dispatch(previewSerie(serie))

  } catch (e) {
    console.log(e.message);
  }
};

export const addSerieToSomeList = (serie, watchListId) => async (dispatch, getState) => {
  try {
    const user = getState().user
    const { token } = user;

    dispatch(appLoading());
    const serieInTmdb = await axios.get(`${movieDbApiUrl}/tv/${serie.id}`, {
      params: { api_key: movieDbApiKey },
    });
    const response = await axios.post(`${apiUrl}/watchlists/${watchListId}/series`, serieInTmdb.data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const watchlist = response.data;
    console.log("response from backend", response.data);
    dispatch(
      showMessageWithTimeout("success", false, "Serie added successfully", 3000)
      );
    dispatch(serieAddedToSomeList({watchlist: watchlist, serie: serie, user: user.profile}));
    //    dispatch(previewSerie(serie))

  } catch (e) {
    console.log(e.message);
  }
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

export const shareWithProfile = (profile, sharedWatchListId) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      const response = await axios.post(
        `${apiUrl}/watchlists/${sharedWatchListId}/users/${profile.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res", response);
      // dispatch(
      //   watchListShared(response.data.user, response.data.sharedWatchListId)
      // );
      dispatch(getUserWithStoredToken());
      dispatch(watchListShared({watchlistId: response.sharedWatchList, user: response.user}));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};
