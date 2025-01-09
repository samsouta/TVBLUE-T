import { configureStore } from '@reduxjs/toolkit';
import { GetAllGenre } from './api/getAllGern';
import { HomeSlice } from './slice/HomeDetailSlice';
import { getVideoDetail } from './api/getVideoDetail';
import { comment } from './api/Comment';
import { Voting } from './api/Voting';
import { getPhotoPage } from './api/getPhotoPage';
import { postViewCount } from './api/postViewCount';
import { getMovies } from './api/getMovies';
import { MoviesSlice } from './slice/moviesSlice';
import { getLikeCount } from './api/getLikeCount';
import { auth } from './api/auth';
import { SearchEngine } from './api/searchEngine';
import SearchEngineSlice from './slice/SearchEngineSlice';
import { ScrollSlice } from './slice/ScrollSlice';


export const store = configureStore({
  reducer: {
    /// new
    [comment.reducerPath]: comment.reducer,
    [postViewCount.reducerPath]: postViewCount.reducer,
    [getVideoDetail.reducerPath]: getVideoDetail.reducer,
    [getPhotoPage.reducerPath]: getPhotoPage.reducer,
    [getMovies.reducerPath]: getMovies.reducer,
    [getLikeCount.reducerPath]: getLikeCount.reducer,
    [auth.reducerPath]: auth.reducer,
    [Voting.reducerPath]: Voting.reducer,
    [GetAllGenre.reducerPath]: GetAllGenre.reducer,
    [SearchEngine.reducerPath]: SearchEngine.reducer,

    // slice
    home: HomeSlice.reducer,
    movies: MoviesSlice.reducer,
    src: SearchEngineSlice.reducer,
    scroll: ScrollSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      getVideoDetail.middleware,
      comment.middleware,
      getPhotoPage.middleware,
      postViewCount.middleware,
      getMovies.middleware,
      getLikeCount.middleware,
      Voting.middleware,
      GetAllGenre.middleware,
      SearchEngine.middleware,



      // auth
      auth.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
