// Ducks pattern in redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedTool: "",
  is_config: false,
  config: {
    strokeSize: "0px",
    strokeColor: "#000000",
    fillColor: "#000000",
    opacity: 1,
  },
};

const toolSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setSelectedTool(state, action) {
      // Here we don't even need a return keyword and we can direclty write code that looks like its mutating the state, but under the hood uses immer to make this immutable
      state.selectedTool = action.payload;
    },
    setIsConfig(state) {
      state.is_config = action.payload;
    },
    setStrokeSize(state, action) {
      state.config.strokeSize = action.payload;
    },
    setStrokeColor(state, action) {
      state.config.strokeColor = action.payload;
    },
    setFillColor(state, action) {
      state.config.fillColor = action.payload;
    },
    setOpacity(state, action) {
      state.config.opacity = action.payload;
    },
  },
});

export const {
  setFillColor,
  setIsConfig,
  setOpacity,
  setStrokeColor,
  setStrokeSize,
  setSelectedTool,
} = toolSlice.actions;
export default toolSlice.reducer;
