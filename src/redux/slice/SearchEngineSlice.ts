import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    searchQuery: string; // This will hold the search query
}

const initialState: SearchState = {
    searchQuery: '',
};

const SearchEngineSlice = createSlice({
    name: 'src',
    initialState,
    reducers: {
        getQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload; // Set search query as a string
        },
    },
});

export const { getQuery } = SearchEngineSlice.actions;
export default SearchEngineSlice;
