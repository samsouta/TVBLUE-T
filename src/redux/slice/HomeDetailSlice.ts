import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
interface HomeState {
  data: Record<string, any>; // Adjust this to the correct type based on the structure of 'payload'
}

const initialState: HomeState = {
  data: JSON.parse(localStorage.getItem('id') || '{}'), // Default to empty object if 'id' is not in localStorage
};

export const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    homeDetail: (state, action: PayloadAction<any>) => {  // Specify the type of the payload (adjust 'any' as needed)
      state.data = action.payload;
      localStorage.setItem('id', JSON.stringify(action.payload)); // Save to local storage
    },
  },
});

export const { homeDetail } = HomeSlice.actions;
export default HomeSlice.reducer;
