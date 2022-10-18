import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
import { allUsers } from "./slice";
import { appLoading } from "../appState/slice";

export const fetchProfiles = () => async (dispatch, getState) => {
  try {
    const token = selectToken(getState());
    if (token === null) return;
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/profiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users = response.data;
    console.log("oie do thunks", users);
    dispatch(allUsers(users));
  } catch (e) {
    console.log(e.message);
  }
};
