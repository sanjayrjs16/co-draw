import { combineReducers } from "@reduxjs/toolkit";
import tools from "../features/tool/toolSlice";
const rootReducer = combineReducers({
  tools,
});
export default rootReducer;
