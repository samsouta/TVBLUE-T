import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import HomeDetail from '../components/features/video/VideoDetail';
import Contact from '../pages/Contact';
import Search from '../pages/Search';
import Login from '../pages/Login';
import Register from '../pages/Register';
import RouteGuard from './RouteGuard';
import NewRelease from '../pages/MoviesPageTypes/NewRelease';
import Maintenance from '../pages/Maintenance';
import TradingPage from '../pages/MoviesPageTypes/TradingPage';
import MoreDetail from '../pages/MoviesPageTypes/MoreDetail';
import Game from '../pages/game/Game';
import Layout from '../components/layouts/Game/Layout';
import LayoutVideo from '../components/layouts/navbar/Layout';
import GameLink from '../pages/game/GameLink';
import TagsDetail from '../pages/MoviesPageTypes/TagsDetail';
import ActressMovies from '../pages/actress/ActressMovies';
import AllActress from '../pages/actress/AllActress';
import AllVideoPage from '../pages/MoviesPageTypes/AllVideoPage';

const Patch: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Video-related routes under LayoutVideo */}
        <Route path="/" element={<LayoutVideo />}>
          <Route index element={<Navigate to="/trending-now" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="videos/:id" element={<HomeDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gn/:genre" element={<MoreDetail />} />
          <Route path="tags/:tag" element={<TagsDetail />} />
          <Route path="search/:query" element={<Search />} />
          <Route path="trending-now" element={<TradingPage />} />
          <Route path="new-release" element={<NewRelease />} />
          <Route path='act/:id/:name' element={<ActressMovies />} />
          <Route path='actresses' element={<AllActress />} />
          <Route path='all-movies' element={<AllVideoPage />} />
          {/* // auth  */}
          <Route path="login" element={<RouteGuard><Login /></RouteGuard>} />
          <Route path="register" element={<RouteGuard><Register /></RouteGuard>} /> 
          <Route path="maintenance" element={<Maintenance />} />
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

export default Patch;
