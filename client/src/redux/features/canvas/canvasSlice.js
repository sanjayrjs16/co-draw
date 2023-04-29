// Ducks pattern in redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTool: "",
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    // Here we don't even need a return keyword and we can direclty write code that looks like its mutating the state, but under the hood uses immer to make this immutable

    setSelectedTool(state, action) {
      state.selectedTool = action.payload;
    },
  },
});

export const { setSelectedTool } = canvasSlice.actions;
export default canvasSlice.reducer;
