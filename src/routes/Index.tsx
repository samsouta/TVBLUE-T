import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TVNavbar from '../components/layouts/navbar/TVNavbar'
import Home from '../pages/Home'
import HomeDetail from '../components/UI/home/HomeDetail'
import Top from '../pages/Top'
import Contact from '../pages/Contact'
import Footer from '../components/layouts/footer/Footer'


const Index: React.FC = () => {
  return (
    <div>
        <TVNavbar/>
        <Routes>
            <Route path={`/`} element={<Home/>} />
            <Route path={`/videos/:id`} element={<HomeDetail/>} />
            <Route path={`/home/:title`} element={<Top/>} />
            <Route path={`/contact`} element={<Contact/>} />
        </Routes>
        <Footer/>
    </div>
  )
}

export default Index;