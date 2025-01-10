import React from 'react'
import Index from './routes/Index'
import Footer from './components/layouts/footer/Footer'
import TVNavbar from './components/layouts/navbar/TVNavbar'
import { ScrollAlert } from './components/UI/alert/ScrollAlert'


const App: React.FC = () => {

   

  return (
    <div >
      <ScrollAlert/>
      <TVNavbar />
      <Index />
      <Footer />
    </div>
  )
}

export default App