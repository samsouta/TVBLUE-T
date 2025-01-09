import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import HomeDetail from '../components/UI/home/HomeDetail'
import Contact from '../pages/Contact'
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RouteGuard from './RouteGuard'
import NewRelease from '../pages/typeOfmoviesPage/NewRelease'
import Maintenance from '../pages/Maintenance'
import TradingPage from '../pages/typeOfmoviesPage/TradingPage'
import MoreDetail from '../pages/MoreDetail'


const Index: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/trading-now" replace />} />
        
        <Route path={`/home`} element={<Home />} />
        <Route path={`/videos/:id`} element={<HomeDetail />} />
        <Route path={`/contact`} element={<Contact />} />
        <Route path={`/gn/:genre`} element={<MoreDetail />} />
        <Route path={`/search/:query`} element={<Search />} />


        {/* /// type of movies // */}
        <Route path={`/trading-now`} element={<TradingPage />} />
        <Route path={`/new-release`} element={<NewRelease />} />

        {/* // auth  */}
        <Route path={`/login`} element={<RouteGuard><Login /></RouteGuard>} />
        <Route path={`/register`} element={<RouteGuard><Register /></RouteGuard>} />

        <Route path={`/maintenance`} element={<Maintenance />} />
      </Routes>
    </div>
  )
}

export default Index;