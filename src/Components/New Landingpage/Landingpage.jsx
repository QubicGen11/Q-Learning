import React, { useEffect } from 'react'
import Latestdeals from './LatestDeals Componnets/Latestdeals'
import Newnavbar from './New Navbar Components/Newnavbar'
import HeroSection from './Landing Page Section Components/HeroSection'

const Landingpage = () => {
  useEffect(() => {
    // Get the height of Latestdeals after component mounts
    const dealsElement = document.querySelector('.deals-section');
    if (dealsElement) {
      const height = dealsElement.offsetHeight;
      // Set navbar position based on Latestdeals height
      const navbar = document.querySelector('.navbar-section');
      if (navbar) {
        navbar.style.top = `${height}px`;
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Latest Deals - Always at top */}
      <div className="w-full deals-section">
        <Latestdeals />
      </div>

      {/* Navbar - Fixed position after Latestdeals */}
      <div className="fixed w-full bg-white shadow-sm navbar-section">
        <Newnavbar />
      </div>

      {/* Main Content - Starts after Latestdeals */}
      <div className="w-full" style={{ marginTop: '64px' }}> {/* Adjust 64px to match navbar height */}
        <HeroSection />
      </div>
    </div>
  )
}

export default Landingpage