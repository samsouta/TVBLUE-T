import React from 'react'
import Index from './routes/Index'
import Footer from './components/layouts/footer/Footer'
import TVNavbar from './components/layouts/navbar/TVNavbar'


const App: React.FC = () => {

   

  return (
    <div>
      <TVNavbar />
      <Index />
      <Footer />
    </div>
  )
}

export default App