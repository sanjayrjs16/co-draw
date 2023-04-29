import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import tools from "../features/tool/toolSlice";

// configureStore enables redux devTools  by default, automatically adds thunk middleware etc.

// export const store = configureStore({
//   reducer: rootReducer,
// });

// It will do the combineReducer part for us automatically

export const store = configureStore({
  reducer: {
    tools,
  },
});
