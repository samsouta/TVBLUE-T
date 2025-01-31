import { configureStore } from '@reduxjs/toolkit';
import { GetAllGenre } from '../services/api/Genre/getAllGern';
import { HomeSlice } from '../services/slice/HomeDetailSlice';
import { getVideoDetail } from '../services/api/Movies/getVideoDetail';
import { Voting } from '../services/api/vote/Voting';
import { postViewCount } from '../services/api/vote/postViewCount';
import { getMovies } from '../services/api/Movies/getMovies';
import { getLikeCount } from '../services/api/vote/getLikeCount';
import { auth } from '../services/api/auth/auth';
import { SearchEngine } from '../services/api/search/searchEngine';
import SearchEngineSlice from '../services/slice/SearchEngineSlice';
import { ScrollSlice } from '../services/slice/ScrollSlice';
import { getGame } from '../services/api/game/getGame';
import { getTagVideo } from '../services/api/Movies/getTagVideo';
import { comment } from '../services/api/comment/comment';
import { getActress } from '../services/api/actress/getActress';
import { moviesSlice } from '../services/slice/moviesSlice';


export const store = configureStore({
  reducer: {
    /// new
    [comment.reducerPath]: comment.reducer,
    [postViewCount.reducerPath]: postViewCount.reducer,
    [getVideoDetail.reducerPath]: getVideoDetail.reducer,
    [getMovies.reducerPath]: getMovies.reducer,
    [getLikeCount.reducerPath]: getLikeCount.reducer,
    [auth.reducerPath]: auth.reducer,
    [Voting.reducerPath]: Voting.reducer,
    [GetAllGenre.reducerPath]: GetAllGenre.reducer,
    [SearchEngine.reducerPath]: SearchEngine.reducer,
    [getActress.reducerPath]: getActress.reducer,
    // show home page tag video
    [getTagVideo.reducerPath]: getTagVideo.reducer,
    // show home page tag video

    /// game 
    [getGame.reducerPath]: getGame.reducer,

    // slice
    home: HomeSlice.reducer,
    movies: moviesSlice.reducer,
    src: SearchEngineSlice.reducer,
    scroll: ScrollSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      getVideoDetail.middleware,
      comment.middleware,
      postViewCount.middleware,
      getMovies.middleware,
      getLikeCount.middleware,
      Voting.middleware,
      GetAllGenre.middleware,
      SearchEngine.middleware,
      getActress.middleware,

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
