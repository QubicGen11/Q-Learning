import React, { useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
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
import usePreLoginFeedStore from '../../stores/preLoginFeedStore'
import SuperLoader from '../Common/SuperLoader'
import Skillassessment from './Skill Assessent Module/Skillassessment'

const Landingpage = () => {
  const { 
    categories,
    mostSelling,
    topTrendingSkills,

    learnersChoice,
    testimonials,
    isLoading,
    error,
    fetchPreLoginFeed,
    exploreTopSkillsAndCertifications
  } = usePreLoginFeedStore();

  const { scrollYProgress } = useScroll();

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

    // Fetch pre-login feed data
    fetchPreLoginFeed();
  }, [fetchPreLoginFeed]);

  if (isLoading) {
    return <SuperLoader />;
  }

  if (error) {
    return <div>Error: {error}</div>; // Or your error component
  }

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Latest Deals - Always at top */}
      <div className="w-full deals-section">
        <Latestdeals />
      </div>

      {/* Navbar - Fixed position after Latestdeals */}
      <div className="w-full bg-white shadow-sm navbar-section">
        <Newnavbar />
      </div>

      {/* Main Content - Starts after Latestdeals */}
      <motion.div 
        className="w-full mt-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Whatyougetcom />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <SkillsHomepage categories={categories} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <MostSellingCourses courses={mostSelling} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <EducationAspiration/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Testimonials testimonials={testimonials} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <LearnersChoice courses={learnersChoice}/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Skillassessment/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Toptrending skills={topTrendingSkills} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Exploretopskills 
          exploreTopSkillsAndCertifications={exploreTopSkillsAndCertifications}
        /> 
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Footer/>
      </motion.div>
    </div>
  )
}

export default Landingpage