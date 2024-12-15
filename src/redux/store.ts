import { configureStore } from '@reduxjs/toolkit';
import { GetAllGenre } from './api/getAllGern';
import { GetVideoPage } from './api/getVideoPage';
import { HomeSlice } from './slice/HomeDetailSlice';
import { getVideoDetail } from './api/getVideoDetail';
import { comment } from './api/Comment';
import { Voting } from './api/Voting';
import { getAllVideos } from './api/getAllVideos';
import { getMostView } from './api/getMostView';
import { getPhotoPage } from './api/getPhotoPage';
import { postViewCount } from './api/postViewCount';


export const store = configureStore({
  reducer: {
    [GetAllGenre.reducerPath]: GetAllGenre.reducer,
    [GetVideoPage.reducerPath]: GetVideoPage.reducer,
    [getVideoDetail.reducerPath]: getVideoDetail.reducer,
    [comment.reducerPath]: comment.reducer,
    [Voting.reducerPath]: Voting.reducer,
    [getAllVideos.reducerPath]: getAllVideos.reducer,
    [getMostView.reducerPath]: getMostView.reducer,
    [getPhotoPage.reducerPath]: getPhotoPage.reducer,
    [postViewCount.reducerPath]: postViewCount.reducer,
    // slice
    home: HomeSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      GetAllGenre.middleware,
      GetVideoPage.middleware,
      getVideoDetail.middleware,
      comment.middleware,
      Voting.middleware,
      getAllVideos.middleware,
      getMostView.middleware,
      getPhotoPage.middleware,
      postViewCount.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
