import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/slice";
import serieReducer from "./serie/slice";

export default configureStore({
  reducer: {
    user: userReducer,
    serie: serieReducer,
  },
});
