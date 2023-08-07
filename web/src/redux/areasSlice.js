import { createSlice } from "@reduxjs/toolkit";

export const areasSlice = createSlice({
  name: "areas",
  initialState: {
    list: [],
  },
  reducers: {
    setAreas: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setAreas } = areasSlice.actions;

export default areasSlice.reducer;
