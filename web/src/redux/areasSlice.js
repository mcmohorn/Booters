import { createSlice } from "@reduxjs/toolkit";

export const areasSlice = createSlice({
  name: "areas",
  initialState: {
    list: [],
    current: {}
  },
  reducers: {
    setAreas: (state, action) => {
      state.list = action.payload;
    },
    setCurrentArea: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setAreas, setCurrentArea } = areasSlice.actions;

export default areasSlice.reducer;
