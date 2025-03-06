import { recommendForYouSlice } from './slice/recommentForYouSlice';
import { configureStore } from '@reduxjs/toolkit';
import { HomeSlice } from './slice/HomeDetailSlice';
import { auth } from './api/auth';
import SearchEngineSlice from './slice/SearchEngineSlice';
import { ScrollSlice } from './slice/ScrollSlice';
import { getGame } from './api/game/getGame';
import { comment } from './api/comment';
import { actress } from './api/actress';
import { movies } from './api/movies';
import { voting } from './api/voting';
import { genre } from './api/genre';
import { SearchEngine } from './api/searchEngine';
import { tag } from './api/tag';

export const store = configureStore({
  reducer: {
    /**
     * api reducer
     */
    [comment.reducerPath]: comment.reducer,
    [movies.reducerPath]: movies.reducer,
    [auth.reducerPath]: auth.reducer,
    [voting.reducerPath]: voting.reducer,
    [genre.reducerPath]: genre.reducer,
    [SearchEngine.reducerPath]: SearchEngine.reducer,
    [actress.reducerPath]: actress.reducer,
    [tag.reducerPath]: tag.reducer,

    /// game 
    [getGame.reducerPath]: getGame.reducer,

    /**
     * slice reducer
     */
    home: HomeSlice.reducer,
    src: SearchEngineSlice.reducer,
    scroll: ScrollSlice.reducer,
    movie : movies.reducer,
    recommentForYou: recommendForYouSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      comment.middleware,
      movies.middleware,
      voting.middleware,
      genre.middleware,
      SearchEngine.middleware,
      actress.middleware,

      // show home page tag video
      tag.middleware,
      // show home page tag video end
      
      // game
      getGame.middleware,



      // auth
      auth.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
