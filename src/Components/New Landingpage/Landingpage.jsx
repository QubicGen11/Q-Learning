import React from 'react'
import Latestdeals from './LatestDeals Componnets/Latestdeals'
import Newnavbar from './New Navbar Components/Newnavbar'
import HeroSection from './Landing Page Section Components/HeroSection'

const Landingpage = () => {
  return (
    <div>
      <Latestdeals />
      <div className='w-screen'>

         <Newnavbar />
         <HeroSection />
      </div>
    </div>
  )
}

export default Landingpage
