import React, { useEffect } from 'react';
import { matchPath, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import HomeDetail from '../pages/videos/Page';
import Search from '../pages/Search';
import RouteGuard from './RouteGuard';
import NewRelease from '../pages/NewRelease';
import MoreDetail from '../pages/gen/Page';
import Game from '../pages/game/Game';
import Layout from '../components/layouts/Game/Layout';
import LayoutVideo from '../components/layouts/Layout';
import GameLink from '../pages/game/GameLink';
import TagsDetail from '../pages/tag/Page';
import ActressMovies from '../pages/act/Page';
import AllActress from '../pages/act-list/Page';
import AllVideoPage from '../pages/Random';
import Trending from '../pages/Trending';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const Router: React.FC = () => {

  const location = useLocation();

  useEffect(() => {
    // Check if the current URL matches the pattern /act/:id/:name
    const match = matchPath({ path: '/act/:id/:name', end: true }, location.pathname);

    if (!match) {
      // If the URL does not match, remove the 'currentPage2' item from local storage
      localStorage.removeItem('currentPage2');
    }
  }, [location]);

  return (
    <div>
      <Routes>
        {/* Video-related routes under LayoutVideo */}
        <Route path="/" element={<LayoutVideo />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="videos/:id" element={<HomeDetail />} />
          <Route path="gn/:genre" element={<MoreDetail />} />
          <Route path="tags/:tag" element={<TagsDetail />} />
          <Route path="search/:query" element={<Search />} />
          <Route path="trending-now" element={<Trending />} />
          <Route path="new-release" element={<NewRelease />} />
          <Route path='act/:id' element={<ActressMovies />} />
          <Route path='actresses' element={<AllActress />} />
          <Route path='all-movies' element={<AllVideoPage />} />
          {/* // auth  */}
          <Route path="login" element={<RouteGuard><Login /></RouteGuard>} />
          <Route path="register" element={<RouteGuard><Register /></RouteGuard>} /> 
        </Route>

        {/* Game-related routes under Layout */}
        <Route path="/game" element={<Layout />}>
          <Route index element={<Game />} />
          <Route path='link/:id' element={<GameLink />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
