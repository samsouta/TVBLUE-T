import { configureStore } from '@reduxjs/toolkit';
import { GetAllGenre } from './api/getAllGern';
import { HomeSlice } from './slice/HomeDetailSlice';
import { getVideoDetail } from './api/getVideoDetail';
import { Voting } from './api/Voting';
import { getPhotoPage } from './api/getPhotoPage';
import { postViewCount } from './api/postViewCount';
import { getMovies } from './api/getMovies';
import { getLikeCount } from './api/getLikeCount';
import { auth } from './api/auth';
import { SearchEngine } from './api/searchEngine';
import SearchEngineSlice from './slice/SearchEngineSlice';
import { ScrollSlice } from './slice/ScrollSlice';
import { getGame } from './api/game/getGame';
import { getTagVideo } from './api/home/getTagVideo';
import { comment } from './api/comment';
import { MoviesSlice } from './slice/moviesSlice';


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
    // show home page tag video
    [getTagVideo.reducerPath]: getTagVideo.reducer,
    // show home page tag video

    /// game 
    [getGame.reducerPath]: getGame.reducer,

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

      // show home page tag video
      getTagVideo.middleware,
      // show home page tag video end
      
      // game
      getGame.middleware,



      // auth
      auth.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
