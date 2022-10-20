import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
import { loginSuccess, logOut, tokenStillValid, fetchUsers } from "./slice";

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(
        loginSuccess({
          token: response.data.token,
          user: response.data.user,
          // space: response.data.space,
        })
      );
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(
        loginSuccess({
          token: response.data.token,
          user: response.data.user,
          sharedWatchList: response.data.sharedWatchList,
        })
      );
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());
    console.log("token", token);
    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    // console.log("in refresh");
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/mylists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("token valid response", response);
      // token is still valid
      dispatch(
        tokenStillValid({
          token: response.data.token,
          user: response.data.user,
          sharedWatchList: response.data.sharedWatchList,
        })
      );
      dispatch(appDoneLoading());
    } catch (error) {
      console.log(error);
      // console.log(error.response.message);

      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      // dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const getUsers = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      const response = await axios.get(`${apiUrl}/profiles/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchUsers(response.data.users));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};
