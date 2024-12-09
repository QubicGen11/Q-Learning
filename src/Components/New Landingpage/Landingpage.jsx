import React, { useEffect } from 'react'
import Latestdeals from './LatestDeals Componnets/Latestdeals'
import Newnavbar from './New Navbar Components/Newnavbar'
import HeroSection from './Landing Page Section Components/HeroSection'
import Whatyougetcom from './What You Get Components/Whatyougetcom'
import SkillsHomepage from './Skills HomePage/SkillsHomepage'
import MostSellingCourses from './MostSellingCoursse Components/MostSellingCourses'

import Testimonials from './Testimonials Homepage/Testimonials'
import LearnersChoice from './Learners Choice/LearnersChoice'
import Exploretopskills from './ExploreTopskills/Exploretopskills'
import Footer from './Footer/Footer'
import EducationAspiration from './Education Aspiraton Componenst/EducationAspiration'
import Toptrending from './Top Trending Skills/Toptrending'

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
      <div className="w-full bg-white shadow-sm navbar-section">
        <Newnavbar />
      </div>

      {/* Main Content - Starts after Latestdeals */}
      <div className="w-full mt-4" > {/* Adjust 64px to match navbar height */}
        <HeroSection />
      </div>
      <Whatyougetcom />
      <SkillsHomepage />
      <MostSellingCourses/>
      <EducationAspiration/>
      <Testimonials/>
      <LearnersChoice/>
      <Toptrending/>
      <Exploretopskills/>
      <Footer/>
      
    </div>
  )
}

export default Landingpage