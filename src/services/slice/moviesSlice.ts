import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieDataType } from '../../types/MovieDataType';

interface VideosState {
    movies: MovieDataType[];
    currentPage: number;
    hasMore: boolean;
}

const initialState: VideosState = {
    movies: [],
    currentPage: 1,
    hasMore: true,
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovies: (state, action: PayloadAction<{ movies: MovieDataType[], hasMore: boolean }>) => {
            const newMovies = action.payload.movies.filter(
                (newMovie) => !state.movies.some((existingMovie) => existingMovie.id === newMovie.id)
            );
            state.movies = [...state.movies, ...newMovies];
            state.hasMore = action.payload.hasMore;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        resetMovies: (state) => {
            state.movies = [];
            state.currentPage = 1;
            state.hasMore = true;
        },
    },

});

export const { addMovies, setCurrentPage, resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
