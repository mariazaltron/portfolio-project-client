import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import serieReducer from "./serie/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    serie: serieReducer,
  },
});
