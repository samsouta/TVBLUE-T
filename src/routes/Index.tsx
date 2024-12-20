import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import HomeDetail from '../components/UI/home/HomeDetail'
import Top from '../pages/Top'
import Contact from '../pages/Contact'
import MoreVid from '../pages/MoreVid'
import Search from '../pages/Search'
import Category from '../pages/Category'
import AllvideoPage from '../pages/AllvideoPage'


const Index: React.FC = () => {
  return (
    <div>
        <Routes>
            <Route path={`/`} element={<Home/>} />
            <Route path={`/videos/:id`} element={<HomeDetail/>} />
            <Route path={`/home/:title`} element={<Top/>} />
            <Route path={`/contact`} element={<Contact/>} />
            <Route path={`/:genre`} element={<MoreVid/>} />
            <Route path={`/search/:query`} element={<Search/>} />
            <Route path={`/categories/:type`} element={<Category/>} />
            <Route path={`/random`} element={<AllvideoPage/>} />
        </Routes>
    </div>
  )
}

export default Index;