import { createSlice } from "@reduxjs/toolkit";

export const jumpsSlice = createSlice({
  name: "jumps",
  initialState: {
    list: [],
    current: {}
  },
  reducers: {
    setJumps: (state, action) => {
      state.list = action.payload;
    },
    setCurrentJump: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setJumps, setCurrentJump } = jumpsSlice.actions;

export default jumpsSlice.reducer;
