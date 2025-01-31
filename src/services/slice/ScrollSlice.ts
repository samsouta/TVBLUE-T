// src/redux/slices/ScrollSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScrollState {
  currentSection: boolean;
}

const initialState: ScrollState = {
  currentSection: false,
};

export const ScrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<boolean>) => {
      state.currentSection = action.payload;
    },
  },
});

export const { setCurrentSection } = ScrollSlice.actions;
export default ScrollSlice.reducer;
